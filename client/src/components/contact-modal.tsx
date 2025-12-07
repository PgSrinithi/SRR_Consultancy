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
import { Upload, Send, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  requirement: z.string().min(10, "Please describe your requirement"),
  resume: z.any().optional(), // File validation is complex in frontend-only, keeping it simple
});

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      requirement: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", values);
      setIsSubmitting(false);
      setOpen(false);
      form.reset();
      
      toast({
        title: "Request Sent Successfully",
        description: "We have received your details. Our team will contact you shortly.",
        duration: 5000,
      });
      
      // In a real app, this would be:
      // await axios.post('/api/send-email', formData);
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary">Get in Touch</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent" />
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
                    <FormLabel className="text-foreground/80">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" {...field} className="bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Requirement</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your manpower requirements or job application..." 
                      className="resize-none bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
               <FormLabel className="text-foreground/80">Resume / Document</FormLabel>
               <div className="flex items-center gap-2 p-2 border border-dashed border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                 <Upload className="h-5 w-5 text-muted-foreground" />
                 <span className="text-sm text-muted-foreground">Click to upload file (PDF, DOCX)</span>
                 <Input 
                   type="file" 
                   className="absolute inset-0 opacity-0 cursor-pointer" 
                   accept=".pdf,.doc,.docx"
                   onChange={(e) => {
                     // Handle file change if needed for preview
                     console.log(e.target.files);
                   }}
                 />
               </div>
               <p className="text-xs text-muted-foreground mt-1">Max file size: 5MB</p>
            </FormItem>

            <div className="pt-2">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
