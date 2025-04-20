"use client";

import Link from "next/link";
import { FaHouseUser } from "react-icons/fa";

const UserPageButton = () => {
  return (
    <>
      <Link
        href="/en/aaa/aaa"
        className={
          "justify-center} relative mt-[6px] flex rounded-full sm:mt-[10px]"
        }
      >
        <div
          className={
            "flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-black bg-neutral-100 dark:border-white dark:bg-neutral-950 sm:h-14 sm:w-14 sm:border-[3px]"
          }
        >
          <FaHouseUser className={"text-3xl sm:text-4xl"} />
        </div>
      </Link>
    </>
  );
};

export default UserPageButton;
