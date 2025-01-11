"use client";
import Button from "@/components/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

export default function Report() {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex h-full justify-start items-center gap-4 p-4">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white dark:bg-basic-black rounded-2xl gap-6 border-2 overflow-y-visible ">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <p className="text-h6-bold text-brand-base">STAY.</p>
          <p className="text-body text-gray-medium dark:text-gray-medium-light">
            Fitur ini sedang dalam tahap pengembangan
          </p>
          <Button
            label="Dashboard"
            variant="primary"
            size="small"
            rightIcon={
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="text-xl text-basic-white dark:text-basic-black"
              />
            }
            onClick={() => router.push(`/dashboard`)}
          />
        </div>
      </div>
    </div>
  );
}
