import { localeArray } from "@/literals/language";
import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";

import { ModelDetailsType } from "@/src/types/models";

export const getFilteredModels = (
  models: ModelDetailsType[],
  filteredCategoriesObj: CategoryDetailsType,
  filteredCreatorsObj: CreatorDetailsType,
  searchWord: string,
): ModelDetailsType[] => {
  const filteredModels = models.filter((model) => {
    const modelType = {
      name: model.name,
      description: model.name,
      creator: model.creator,
      published: model.published,
      updated: model.updated,
      categoryTags: model.categoryTags,
      slug: model.slug,
    };

    try {
      const matchesCategory =
        filteredCategoriesObj.slug === "all" ||
        modelType.categoryTags.includes(filteredCategoriesObj.slug);
      const matchesCreator =
        filteredCreatorsObj.slug === "" ||
        modelType.creator === filteredCreatorsObj.slug;
      const lowerCaseSearchWord = searchWord.toLowerCase();
      const matchesSearch1 =
        lowerCaseSearchWord === "" ||
        modelType.categoryTags.some((tag) =>
          tag.toLowerCase().includes(lowerCaseSearchWord),
        ) ||
        modelType.slug.toLowerCase().includes(lowerCaseSearchWord);

      const matchesSearch2 = localeArray.some((locale) => {
        const name = modelType.name[locale] || "";
        const description = modelType.description[locale] || "";

        return (
          name.toLowerCase().includes(lowerCaseSearchWord) ||
          description.toLowerCase().includes(lowerCaseSearchWord)
        );
      });

      return (
        matchesCategory && matchesCreator && matchesSearch1 && matchesSearch2
      );
    } catch (error) {
      console.error("Error filtering models:", error);

      return false;
    }
  });

  return filteredModels;
};
