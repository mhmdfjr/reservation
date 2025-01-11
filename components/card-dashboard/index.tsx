import React from "react";

interface CardDashboardProps {
  title: string;
  sum: number | string;
  date: string;
  icon: React.ReactNode;
}

const CardDashboard: React.FC<CardDashboardProps> = ({
  title,
  sum,
  date,
  icon,
}) => {
  return (
    <div className="relative w-full flex flex-col justify-center items-start gap-8 p-4 rounded-2xl bg-brand-base overflow-hidden">
      <div className="absolute top-[5px] right-[-30px] w-[120px] h-[120px] rounded-3xl transform rotate-45 bg-gradient-to-b from-basic-white/50 to to-basic-white/10"></div>
      <div className="absolute bottom-[-70px] left-[-30px] w-[120px] h-[120px] rounded-3xl transform rotate-45 bg-gradient-to-t from-basic-white/70 to to-basic-white/10"></div>

      <div className="w-full flex items-center justify-start gap-x-3 z-10">
        <div className="rounded-full flex justify-center items-center w-14 h-14 bg-basic-white dark:bg-basic-black">
          {icon}
        </div>
        <div className="text-start gap-y-3">
          <p className="text-body-sm-bold text-basic-white dark:text-basic-black">
            {title}
          </p>
          <p className="text-h5-bold text-basic-white dark:text-basic-black">
            {sum}
          </p>
        </div>
      </div>

      <div className="z-10">
        <p className="text-body-sm-regular text-basic-white dark:text-basic-black">
          Last updated on <span className="text-body-sm-bold">{date}</span>
        </p>
      </div>
    </div>
  );
};

export default CardDashboard;
