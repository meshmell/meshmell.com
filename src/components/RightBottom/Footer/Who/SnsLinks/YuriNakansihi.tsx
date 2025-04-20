"use client";

import Link from "next/link";
import { BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

const SnsLinksForYuri = () => {
  return (
    <>
      <div className="flex gap-2 text-xl sm:gap-4 sm:text-2xl">
        <div>
          <Link href="https://twitter.com/yurinakanishi58">
            <RiTwitterXFill />
          </Link>
        </div>
        <div>
          <Link href="https://github.com/yurinakanishi">
            <BsGithub />
          </Link>
        </div>
        <div>
          <Link href="https://www.linkedin.com/in/yurinakanishi">
            <BsLinkedin />
          </Link>
        </div>
        <div>
          <Link href="https://www.youtube.com/@user-st8gh7iu3s">
            <BsYoutube />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SnsLinksForYuri;
