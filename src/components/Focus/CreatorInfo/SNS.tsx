import { BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaInstagram, FaArtstation, FaPaypal } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";

import { CreatorDetailsType } from "@/src/types/creators";

type CreatorInfoSNSType = {
  creatorsObj: CreatorDetailsType;
};

const CreatorInfoSNS = ({ creatorsObj }: CreatorInfoSNSType) => {
  return (
    <>
      <div className="mt-2 flex flex-col flex-wrap justify-between">
        <div className="justify-left flex gap-2 text-3xl sm:gap-4">
          {creatorsObj.twitter && (
            <div className="text-blue-500 dark:text-blue-300">
              <a href={creatorsObj.twitter}>
                <RiTwitterXFill />
              </a>
            </div>
          )}
          {creatorsObj.github && (
            <div className="text-black dark:text-white">
              <a href={creatorsObj.github}>
                <BsGithub />
              </a>
            </div>
          )}
          {creatorsObj.linkedIn && (
            <div className="text-blue-700 dark:text-blue-500">
              <a href={creatorsObj.linkedIn}>
                <BsLinkedin />
              </a>
            </div>
          )}
          {creatorsObj.youtube && (
            <div className="text-red-600 dark:text-red-400">
              <a href={creatorsObj.youtube}>
                <BsYoutube />
              </a>
            </div>
          )}
          {creatorsObj.instagram && (
            <div className="text-pink-600 dark:text-pink-400">
              <a href={creatorsObj.instagram}>
                <FaInstagram />
              </a>
            </div>
          )}
          {creatorsObj.artStation && (
            <div className="text-blue-600 dark:text-blue-300">
              <a href={creatorsObj.artStation}>
                <FaArtstation />
              </a>
            </div>
          )}
          {creatorsObj.website && (
            <div className="text-black dark:text-white">
              <a href={creatorsObj.website}>
                <TbWorld />
              </a>
            </div>
          )}
          {creatorsObj.paypal && (
            <div className="text-blue-600 dark:text-blue-300">
              <a href={creatorsObj.paypal}>
                <FaPaypal />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatorInfoSNS;
