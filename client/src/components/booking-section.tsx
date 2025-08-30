import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { InsertBooking } from "@shared/schema";

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "4:00 PM - 5:00 PM"
];

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState("January 2024");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const { toast } = useToast();

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/booking", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed",
        description: "Your consultation has been scheduled successfully!",
      });
      setFormData({ name: "", email: "", phone: "" });
      setSelectedTime("");
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Failed to schedule your consultation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a date and time.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate({
      ...formData,
      date: `${currentMonth} ${selectedDate}`,
      time: selectedTime
    });
  };

  return (
    <section id="booking" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-yellow-400">Book a Free Consultation</span>
          </h2>
          <p className="text-gray-300">Schedule your strategy call to discover how AI can transform your business.</p>
        </div>

        <div className="glassmorphism rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-secondary rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{currentMonth}</h3>
                <div className="flex space-x-2">
                  <button 
                    className="text-purple-400 hover:text-purple-300"
                    data-testid="button-previous-month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-purple-400 hover:text-purple-300"
                    data-testid="button-next-month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-gray-400 p-2">{day}</div>
                ))}
                
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day.toString())}
                    className={`p-2 rounded transition-colors ${
                      selectedDate === day.toString()
                        ? "bg-purple-600 text-white"
                        : "text-white hover:bg-purple-600"
                    }`}
                    data-testid={`button-select-date-${day}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots and Form */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Available Time Slots</h3>
                <div className="space-y-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`w-full py-3 px-4 rounded-lg transition-colors text-left ${
                        selectedTime === slot
                          ? "bg-purple-600 text-white"
                          : "bg-secondary hover:bg-purple-600 text-white"
                      }`}
                      data-testid={`button-select-time-${slot.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3"
                    placeholder="Your full name"
                    data-testid="input-booking-name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3"
                    placeholder="your@email.com"
                    data-testid="input-booking-email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3"
                    placeholder="+1 (555) 000-0000"
                    data-testid="input-booking-phone"
                  />
                </div>
              </div>

              <button 
                className="gradient-button w-full py-3 px-6 rounded-lg text-white font-semibold disabled:opacity-50"
                onClick={handleConfirmBooking}
                disabled={bookingMutation.isPending}
                data-testid="button-confirm-booking"
              >
                {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
