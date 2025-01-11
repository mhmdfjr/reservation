/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Table from ".";
import clsx from "clsx";
import { useState, useEffect } from "react";
import Button from "../button";
import Cookies from "js-cookie";
import reservations from "@/app/data/reservasions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleRight,
  faCircleLeft,
} from "@fortawesome/free-regular-svg-icons";

interface TableDashboardProps {
  date?: string;
}
const TableDashboard: React.FC<TableDashboardProps> = ({ date }) => {
  const tableHeaders = ["ID", "Name", "Type", "Room", "Start", "End", "Status"];

  const token = Cookies.get("token");

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [date]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReservation = reservations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full">
      <Table tableHead={tableHeaders}>
        {paginatedReservation.map((reservation, index: number) => {
          return (
            <tr
              key={index}
              className={clsx(
                "bg-basic-white dark:bg-basic-black cursor-pointer",
                {
                  "bg-brand-10 dark:bg-brand-90 bg-opacity-15": index % 2 != 0,
                }
              )}
            >
              <td className="px-4 py-4 text-center text-basic-black dark:text-basic-white">
                {reservation.id}
              </td>
              <td className="px-4 py-4 text-center text-basic-black dark:text-basic-white">
                {reservation.customerName}
              </td>
              <td className="px-4 py-4 text-center text-basic-black dark:text-basic-white">
                {reservation.roomType}
              </td>
              <td className="px-4 py-4 text-center text-basic-black dark:text-basic-white">
                {reservation.roomNumber}
              </td>
              <td className="px-4 py-4 text-center text-basic-black dark:text-basic-white">
                {reservation.startDate}
              </td>
              <td className="px-4 py-4 text-center text-basic-black dark:text-basic-white">
                {reservation.endDate}
              </td>
              <td
                className={clsx("px-4 py-4 text-center font-semibold", {
                  "text-alert-success": reservation.status === "Confirmed",
                  "text-alert-warning": reservation.status === "Pending",
                  "text-alert-danger": reservation.status === "Cancelled",
                })}
              >
                {reservation.status}
              </td>
            </tr>
          );
        })}
      </Table>

      <div className="pagination-controls flex justify-center items-center gap-2 mt-4">
        <Button
          label=""
          variant={currentPage === 1 ? "disable" : "primary"}
          size="very-small"
          rightIcon={
            <FontAwesomeIcon
              icon={faCircleLeft}
              className="text-xl text-basic-white dark:text-basic-black"
            />
          }
          onClick={handlePrevPage}
        />
        <span className="text-basic-black dark:text-basic-white">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          label=""
          variant={currentPage === totalPages ? "disable" : "primary"}
          size="very-small"
          rightIcon={
            <FontAwesomeIcon
              icon={faCircleRight}
              className="text-xl text-basic-white dark:text-basic-black"
            />
          }
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default TableDashboard;
