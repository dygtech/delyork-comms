import { useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import { BookIntroModal } from "./BookIntroModal";

// Helper to get next 5 weekdays
const getNextWeekdays = () => {
  const days: Date[] = [];
  let currentDate = new Date();

  while (days.length < 5) {
    currentDate = addDays(currentDate, 1);
    if (!isWeekend(currentDate)) {
      days.push(currentDate);
    }
  }
  return days;
};

export function IntroCallWidget() {
  const [isSmallWidgetOpen, setIsSmallWidgetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const nextDays = getNextWeekdays();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleBookIntroClick = () => {
    setSelectedDate(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">

        {/* Small Widget Popup */}
        {isSmallWidgetOpen && (
          <div className="mb-4 w-[340px] bg-background border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            {/* Header */}
            <div className="p-4 flex items-start justify-between border-b">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=6366f1"
                    alt="Michael"
                    className="w-10 h-10 rounded-full bg-muted"
                  />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Delyork Communications</h4>
                  <p className="text-xs text-muted-foreground">Brand, Content & Digital Impact</p>
                </div>
              </div>
              <button
                onClick={() => setIsSmallWidgetOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-heading font-bold text-lg mb-2">Book an Intro Meeting</h3>
              <p className="text-sm text-muted-foreground mb-5">

              </p>

              {/* Date selection boxes */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                {nextDays.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => handleDateClick(day)}
                    className="flex-shrink-0 flex flex-col items-center justify-center w-[58px] h-[64px] border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-xs font-medium">{format(day, 'eee')}</span>
                    <span className="text-lg font-bold">{format(day, 'd')}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleBookIntroClick}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book an Intro
              </button>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsSmallWidgetOpen(!isSmallWidgetOpen)}
          className="flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl hover:scale-105 transition-all duration-300"
        >
          {isSmallWidgetOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <CalendarDays className="w-6 h-6" />
          )}
        </button>
      </div>

      <BookIntroModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialDate={selectedDate}
      />
    </>
  );
}
