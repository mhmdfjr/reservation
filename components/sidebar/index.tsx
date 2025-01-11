/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUser,
  faAddressBook,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { JSX } from "react";
import Button from "@/components/button";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import clsx from "clsx";

interface Menu {
  title: string;
  dropdown: boolean;
  icon: JSX.Element;
  path: string;
  children: string[];
}

const mainMenu: Menu[] = [
  {
    title: "Dashboard",
    dropdown: false,
    icon: <FontAwesomeIcon icon={faChartBar} style={{ fontSize: "24px" }} />,
    path: "/dashboard",
    children: [],
  },
  {
    title: "Reservation",
    dropdown: false,
    icon: <FontAwesomeIcon icon={faAddressBook} style={{ fontSize: "24px" }} />,
    path: "/reservation",
    children: [],
  },
  {
    title: "Visitor",
    dropdown: false,
    icon: <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px" }} />,
    path: "/visitor",
    children: [],
  },
  {
    title: "Report",
    dropdown: false,
    icon: <FontAwesomeIcon icon={faFileLines} style={{ fontSize: "24px" }} />,
    path: "/report",
    children: [],
  },
];

export default function Sidebar(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenu = (menu: Menu) => {
    router.push(menu.path);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <div
      className={clsx(
        "w-60 bg-basic-white dark:bg-basic-black h-screen lg:h-full lg:fixed scrollbar-hide overflow-y-auto min-h-screen lg:flex flex-col justify-start gap-12 px-4 py-4 z-50",
        {
          hidden: props.display === "hidden",
          absolute: props.display === "show",
        }
      )}
    >
      <div className="logo w-full flex justify-center items-center cursor-pointer">
        <p className="text-h6-bold text-brand-base">STAY.</p>
      </div>
      <div className="main-menu mb-8">
        <ul className="flex flex-col gap-4 text-body">
          <li className="flex justify-start items-center px-4">
            <p className="text-body-sm text-gray-medium dark:text-gray-medium-light cursor-default">
              Main Menu
            </p>
          </li>
          {mainMenu.map((menu, index) => (
            <li key={index} className="flex flex-col">
              <Button
                variant={pathname.includes(menu.path) ? "primary" : "tertiary"}
                leftIcon={menu.icon}
                rightIcon={null}
                label={menu.title}
                onClick={() => handleMenu(menu)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="logout">
        <ul className="flex flex-col gap-4 text-body text-basic-black dark:text-basic-white">
          <Button
            variant="tertiary-danger"
            leftIcon={
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                style={{ fontSize: "24px" }}
              />
            }
            label="Keluar"
            onClick={handleLogout}
          />
        </ul>
      </div>
    </div>
  );
}
