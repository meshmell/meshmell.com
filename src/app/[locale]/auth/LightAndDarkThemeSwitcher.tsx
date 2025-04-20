"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const LightAndDarkThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:absolute dark:opacity-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] opacity-0 transition-all dark:static dark:opacity-100" />
      </Button>
    </>
  );
};

export default LightAndDarkThemeSwitcher;
