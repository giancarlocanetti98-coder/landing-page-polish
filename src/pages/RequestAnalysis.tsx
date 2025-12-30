import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  school: z.string().min(1, "School is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  additionalInfo: z.string().optional(),
}).refine((data) => data.email || data.phone, {
  message: "Please provide at least an email or phone number",
  path: ["email"],
});

type FormData = z.infer<typeof formSchema>;

const RequestAnalysis = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      school: "",
      position: "",
      email: "",
      phone: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    toast({
      title: "Request Submitted",
      description: "Thank you! We'll be in touch shortly.",
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-gold/10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-gold/15" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-gold/20" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-oxford/70 hover:text-oxford transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-sans">Back to Home</span>
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford mb-6 leading-tight">
              Let's find the Oxbridge offers that are going to other schools.
            </h1>
            <p className="font-sans text-lg md:text-xl text-oxford/80">
              Every lost offer has a cause. Identify it - before another year goes by.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gold/10"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford font-sans font-medium">
                        Name <span className="text-gold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          className="border-oxford/20 focus:border-gold bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford font-sans font-medium">
                        School <span className="text-gold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your school name" 
                          className="border-oxford/20 focus:border-gold bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford font-sans font-medium">
                        Position <span className="text-gold">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your role at the school" 
                          className="border-oxford/20 focus:border-gold bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-oxford font-sans font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com" 
                            className="border-oxford/20 focus:border-gold bg-white"
                            {...field} 
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
                        <FormLabel className="text-oxford font-sans font-medium">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+44 123 456 7890" 
                            className="border-oxford/20 focus:border-gold bg-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <p className="text-sm text-oxford/60 font-sans -mt-2">
                  Please provide at least an email or phone number so we can reach you.
                </p>

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-oxford font-sans font-medium">
                        Additional Information
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Preferred method/time of contact, or anything else you'd like to share..." 
                          className="border-oxford/20 focus:border-gold bg-white min-h-[120px] resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold hover:bg-gold/90 text-oxford font-semibold px-10 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Request Free Analysis"}
                  </Button>
                  <p className="mt-4 text-oxford/70 font-sans italic">
                    The analysis is free and carries no obligation.
                  </p>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RequestAnalysis;
