import { useState, useEffect } from "react";
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setYear,
  getYear,
} from "date-fns";
import { id } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

interface DatePickerProps {
  title: string;
  name: string;
  value: null | string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  name,
  value,
  onDateChange,
}) => {
  const today = new Date();
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(getYear(new Date()));
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  useEffect(() => {
    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      setSelectedDate(parsedDate);
      setCurrentMonth(parsedDate);
      setCurrentYear(getYear(parsedDate));
    } else {
      const formattedToday = format(today, "yyyy-MM-dd");
      setSelectedDate(today);
      setCurrentMonth(today);
      setCurrentYear(getYear(today));
      onDateChange(formattedToday);
    }
  }, [value]);

  const toggleDatepicker = () => {
    setShowDatepicker((prev) => !prev);
    setShowYearDropdown(false);
  };

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setCurrentYear(getYear(newMonth));
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setCurrentYear(getYear(newMonth));
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(setYear(currentMonth, year));
    setCurrentYear(year);
    setShowYearDropdown(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatepicker(false);
    onDateChange(format(date, "yyyy-MM-dd"));
  };

  const renderYears = () => {
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );

    return (
      <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2 max-h-48 overflow-auto scrollbar-hide">
        {years.map((year) => (
          <div
            key={year}
            onClick={() => handleYearSelect(year)}
            className={`p-2 cursor-pointer text-center rounded-md ${
              year === currentYear ? "bg-blue-500 text-white" : "text-gray-700"
            } hover:bg-blue-100`}
          >
            {year}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
    return days.map((day) => (
      <div
        key={day}
        className="text-center text-xs font-bold text-gray-medium dark:text-gray-medium-light"
      >
        {day}
      </div>
    ));
  };

  const renderDates = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 0,
    });
    const endDate = endOfMonth(currentMonth);
    const dates: Date[] = [];

    for (
      let date = startDate;
      date <= addDays(endDate, 6);
      date = addDays(date, 1)
    ) {
      dates.push(date);
    }

    return dates.map((date) => (
      <div
        key={date.toISOString()}
        onClick={() =>
          isSameMonth(date, currentMonth) && handleDateSelect(date)
        }
        className={`p-2 rounded-lg cursor-pointer ${
          isSameDay(date, selectedDate ?? new Date())
            ? "bg-brand-base text-basic-white dark:text-basic-black"
            : isSameMonth(date, currentMonth)
            ? "text-basic-black dark:text-basic-white hover:bg-brand-90"
            : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {format(date, "d")}
      </div>
    ));
  };

  return (
    <div className="relative bg-basic-white dark:bg-basic-black h-auto w-full">
      <input
        type="hidden"
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
        name={name}
      />
      <div className="flex flex-col justify-start items-start">
        <label
          htmlFor="date-picker-input"
          className="text-body text-basic-black dark:text-basic-white mb-2"
        >
          <div>
            {title} <span></span>
          </div>
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="date-picker-input"
            placeholder="Pilih tanggal"
            className="w-full p-2 bg-basic-white dark:bg-basic-black text-basic-black dark:text-basic-white cursor-pointer pr-4 py-2 border border-border rounded-md"
            readOnly
            value={
              selectedDate
                ? format(selectedDate, "yyyy-MM-dd", { locale: id })
                : ""
            }
            onClick={toggleDatepicker}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-xl text-brand-base"
            />
          </div>
        </div>
      </div>
      {showDatepicker && (
        <div className="datepicker absolute top-24 left-0 w-auto p-4 bg-basic-white dark:bg-basic-black border border-gray-medium-light rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center mb-4">
            <button
              className="text-xl text-gray-medium dark:text-gray-medium-light"
              onClick={handlePrevMonth}
            >
              &laquo;
            </button>
            <div className="flex items-center space-x-2">
              <span
                className="font-bold text-basic-black dark:text-basic-white cursor-pointer"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {format(currentMonth, "MMMM", { locale: id })}
              </span>
              <span
                className="font-bold text-basic-black dark:text-basic-white cursor-pointer"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {currentYear}
              </span>
            </div>
            <button
              className="text-xl text-gray-medium dark:text-gray-medium-light"
              onClick={handleNextMonth}
            >
              &raquo;
            </button>
          </div>
          {showYearDropdown && renderYears()}
          <div className="grid grid-cols-7 text-center mt-10 mb-2">
            {renderDays()}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {renderDates()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
