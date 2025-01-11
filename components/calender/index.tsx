/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  format,
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

interface CalenderType {
  onDataChange: (data: string) => void;
}

const Calender: React.FC<CalenderType> = ({ onDataChange }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [currentYear, setCurrentYear] = useState<number>(getYear(new Date()));

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setSelectedYear(getYear(newMonth));
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setSelectedYear(getYear(newMonth));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDataChange(format(date, "yyyy-MM-dd"));
  };

  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
  };

  const handleYearSelect = (year: number) => {
    const newDate = setYear(currentMonth, year);
    setSelectedYear(year);
    setCurrentMonth(newDate);
    setShowYearDropdown(false);
  };

  const renderYears = () => {
    const years = Array.from({ length: 20 }, (_, i) => currentYear - 19 + i);
    return (
      <div className="absolute top-10 right-0 bg-brand-base dark:bg-basic-black dark:text-basic-white border-2 rounded-lg shadow-lg z-50 max-h-48 overflow-auto scrollbar-hide">
        {years.map((year) => (
          <div
            key={year}
            onClick={() => handleYearSelect(year)}
            className={`p-2 cursor-pointer text-center rounded-lg ${
              year === selectedYear
                ? "bg-brand-base text-basic-white dark:text-basic-black"
                : "text-basic-black dark:text-basic-white"
            } hover:bg-brand-10 dark:hover:bg-brand-90`}
          >
            {year}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
    let date = startDate;

    while (isSameMonth(date, currentMonth) || date <= endDate) {
      dates.push(date);
      date = addDays(date, 1);
    }

    return dates.map((date, index) => (
      <div
        key={index}
        onClick={() => handleDateClick(date)}
        className={`aspect-square w-8 text-center flex justify-center items-center text-sm cursor-pointer rounded-full ${
          isSameMonth(date, currentMonth)
            ? isSameDay(date, selectedDate ?? new Date())
              ? "bg-brand-base text-basic-white"
              : "text-basic-black dark:text-basic-white hover:bg-brand-10 dark:hover:bg-brand-90"
            : "text-gray-medium dark:text-gray-medium-light "
        }`}
      >
        {format(date, "d")}
      </div>
    ));
  };

  return (
    <div className="relative w-full xl:w-80 p-2 bg-basic-white dark:bg-basic-black dark:text-basic-white z-10 flex flex-col gap-4">
      <div className="flex justify-between items-center relative">
        <button
          className="text-xl text-gray-medium dark:text-gray-medium-light"
          onClick={handlePrevMonth}
        >
          &laquo;
        </button>
        <div className="flex items-center gap-2">
          <span className="font-bold text-basic-black dark:text-basic-white">
            {format(currentMonth, "MMMM", { locale: id })}
          </span>
          <span
            className="font-bold text-basic-black dark:text-basic-white cursor-pointer"
            onClick={toggleYearDropdown}
          >
            {selectedYear ? selectedYear : currentYear}
          </span>
        </div>
        <button
          className="text-xl text-gray-medium-light"
          onClick={handleNextMonth}
        >
          &raquo;
        </button>
        {showYearDropdown && renderYears()}
      </div>
      <div className="grid grid-cols-7 text-center">{renderDays()}</div>
      <div className="grid grid-cols-7 gap-2 text-center">{renderDates()}</div>
    </div>
  );
};

export default Calender;
