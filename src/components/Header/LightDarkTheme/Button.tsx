"use client";

import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import Button from "../../Button";

const LightDarkThemeSwitchButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const handleClick = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <>
      <Button handleClick={handleClick}>
        {isLight ? (
          <MdLightMode className={"text-3xl text-amber-500 sm:text-4xl"} />
        ) : (
          <MdDarkMode className={"text-3xl text-blue-600 sm:text-4xl"} />
        )}
      </Button>
    </>
  );
};

export default LightDarkThemeSwitchButton;
