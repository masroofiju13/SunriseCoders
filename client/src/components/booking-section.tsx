import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Clock, Video, Globe } from "lucide-react";
import type { InsertBooking } from "@shared/schema";

const timeSlots = [
  "9:30pm",
  "10:00pm", 
  "10:30pm",
  "11:00pm",
  "11:30pm"
];

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState("September 2025");
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-yellow-400">Book a Free Consultation</span>
          </h2>
        </div>

        <div className="bg-gray-900 rounded-2xl p-0 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Meeting Details */}
            <div className="lg:col-span-4 p-6 bg-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">VR</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Vladmir Rumyantsev</div>
                </div>
              </div>
              
              <h3 className="text-white text-xl font-semibold mb-2">30 Min AI Meeting</h3>
              <p className="text-gray-400 mb-6">Let's discover how AI can help you</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>30m</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Video className="w-4 h-4 mr-3" />
                  <span>Cal Video</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Globe className="w-4 h-4 mr-3" />
                  <span>Asia/Kolkata ▾</span>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="lg:col-span-5 p-6 bg-gray-900">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">{currentMonth}</h3>
                <div className="flex space-x-2">
                  <button 
                    className="text-gray-400 hover:text-white p-1"
                    data-testid="button-previous-month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-white p-1"
                    data-testid="button-next-month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
                  <div key={`day-${index}`} className="text-gray-500 p-2 text-xs font-medium">{day}</div>
                ))}
              </div>
                
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day.toString())}
                    className={`p-3 text-sm transition-colors ${
                      selectedDate === day.toString()
                        ? "bg-white text-black rounded"
                        : "text-gray-300 hover:bg-gray-700 rounded"
                    }`}
                    data-testid={`button-select-date-${day}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="lg:col-span-3 p-6 bg-gray-800 border-l border-gray-700">
              <div className="mb-4">
                <div className="text-white font-semibold mb-1">Mon 01</div>
                <div className="flex space-x-2 text-xs">
                  <span className="text-gray-400">12h</span>
                  <span className="text-gray-400">24h</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`w-full py-3 px-4 rounded-lg transition-colors text-center border ${
                      selectedTime === slot
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-gray-600 hover:border-gray-400"
                    }`}
                    data-testid={`button-select-time-${slot.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Cal.com Branding */}
          <div className="text-center py-4 border-t border-gray-700">
            <span className="text-gray-400 text-sm">Cal.com</span>
          </div>
        </div>
        
        {/* Contact Form Modal - Shows after time selection */}
        {selectedTime && (
          <div className="mt-8 bg-gray-900 rounded-2xl p-6">
            <h3 className="text-white text-xl font-semibold mb-6">Complete Your Booking</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
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
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
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
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  placeholder="+1 (555) 000-0000"
                  data-testid="input-booking-phone"
                />
              </div>

              <div className="flex items-end">
                <button 
                  className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  onClick={handleConfirmBooking}
                  disabled={bookingMutation.isPending}
                  data-testid="button-confirm-booking"
                >
                  {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
