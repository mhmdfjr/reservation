"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CardDashboard from "@/components/card-dashboard";
import Calender from "@/components/calender";
import TableDashboard from "@/components/table/tableDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonShelter,
  faUsers,
  faUserTie,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const token = Cookies.get("token");
  const router = useRouter();

  const [childData, setChildData] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const cards = [
    {
      title: "Number of Reservations",
      sum: 50,
      date: "2024-01-03",
      icon: (
        <FontAwesomeIcon
          icon={faCalendarCheck}
          className="text-2xl text-brand-base"
        />
      ),
    },
    {
      title: "Number of Rooms",
      sum: 50,
      date: "2024-01-03",
      icon: (
        <FontAwesomeIcon
          icon={faPersonShelter}
          className="text-2xl text-brand-base"
        />
      ),
    },
    {
      title: "Number of Residents",
      sum: 50,
      date: "2024-01-03",
      icon: (
        <FontAwesomeIcon icon={faUsers} className="text-2xl text-brand-base" />
      ),
    },
    {
      title: "Number of Staffs",
      sum: 50,
      date: "2024-01-03",
      icon: (
        <FontAwesomeIcon
          icon={faUserTie}
          className="text-2xl text-brand-base"
        />
      ),
    },
  ];

  const handleChildData = (data: string) => {
    setChildData(data);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > 50) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - 1));
    } else if (swipeDistance < -50) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4 ">
      <div
        className="xl:hidden w-full flex overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="w-full md:w-1/2 flex md:gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="min-w-full w-full">
              <CardDashboard
                title={card.title}
                sum={card.sum}
                date={card.date}
                icon={card.icon}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex
                  ? "bg-gray-medium-light"
                  : "bg-basic-white"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="hidden xl:flex w-full flex-row justify-between items-start gap-4">
        {cards.map((card, index) => (
          <CardDashboard
            key={index}
            title={card.title}
            sum={card.sum}
            date={card.date}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="w-full flex flex-col xl:flex-row xl:justify-start xl:items-start justify-center items-center gap-4">
        <div className="py-6 px-8 xl:flex flex-col bg-basic-white dark:bg-basic-black rounded-2xl gap-6 border-2 md:hidden">
          <p className="text-h8-bold text-basic-black dark:text-basic-white mb-4">
            Calender
          </p>
          <Calender onDataChange={handleChildData} />
        </div>
        <div className="w-full py-6 px-8 flex flex-col bg-basic-white dark:bg-basic-black rounded-2xl gap-6  border-2 overflow-x-auto">
          <p className="text-h8-bold text-basic-black dark:text-basic-white">
            Latest Reservation
          </p>
          <TableDashboard date={childData} />
        </div>
      </div>
    </div>
  );
}
