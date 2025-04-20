import { Dispatch, SetStateAction } from "react";
import { FiMenu } from "react-icons/fi";

import { ModalOpenType } from "@/src/types/modals";

import Button from "../../Button";

type FooterButtonType = {
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
};

const FooterButton = ({ setModalOpen }: FooterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      footer: !prevState.footer,
    }));
  };

  return (
    <Button handleClick={handleClick}>
      <div className="text-3xl sm:text-4xl">
        <FiMenu />
      </div>
    </Button>
  );
};

export default FooterButton;
