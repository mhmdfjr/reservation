"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TableReservation from "@/components/table/tableReservation";
// import fs from "fs";
// import path from "path";

// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), "data", "reservations.json");
//   const fileContent = fs.readFileSync(filePath, "utf8");
//   const reservations = JSON.parse(fileContent);

//   return { props: { initialReservations: reservations } };
// }

const Reservation = () => {
  const token = Cookies.get("token");
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [roomType, setRoomType] = useState<string>();
  const [roomNumber, setRoomNumber] = useState<number>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white dark:bg-basic-black rounded-2xl gap-6 border-2 overflow-y-visible scrollbar-none">
        <div className="flex flex-col lg:flex-row justify-start items-center gap-4 lg:gap-16">
          <div className="flex flex-col justify-start items-center gap-4 w-full">
            <Input
              label="Reservation ID"
              name="id"
              type="text"
              value={id ? id.toString() : ""}
              onChange={(e) => setId(Number(e.target.value))}
            />
            <Input
              label="Name"
              name="name"
              type="text"
              value={name ? name : ""}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Room Type"
              type="select"
              onChange={(e) => setRoomType(e.target.value)}
              placeholder={roomType ? roomType : "Pilih"}
              name="type"
              value={roomType ? roomType : ""}
              options={["Standard", "Suite", "Deluxe"]}
            />
          </div>

          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Room Number"
              name="number"
              type="number"
              value={roomNumber ? roomNumber.toString() : ""}
              onChange={(e) => setRoomNumber(Number(e.target.value))}
            />
            <DatePicker
              title="Start Date"
              name="start"
              value={startDate}
              onDateChange={handleStartDateChange}
            />
            <DatePicker
              title="End Date"
              name="end"
              value={endDate}
              onDateChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Cancel"
            variant="secondary"
            size="small"
            onClick={() => {}}
          />
          <Button
            label="Print"
            variant="secondary"
            size="small"
            onClick={() => {}}
          />
          <Button
            label="Save"
            variant="primary"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white dark:bg-basic-black rounded-2xl gap-6 overflow-x-auto border-2">
        <TableReservation />
      </div>
    </div>
  );
};

export default Reservation;
