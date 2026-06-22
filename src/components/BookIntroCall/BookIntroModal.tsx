import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isToday } from "date-fns";
import { Loader2, Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createBooking } from "@/services/bookings";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  service_type: z.string().min(1, "Service type is required"),
  goals: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  date: z.date({ required_error: "Please select a date for your intro meeting" }),
  time: z.string().min(1, "Please select a time slot"),
});

type FormValues = z.infer<typeof formSchema>;

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

interface BookIntroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDate?: Date;
}

export function BookIntroModal({ open, onOpenChange, initialDate }: BookIntroModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_type: "",
      goals: "",
      budget: "",
      timeline: "",
      date: initialDate,
    },
  });

  const watchDate = form.watch("date");

  // Compute available time slots
  const isSelectedDateToday = watchDate ? isToday(watchDate) : false;
  const now = new Date();
  
  const availableTimeSlots = TIME_SLOTS.filter(time => {
    if (!isSelectedDateToday) return true;
    
    const [timeVal, modifier] = time.split(" ");
    let [hours, minutes] = timeVal.split(":").map(Number);
    if (hours === 12) {
      hours = modifier === "PM" ? 12 : 0;
    } else if (modifier === "PM") {
      hours += 12;
    }
    
    const slotTotalMinutes = hours * 60 + minutes;
    const nowTotalMinutes = now.getHours() * 60 + now.getMinutes();
    
    // Require at least a 30-minute buffer
    return slotTotalMinutes > nowTotalMinutes + 30;
  });

  useEffect(() => {
    if (initialDate && open) {
      form.setValue("date", initialDate);
    }
  }, [initialDate, open, form]);

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);

      // Combine date and time into a single ISO string
      // Note: This is a simplistic combination. In a real app you might parse the time properly based on timezone.
      const dateString = format(data.date, "yyyy-MM-dd");

      // Parse 12-hour time format to 24-hour
      const [time, modifier] = data.time.split(" ");
      let [hours, minutes] = time.split(":");
      if (hours === "12") {
        hours = "00";
      }
      if (modifier === "PM") {
        hours = String(parseInt(hours, 10) + 12);
      }

      const scheduledAt = new Date(`${dateString}T${hours.padStart(2, '0')}:${minutes}:00`).toISOString();

      await createBooking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_type: data.service_type,
        goals: data.goals,
        budget: data.budget,
        timeline: data.timeline,
        scheduled_at: scheduledAt,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      setIsSuccess(true);
      toast.success("Intro meeting requested successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book the intro meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    // 0 is Sunday, 6 is Saturday
    return date < today || day === 0 || day === 6;
  };

  const resetForm = () => {
    form.reset();
    setIsSuccess(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) {
        setTimeout(resetForm, 300); // Reset form after closing animation
      }
    }}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-background border shadow-2xl sm:rounded-2xl overflow-hidden flex flex-col" data-lenis-prevent>
        <div className="sr-only">
          <DialogTitle>Book an Intro Meeting</DialogTitle>
          <DialogDescription>Fill out the form below to book an intro meeting with our team.</DialogDescription>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row flex-1 w-full overflow-y-auto lg:overflow-hidden h-full">
            {/* Column 1: Form Info */}
            <div className="w-full lg:w-[40%] p-6 md:p-8 bg-muted/30 lg:border-r lg:overflow-y-auto h-full" data-lenis-prevent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                  <h2 className="text-2xl font-heading font-bold">Request Sent!</h2>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We will review your request and manually schedule the Google Meet intro call shortly. Keep an eye on your inbox!
                  </p>
                  <Button type="button" onClick={() => onOpenChange(false)} className="mt-4">
                    Close Window
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-left">
                    <h2 className="text-2xl font-heading font-bold tracking-wider mb-2">
                      Book an Intro Meeting
                    </h2>
                    <div className="text-sm text-muted-foreground space-y-4">
                      <p>
                        Enter your details below to schedule a 15-minute intro
                        meeting and see how we can help you accelerate your growth.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormControl>
                              <Input placeholder="Full Name *" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <FormControl>
                              <Input placeholder="Email Address *" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <FormControl>
                              <Input placeholder="Phone Number *" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service_type"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="What are you looking for? *" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="web_development">Web Development</SelectItem>
                              <SelectItem value="branding">Branding</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="consulting">Consulting</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Partnership goals? (e.g. rebrand, website launch, etc.)"
                              className="resize-none h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Est. Budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="<10k">Under $10k</SelectItem>
                                <SelectItem value="10k-50k">$10k - $50k</SelectItem>
                                <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                                <SelectItem value="100k+">$100k+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asap">ASAP</SelectItem>
                                <SelectItem value="1-2_months">1-2 Months</SelectItem>
                                <SelectItem value="3-6_months">3-6 Months</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button for Mobile View */}
                  <div className="lg:hidden mt-6 pb-6">
                    <Button
                      type="submit"
                      className="w-full py-6 text-base"
                      disabled={isSubmitting || !watchDate || !form.watch("time")}
                    >
                      {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : "Book Your Intro"}
                    </Button>
                    {(!watchDate || !form.watch("time")) && (
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        Please select a date and time to continue
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Column 2: Calendar */}
            {!isSuccess && (
              <div className="w-full lg:w-[35%] p-6 md:p-8 flex flex-col bg-background lg:overflow-y-auto lg:h-full" data-lenis-prevent>
                <div className="mb-6">
                  <h3 className="font-semibold flex items-center mb-1">
                    <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                    Select a Date
                  </h3>
                  <p className="text-sm text-muted-foreground">Pick a day that works for you.</p>
                </div>

                <div className="flex-1 overflow-y-auto flex justify-center">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={disabledDays}
                          className="rounded-md border shadow-sm"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {/* Column 3: Time Slots & Submit */}
            {!isSuccess && (
              <div className="w-full lg:w-[25%] flex flex-col bg-muted/10 lg:border-l lg:h-full">
                {watchDate ? (
                  <div className="flex-1 flex flex-col min-h-0 h-full p-6 md:p-8 pb-0">
                    <div className="flex-shrink-0 mb-6">
                      <div className="font-medium text-sm flex items-center mb-1">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        {format(watchDate, "EEEE, MMM d")}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {Intl.DateTimeFormat().resolvedOptions().timeZone} Time
                      </p>
                    </div>

                    <div className="flex-1 relative min-h-0">
                      <div className="absolute inset-0 overflow-y-auto pr-2 pb-6" data-lenis-prevent>
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              {availableTimeSlots.length > 0 ? (
                                availableTimeSlots.map((time) => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => field.onChange(time)}
                                    className={`w-full text-left px-4 py-3 text-sm rounded-md transition-all border ${field.value === time
                                        ? "bg-primary text-primary-foreground border-primary font-medium shadow-md"
                                        : "hover:border-primary/50 hover:bg-background bg-card border-border shadow-sm"
                                      }`}
                                  >
                                    {time}
                                  </button>
                                ))
                              ) : (
                                <div className="text-center p-6 text-sm text-muted-foreground border border-dashed rounded-md bg-muted/30">
                                  No available slots left for today. Please select another date.
                                </div>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col min-h-0 h-full items-center justify-center text-muted-foreground text-sm text-center p-6 md:p-8">
                    <div className="w-full h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 bg-background/50">
                      <CalendarIcon className="w-8 h-8 mb-3 opacity-20" />
                      <p>Select a date to see available time slots</p>
                    </div>
                  </div>
                )}

                {/* Desktop Submit Button */}
                {watchDate && (
                  <div className="hidden lg:block flex-shrink-0 p-6 md:p-8 pt-4 bg-muted border-t mt-auto">
                    <Button
                      onClick={form.handleSubmit(onSubmit)}
                      className="w-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting || !watchDate || !form.watch("time")}
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> ...</>
                      ) : (
                        "Book Intro"
                      )}
                    </Button>
                    {(!watchDate || !form.watch("time")) && (
                      <p className="text-center text-[10px] text-muted-foreground mt-2 leading-tight">
                        Select date & time
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
