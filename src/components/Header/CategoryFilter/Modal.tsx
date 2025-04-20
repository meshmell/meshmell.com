import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction, useState } from "react";

import ModalWrapper from "@/src/components/ModalWrapper";
import { CategoryDetailsType } from "@/src/types/categories";
import { LocaleKeyType } from "@/src/types/locale";
import { ModalOpenType } from "@/src/types/modals";
import { defaultCategoryDetails } from "@/src/utils/defaultData/categories";

type CategoryFilterModalType = {
  locale: LocaleKeyType;
  modalOpen: ModalOpenType;
  setModalOpen: Dispatch<SetStateAction<ModalOpenType>>;
  categoryFiltersSlug: string;
  setHoverOnModal: Dispatch<SetStateAction<boolean>>;
  categories: CategoryDetailsType[];
};

const CategoryFilterModal = ({
  locale,
  setModalOpen,
  categoryFiltersSlug,
  setHoverOnModal,
  modalOpen,
  categories,
}: CategoryFilterModalType) => {
  const t = useTranslations("main");

  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const filteredCategories = categories.filter((category) => {
    if (category.slug === "") return false;

    if (searchTerm === "") return true;

    return languagesList.some(
      (language) =>
        category.name[language] &&
        category.name[language]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  });

  const categoryFiltersSlugData =
    categories.find(
      (category: CategoryDetailsType) => category.slug === categoryFiltersSlug,
    ) || defaultCategoryDetails;

  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (paramValue: string) => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      categoryFilter: false,
    }));
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("category", paramValue);
    newParams.set("focusedMode", "off");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleClickClose = () => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      categoryFilter: false,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  const allButton = (
    <div
      className={"select-none rounded-md"}
      onClick={() => handleClick("all")}
    >
      <div className="flex">
        <div
          className={`flex rounded-md px-2 py-1 ${categoryFiltersSlug === "all" ? "bg-emerald-500 text-white dark:text-black" : "border-2 hover:text-blue-700 dark:hover:text-blue-300"}`}
        >
          <div className="text-3xl">
            {
              categories.find(
                (category: CategoryDetailsType) => category.slug === "all",
              )?.icon
            }
          </div>
          <div className="mt-[6px] text-xl">
            {t("categoryFilter.searchAll")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        isVisible={modalOpen.categoryFilter}
        handleClose={handleClickClose}
        leftRight="right"
        widthWhenLargeDevice="384"
        heightWhenSmallDevice="700"
        title={t("categoryFilter.filterByCategory")}
      >
        {allButton}
        <div className="mt-2 flex items-center gap-2 sm:mt-4">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder={t("categoryFilter.searchCategories")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[150px] rounded border border-gray-300 p-2 sm:w-auto"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="rounded bg-blue-500 px-2 py-1 text-white"
          >
            {t("categoryFilter.clear")}
          </button>
        </div>
        <div className="mt-4 grid max-h-[60%] grid-cols-2 gap-2 overflow-y-auto sm:gap-6">
          {filteredCategories.map(({ slug, color, name, icon }) => (
            <div
              key={slug}
              className={`select-none rounded-md px-2 py-1 ${categoryFiltersSlugData.slug === slug ? `${color} bg-emerald-500 text-white dark:text-black` : "hover:text-blue-700 dark:hover:text-blue-300"}`}
              onClick={() => handleClick(slug)}
            >
              {name[locale as LocaleKeyType]}
              <div className="text-3xl">{icon}</div>
            </div>
          ))}
        </div>
      </ModalWrapper>
    </>
  );
};

export default CategoryFilterModal;
