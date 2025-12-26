"use client";

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { industryStore, locationStore } from "@/stores";

import {
  CLIENT_MODAL_TITLE,
  CLIENT_MODAL_DESCRIPTION,
  CLIENT_FORM_LABELS,
  CLIENT_FORM_PLACEHOLDERS,
  BUTTON_TEXT,
  TOAST_MESSAGES,
  VALIDATION_MESSAGES,
} from "@/lib/constants";

/* -----------------------------
   Schema
------------------------------ */
const clientFormSchema = z
  .object({
    name: z.string().min(2, VALIDATION_MESSAGES.nameRequired),
    email: z.string().email(VALIDATION_MESSAGES.emailInvalid),
    phone: z.string().min(10, VALIDATION_MESSAGES.phoneInvalid),
    businessName: z.string().min(2, VALIDATION_MESSAGES.businessNameRequired),

    industry: z.string().min(1, VALIDATION_MESSAGES.industryRequired),
    otherIndustryName: z.string().optional(),
    otherIndustryDescription: z.string().optional(),

    locations: z
      .array(z.string())
      .min(1, VALIDATION_MESSAGES.locationsRequired),
    otherLocationName: z.string().optional(),

    message: z.string().optional(),
  })
  .refine((d) => d.industry !== "Other" || !!d.otherIndustryName?.trim(), {
    path: ["otherIndustryName"],
    message: "Industry name is required",
  })
  .refine(
    (d) => !d.locations.includes("Other") || !!d.otherLocationName?.trim(),
    { path: ["otherLocationName"], message: "Location name is required" }
  );

interface ClientModalProps {
  children: React.ReactNode;
}

/* -----------------------------
   Component
------------------------------ */
export const ClientModal = observer(function ClientModal({
  children,
}: ClientModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      industry: "",
      locations: [],
      message: "",
      otherIndustryName: "",
      otherIndustryDescription: "",
      otherLocationName: "",
    },
  });

  useEffect(() => {
    industryStore.fetchIndustries?.();
    locationStore.fetchLocations?.();
  }, []);

  /* -----------------------------
     Helpers
  ------------------------------ */
  const toggleLocation = (id: string) => {
    const current = form.getValues("locations");
    form.setValue(
      "locations",
      current.includes(id) ? current.filter((l) => l !== id) : [...current, id]
    );
  };

  const industryExists = (name: string) =>
    industryStore.industries.some(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );

  const locationExists = (name: string) =>
    locationStore.locations.some(
      (l) => l.name.toLowerCase() === name.toLowerCase()
    );

  /* -----------------------------
     Submit
  ------------------------------ */
  async function onSubmit(values: z.infer<typeof clientFormSchema>) {
    setIsSubmitting(true);

    try {
      let industryId = values.industry;
      let locationIds = values.locations.filter((l) => l !== "Other");

      /* ---------- Industry: Other ---------- */
      if (values.industry === "Other") {
        if (industryExists(values.otherIndustryName!)) {
          throw new Error("Industry already exists");
        }

        const res = await fetch("/api/industry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.otherIndustryName,
            description: values.otherIndustryDescription || "",
          }),
        });

        if (!res.ok) throw new Error("Failed to save industry");

        const data = await res.json();
        industryId = data.id;
        await industryStore.fetchIndustries?.();
      }

      /* ---------- Location: Other ---------- */
      if (values.locations.includes("Other")) {
        if (locationExists(values.otherLocationName!)) {
          throw new Error("Location already exists");
        }

        const res = await fetch("/api/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: values.otherLocationName }),
        });

        if (!res.ok) throw new Error("Failed to save location");

        const data = await res.json();
        locationIds.push(data.id);
        await locationStore.fetchLocations?.();
      }

      /* ---------- Save Client ---------- */
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phoneNumber: values.phone,
          businessName: values.businessName,
          industry: [industryId],
          location: locationIds,
          message: values.message,
        }),
      });

      if (!response.ok) throw new Error();

      setOpen(false);
      form.reset();

      toast({
        title: TOAST_MESSAGES.inquirySuccess.title,
        description: TOAST_MESSAGES.inquirySuccess.description,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || TOAST_MESSAGES.inquiryError.description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  /* -----------------------------
     Render
  ------------------------------ */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{CLIENT_MODAL_TITLE}</DialogTitle>
          <DialogDescription>{CLIENT_MODAL_DESCRIPTION}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{CLIENT_FORM_LABELS.name}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email + Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{CLIENT_FORM_LABELS.email}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{CLIENT_FORM_LABELS.phone}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Business Name */}
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{CLIENT_FORM_LABELS.businessName}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Industry */}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{CLIENT_FORM_LABELS.industry}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industryStore.industries.map((i) => (
                        <SelectItem key={i.id} value={i.id}>
                          {i.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Industry */}
            {form.watch("industry") === "Other" && (
              <>
                <FormField
                  control={form.control}
                  name="otherIndustryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherIndustryDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Locations */}
            <FormField
              control={form.control}
              name="locations"
              render={() => (
                <FormItem>
                  <FormLabel>{CLIENT_FORM_LABELS.locations}</FormLabel>
                  <div className="space-y-2 border rounded p-3">
                    {locationStore.locations.map((l) => (
                      <div key={l.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={form.getValues("locations").includes(l.id)}
                          onCheckedChange={() => toggleLocation(l.id)}
                        />
                        <span>{l.name}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={form.getValues("locations").includes("Other")}
                        onCheckedChange={() => toggleLocation("Other")}
                      />
                      <span>Other</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Location */}
            {form.watch("locations").includes("Other") && (
              <FormField
                control={form.control}
                name="otherLocationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{CLIENT_FORM_LABELS.message}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                BUTTON_TEXT.submitInquiry
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
