import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Clock, Video, Globe, CheckCircle } from "lucide-react";
import type { InsertBooking } from "@shared/schema";

// Helper functions for date and time logic
const getWeekdays = () => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      days.push({
        date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        fullDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
  }
  
  return days.slice(0, 5); // Return max 5 weekdays
};

const getAvailableTimeSlots = (selectedDate: Date) => {
  const baseSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00"
  ];
  
  const now = new Date();
  const isToday = selectedDate.toDateString() === now.toDateString();
  
  if (!isToday) {
    return baseSlots;
  }
  
  // For today, only show slots after current time + 1 hour buffer
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const bufferTime = currentHour + 1 + (currentMinute > 30 ? 1 : 0);
  
  return baseSlots.filter(slot => {
    const [hours, minutes] = slot.split(':').map(Number);
    const slotTime = hours + (minutes / 60);
    return slotTime > bufferTime;
  });
};

const getCurrentMonth = () => {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export default function BookingSection() {
  const [weekdays, setWeekdays] = useState(getWeekdays());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyUrl: "",
    helpDescription: ""
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      const slots = getAvailableTimeSlots(selectedDate);
      setAvailableSlots(slots);
      setSelectedTime(""); // Reset selected time when date changes
    }
  }, [selectedDate]);

  useEffect(() => {
    // Set default to today if it's a weekday
    const today = new Date();
    if (today.getDay() !== 0 && today.getDay() !== 6) {
      setSelectedDate(today);
    } else {
      // If today is weekend, select first available weekday
      const firstWeekday = weekdays[0];
      if (firstWeekday) {
        setSelectedDate(firstWeekday.date);
      }
    }
  }, []);

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
      setFormData({ name: "", email: "", phone: "", companyName: "", companyUrl: "", helpDescription: "" });
      setSelectedTime("");
      setShowBookingForm(false);
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
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.companyName || !formData.helpDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a date and time.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate({
      ...formData,
      date: selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: selectedTime
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const getSelectedDateFormatted = () => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' });
  };

  return (
    <section id="booking" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your <span className="text-yellow-400">Consultation</span>
          </h2>
          <p className="text-gray-300 text-lg">Transform your ideas into reality. Schedule a free consultation with our team today.</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-0 overflow-hidden max-w-5xl mx-auto">
          {!showBookingForm ? (
            <div className="grid lg:grid-cols-12 gap-0 min-h-[500px]">
              {/* Profile & Meeting Details */}
              <div className="lg:col-span-4 p-6 bg-gray-800">
                <div className="flex items-center mb-4">
                  <img 
                    src="/attached_assets/image_1756701905144.png" 
                    alt="Masroof Amin"
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="text-gray-400 text-sm">Masroof Amin</div>
                  </div>
                </div>
                
                <h3 className="text-white text-xl font-semibold mb-2">Onboarding</h3>
                <div className="text-sm text-gray-300 italic mb-4">
                  This call is strictly reserved for those interested in
                  <span className="text-blue-400"> AI development services.</span>
                </div>
                
                <div className="text-xs text-gray-400 mb-6">
                  If you don't find an available spot, please reach out to us at{' '}
                  <span className="text-blue-400 underline">masroof@sunriseai.com</span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                    <span>Requires confirmation</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-3" />
                    <span>30m</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Video className="w-4 h-4 mr-3 text-green-400" />
                    <span>Google Meet</span>
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
                  {/* Fill calendar with actual dates */}
                  {Array.from({ length: 35 }, (_, index) => {
                    const startDate = new Date();
                    startDate.setDate(1); // First day of current month
                    const firstDayOfWeek = startDate.getDay();
                    const dayNumber = index - firstDayOfWeek + 1;
                    
                    if (dayNumber <= 0 || dayNumber > 30) {
                      return <div key={index} className="p-3"></div>;
                    }
                    
                    const dateForButton = new Date();
                    dateForButton.setDate(dayNumber);
                    const isSelected = selectedDate && selectedDate.getDate() === dayNumber;
                    const isWeekday = weekdays.some(wd => wd.dayNumber === dayNumber);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => isWeekday && handleDateSelect(dateForButton)}
                        disabled={!isWeekday}
                        className={`p-3 text-sm transition-colors ${
                          isSelected
                            ? "bg-white text-black rounded font-semibold"
                            : isWeekday 
                              ? "text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
                              : "text-gray-600 cursor-not-allowed"
                        }`}
                        data-testid={`button-select-date-${dayNumber}`}
                      >
                        {dayNumber}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="lg:col-span-3 p-6 bg-gray-800 border-l border-gray-700">
                <div className="mb-4">
                  <div className="text-white font-semibold mb-1">{getSelectedDateFormatted()}</div>
                  <div className="flex space-x-2 text-xs">
                    <span className="text-gray-400">12h</span>
                    <span className="text-gray-400">24h</span>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {selectedDate ? (
                    availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => {
                            setSelectedTime(slot);
                            setShowBookingForm(true);
                          }}
                          className={`w-full py-3 px-4 rounded-lg transition-colors text-center border ${
                            selectedTime === slot
                              ? "bg-white text-black border-white font-semibold"
                              : "bg-transparent text-white border-gray-600 hover:border-gray-400"
                          }`}
                          data-testid={`button-select-time-${slot.replace(':', '-')}`}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <div className="text-gray-400 text-center py-8">
                        No available slots for this day
                      </div>
                    )
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      Please select a date
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Booking Form Interface
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Left Side - Meeting Details with Selected Time */}
              <div className="p-8 bg-gray-800">
                <div className="flex items-center mb-6">
                  <img 
                    src="/attached_assets/image_1756701905144.png" 
                    alt="Masroof Amin"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="text-gray-400 text-sm">Masroof Amin</div>
                  </div>
                </div>
                
                <h3 className="text-white text-2xl font-semibold mb-4">Onboarding</h3>
                <div className="text-sm text-gray-300 italic mb-6">
                  <strong>This call is strictly reserved for those interested in</strong>
                  <span className="text-blue-400"> Sunrise AI development services.</span>
                </div>
                
                <div className="text-sm text-gray-400 mb-8">
                  If you don't find an available spot, please reach out to us at{' '}
                  <span className="text-blue-400 underline">masroof@sunriseai.com</span>
                </div>
                
                {/* Selected Date and Time */}
                {selectedDate && selectedTime && (
                  <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center text-white mb-2">
                      <Clock className="w-5 h-5 mr-3" />
                      <span className="font-semibold">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="text-white text-lg font-bold ml-8">
                      {selectedTime}–{(() => {
                        const [hours, minutes] = selectedTime.split(':').map(Number);
                        const endTime = new Date();
                        endTime.setHours(hours, minutes + 30);
                        return endTime.toTimeString().slice(0, 5);
                      })()}
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Requires confirmation</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>30m</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Video className="w-5 h-5 mr-3 text-green-400" />
                    <span>Google Meet</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Globe className="w-5 h-5 mr-3" />
                    <span>Asia/Calcutta</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Booking Form */}
              <div className="p-8 bg-gray-900">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Book Your <span className="text-orange-400">Consultation</span>
                </h2>
                <p className="text-gray-400 mb-8">Transform your ideas into reality. Schedule a free consultation with our team today.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white mb-2">Your name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-orange-400 focus:outline-none"
                      placeholder="Your full name"
                      data-testid="input-booking-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">Email address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-orange-400 focus:outline-none"
                      placeholder="your@email.com"
                      data-testid="input-booking-email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">Your company name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-orange-400 focus:outline-none"
                      placeholder="Company name"
                      data-testid="input-booking-company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">Your company url *</label>
                    <input
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 focus:border-orange-400 focus:outline-none"
                      placeholder="https://yourcompany.com"
                      data-testid="input-booking-url"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">What do you need help with? *</label>
                    <textarea
                      value={formData.helpDescription}
                      onChange={(e) => setFormData({ ...formData, helpDescription: e.target.value })}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3 h-24 focus:border-orange-400 focus:outline-none resize-none"
                      placeholder="Please share anything that will help prepare for our meeting."
                      data-testid="textarea-booking-help"
                    />
                  </div>

                  <div className="flex items-center text-sm text-gray-400">
                    <span className="mr-2">👥</span>
                    <span className="text-orange-400 cursor-pointer hover:underline">Add guests</span>
                  </div>

                  <div className="text-xs text-gray-500">
                    By proceeding, you agree to our{' '}
                    <span className="text-orange-400 underline cursor-pointer">Terms</span> and{' '}
                    <span className="text-orange-400 underline cursor-pointer">Privacy Policy</span>.
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button 
                      onClick={() => setShowBookingForm(false)}
                      className="px-6 py-3 text-white bg-transparent border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                      data-testid="button-back-booking"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleConfirmBooking}
                      disabled={bookingMutation.isPending}
                      className="flex-1 bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                      data-testid="button-confirm-booking"
                    >
                      {bookingMutation.isPending ? "Booking..." : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Cal.com Branding */}
          <div className="text-center py-4 border-t border-gray-700">
            <span className="text-gray-400 text-sm">Cal.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
