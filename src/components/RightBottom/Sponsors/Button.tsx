"use client";

import { Dispatch, SetStateAction } from "react";
import { FaPeopleGroup } from "react-icons/fa6";

import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type SponsorsButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const SponsorButton = ({ setModalOpen }: SponsorsButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      sponsors: !prevState.sponsors,
    }));
  };

  return (
    <Button handleClick={handleClick}>
      <div className="flex flex-col justify-center p-1">
        <FaPeopleGroup className="mx-auto text-3xl sm:text-4xl" />
      </div>
    </Button>
  );
};

export default SponsorButton;
