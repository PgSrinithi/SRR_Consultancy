import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  CLIENT_MODAL_TITLE,
  CLIENT_MODAL_DESCRIPTION,
  CLIENT_FORM_LABELS,
  CLIENT_FORM_PLACEHOLDERS,
  CLIENT_INDUSTRIES,
  CLIENT_LOCATIONS,
  BUTTON_TEXT,
  TOAST_MESSAGES,
  VALIDATION_MESSAGES,
} from "@/lib/constants";

const clientFormSchema = z.object({
  name: z.string().min(2, VALIDATION_MESSAGES.nameRequired),
  email: z.string().email(VALIDATION_MESSAGES.emailInvalid),
  phone: z.string().min(10, VALIDATION_MESSAGES.phoneInvalid),
  businessName: z.string().min(2, VALIDATION_MESSAGES.businessNameRequired),
  industry: z.string().min(1, VALIDATION_MESSAGES.industryRequired),
  otherIndustry: z.string().optional(),
  locations: z.array(z.string()).min(1, VALIDATION_MESSAGES.locationsRequired),
  otherLocation: z.string().optional(),
  message: z.string().optional(),
}).refine(
  (data) => data.industry !== "Other" || (data.otherIndustry && data.otherIndustry.trim().length > 0),
  {
    message: VALIDATION_MESSAGES.industrySpecifyRequired,
    path: ["otherIndustry"],
  }
).refine(
  (data) => !data.locations.includes("Other") || (data.otherLocation && data.otherLocation.trim().length > 0),
  {
    message: VALIDATION_MESSAGES.locationSpecifyRequired,
    path: ["otherLocation"],
  }
);

interface ClientModalProps {
  children: React.ReactNode;
}

export function ClientModal({ children }: ClientModalProps) {
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
      otherIndustry: "",
      locations: [],
      otherLocation: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clientFormSchema>) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/client-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setOpen(false);
      form.reset();

      toast({
        title: TOAST_MESSAGES.inquirySuccess.title,
        description: TOAST_MESSAGES.inquirySuccess.description,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: TOAST_MESSAGES.inquiryError.title,
        description: TOAST_MESSAGES.inquiryError.description,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const toggleLocation = (location: string) => {
    const currentLocations = form.getValues("locations");
    if (currentLocations.includes(location)) {
      form.setValue(
        "locations",
        currentLocations.filter((l) => l !== location)
      );
    } else {
      form.setValue("locations", [...currentLocations, location]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white border-none shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary">
            {CLIENT_MODAL_TITLE}
          </DialogTitle>
          <DialogDescription>
            {CLIENT_MODAL_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">
                    {CLIENT_FORM_LABELS.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={CLIENT_FORM_PLACEHOLDERS.name}
                      {...field}
                      className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">{CLIENT_FORM_LABELS.email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={CLIENT_FORM_PLACEHOLDERS.email}
                        {...field}
                        className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent"
                      />
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
                    <FormLabel className="text-foreground/80">{CLIENT_FORM_LABELS.phone}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={CLIENT_FORM_PLACEHOLDERS.phone}
                        {...field}
                        className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent"
                      />
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
                  <FormLabel className="text-foreground/80">
                    {CLIENT_FORM_LABELS.businessName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={CLIENT_FORM_PLACEHOLDERS.businessName}
                      {...field}
                      className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent"
                    />
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
                  <FormLabel className="text-foreground/80">{CLIENT_FORM_LABELS.industry}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent">
                        <SelectValue placeholder={CLIENT_FORM_PLACEHOLDERS.industry} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CLIENT_INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Industry Text Field */}
            {form.watch("industry") === "Other" && (
              <FormField
                control={form.control}
                name="otherIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      {CLIENT_FORM_LABELS.otherIndustry}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={CLIENT_FORM_PLACEHOLDERS.otherIndustry}
                        {...field}
                        className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Locations */}
            <FormField
              control={form.control}
              name="locations"
              render={() => (
                <FormItem>
                  <FormLabel className="text-foreground/80">
                    {CLIENT_FORM_LABELS.locations}
                  </FormLabel>
                  <div className="space-y-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                    {CLIENT_LOCATIONS.map((location) => (
                      <div key={location} className="flex items-center">
                        <Checkbox
                          id={`location-${location}`}
                          checked={form
                            .getValues("locations")
                            .includes(location)}
                          onCheckedChange={() => toggleLocation(location)}
                          className="cursor-pointer"
                        />
                        <label
                          htmlFor={`location-${location}`}
                          className="ml-2 text-sm text-foreground/80 cursor-pointer"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Location Text Field */}
            {form.watch("locations").includes("Other") && (
              <FormField
                control={form.control}
                name="otherLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      {CLIENT_FORM_LABELS.otherLocation}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={CLIENT_FORM_PLACEHOLDERS.otherLocation}
                        {...field}
                        className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent"
                      />
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
                  <FormLabel className="text-foreground/80">
                    {CLIENT_FORM_LABELS.message}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={CLIENT_FORM_PLACEHOLDERS.message}
                      {...field}
                      className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
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
}
