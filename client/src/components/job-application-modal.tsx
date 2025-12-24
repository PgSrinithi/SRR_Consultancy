import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import {
  JOB_APPLICATION_TITLE,
  JOB_APPLICATION_FORM_LABELS,
  JOB_APPLICATION_PLACEHOLDERS,
  VALIDATION_MESSAGES,
  RESUME_ACCEPTED_FORMATS,
  RESUME_ACCEPT_TYPES,
  RESUME_UPLOAD_TEXT,
  BUTTON_TEXT,
  TOAST_MESSAGES,
} from "@/lib/constants";

const jobApplicationSchema = z.object({
  jobTitle: z.string(),
  applicantName: z.string().min(2, VALIDATION_MESSAGES.nameRequired),
  applicantEmail: z.string().email(VALIDATION_MESSAGES.emailInvalid),
  applicantPhone: z.string().min(10, VALIDATION_MESSAGES.phoneInvalid),
  message: z.string().optional(),
  resume: z.any().optional(),
});

interface JobApplicationModalProps {
  jobTitle: string;
  children: React.ReactNode;
}

export function JobApplicationModal({ jobTitle, children }: JobApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof jobApplicationSchema>>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobTitle,
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof jobApplicationSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/apply-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setOpen(false);
      form.reset();
      setFileName(null);
      
      toast({
        title: TOAST_MESSAGES.applicationSuccess.title,
        description: TOAST_MESSAGES.applicationSuccess.description,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: TOAST_MESSAGES.applicationError.title,
        description: TOAST_MESSAGES.applicationError.description,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary">{JOB_APPLICATION_TITLE}</DialogTitle>
          <DialogDescription>
            {jobTitle}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{JOB_APPLICATION_FORM_LABELS.applicantName}</FormLabel>
                  <FormControl>
                    <Input placeholder={JOB_APPLICATION_PLACEHOLDERS.applicantName} {...field} className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="applicantEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">{JOB_APPLICATION_FORM_LABELS.applicantEmail}</FormLabel>
                    <FormControl>
                      <Input placeholder={JOB_APPLICATION_PLACEHOLDERS.applicantEmail} {...field} className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicantPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">{JOB_APPLICATION_FORM_LABELS.applicantPhone}</FormLabel>
                    <FormControl>
                      <Input placeholder={JOB_APPLICATION_PLACEHOLDERS.applicantPhone} {...field} className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{JOB_APPLICATION_FORM_LABELS.message}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={JOB_APPLICATION_PLACEHOLDERS.message} 
                      {...field} 
                      className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{JOB_APPLICATION_FORM_LABELS.resume}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept={RESUME_ACCEPT_TYPES}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileName(file.name);
                            onChange(file);
                          }
                        }}
                        {...field}
                        className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 rounded-md cursor-pointer hover:border-accent transition-colors bg-slate-50"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="text-sm text-foreground/80">
                          {fileName || RESUME_UPLOAD_TEXT}
                        </span>
                      </label>
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Accepted formats: {RESUME_ACCEPTED_FORMATS}</p>
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
                BUTTON_TEXT.submitApplication
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
