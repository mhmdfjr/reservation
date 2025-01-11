/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons/faCircleUser";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Profil from "@/public/profil.jpg";
import Image from "next/image";
import Button from "../button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [roleCookies, setRoleCookies] = useState<string | null>(null);
  const [usernameCookies, setUsernameCookies] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch cookies after component mounts
    setRoleCookies(Cookies.get("role") || null);
    setUsernameCookies(Cookies.get("username") || null);
  }, []);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  const handleEditProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="sticky top-0 z-50 flex bg-basic-white dark:bg-basic-black justify-between items-center w-full p-4">
      <div className="flex lg:hidden justify-start items-center">
        <FontAwesomeIcon
          icon={faBarsStaggered}
          style={{ fontSize: "32px" }}
          onClick={onMenuClick}
          className="text-basic-black dark:text-basic-white"
        />
      </div>

      <div className="flex lg:flex flex-col justify-center items-center lg:items-start gap-2">
        <p className="text-body-bold text-basic-black dark:text-basic-white">
          Welcome!
        </p>
        <p className="text-body-sm-regular text-gray-medium dark:text-gray-medium-light">
          STAY. Dashboard
        </p>
      </div>

      <div
        className="flex justify-end items-center gap-2 cursor-pointer"
        onClick={handleModal}
      >
        <div className="flex flex-col justify-center items-end">
          {roleCookies && (
            <div className="hidden lg:inline-block text-sm font-bold text-basic-black dark:text-basic-white">
              <p>{roleCookies}</p>
            </div>
          )}
          {usernameCookies && (
            <div className="hidden lg:inline-block text-sm text-basic-black dark:text-basic-white">
              <p>{usernameCookies}</p>
            </div>
          )}
        </div>
        <div className="w-8 h-8 flex relative">
          <Image
            src={Profil}
            fill={true}
            sizes="(max-width: 24px)"
            objectFit="cover"
            alt="profil"
            className="rounded-full"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute top-16 right-4 bg-basic-white dark:bg-basic-black border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="flex flex-col gap-2 p-2">
            <Button
              variant="tertiary"
              size="small"
              leftIcon={
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: "20px" }}
                />
              }
              label="Profile"
              onClick={handleEditProfile}
            />
            <Button
              variant="tertiary-danger"
              size="small"
              leftIcon={
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ fontSize: "20px" }}
                />
              }
              label="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
}
