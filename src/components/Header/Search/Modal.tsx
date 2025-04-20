"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

import ModalWrapper from "@/src/components/ModalWrapper";
import { useTranslations } from "next-intl";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";

type SearchModalType = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
};

const SearchModal = ({
  locale,
  setModalOpen,
  searchWord,
  setSearchWord,
  modalOpen,
}: SearchModalType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("main");
  const newParams = new URLSearchParams(searchParams.toString());
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };
  const pathname = usePathname();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchWord) {
      newParams.set("searchWord", searchWord);
      newParams.set("focusedMode", "off");
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      router.push(
        `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
      );
    }
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: false,
    }));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();

    if (searchWord !== "") {
      setSearchWord("");
      setModalOpen((prevState: ModalOpenType) => ({
        ...prevState,
        search: false,
      }));
      router.push(
        `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ""}`,
      );
    }
  };

  return (
    <ModalWrapper
      isVisible={modalOpen.search}
      handleClose={handleClickClose}
      leftRight="right"
      widthWhenLargeDevice="384"
      heightWhenSmallDevice="700"
    >
      <form onSubmit={handleSubmit} className="mb-12 mt-8">
        <div className="flex w-full">
          <div className="h-10">
            <input
              name="searchValue"
              className="h-[40px] w-36 rounded-l-lg border border-solid border-black p-2 text-xl focus:border-2 focus:border-blue-500 focus:outline-none dark:border-white md:w-56 lg:w-56 xl:w-72"
              placeholder={`${t("search.search")}...`}
              value={searchWord}
              onChange={handleInputChange}
            />
          </div>
          <button
            aria-label="Search"
            type="submit"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-r-lg border-y border-r border-black bg-neutral-100 p-0 text-black dark:border-white dark:bg-neutral-950 dark:text-white"
          >
            <FaSearch size="2rem" />
          </button>
        </div>
        <div className="flex justify-start">
          <button
            onClick={handleReset}
            className="mt-4 rounded bg-red-500 p-2 text-white"
          >
            {t("search.reset")}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default SearchModal;
