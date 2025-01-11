/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Profil from "@/public/profil.jpg";
import Image from "next/image";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="sticky top-0 z-50 flex bg-basic-white dark:bg-basic-black justify-between items-center w-full p-4">
      <div className="flex lg:hidden justify-start items-center">
        <FontAwesomeIcon
          icon={faBarsStaggered}
          style={{ fontSize: "32px" }}
          onClick={onMenuClick}
        />
      </div>

      <div className="flex lg:flex flex-col justify-center gap-2">
        <p className="text-body-bold text-basic-black dark:text-basic-white">
          Welcome!
        </p>
        <p className="text-body-sm-regular text-gray-medium dark:text-gray-medium-light">
          STAY. Dashboard
        </p>
      </div>

      <div className="flex justify-end items-center gap-2 cursor-pointer">
        <p className="hidden lg:inline-block text-body-bold text-basic-black dark:text-basic-white">
          Admin
        </p>
        <div className="w-8 h-8 flex relative">
          <Image
            src={Profil}
            fill={true}
            objectFit="cover"
            alt="profil"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
