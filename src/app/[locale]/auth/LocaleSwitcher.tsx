"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { localeArray, LocaleKeyType, LocaleTextMap } from "@/literals/language";
import FlagComponent from "@/src/components/RightBottom/Language/FlagComponent";

const LocaleSwitcher = () => {
  const currentLocale = useLocale() as LocaleKeyType;
  const router = useRouter();
  const pathname = usePathname();
  const localeRemovedPathname = `/${pathname.split("/").slice(2).join("/")}`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FlagComponent locale={currentLocale} className="h-4 w-6" />
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {localeArray.map((l) => (
            <DropdownMenuItem
              key={l}
              className={cn(
                "flex items-center justify-between",
                currentLocale === l && "bg-muted/70",
              )}
              onClick={() => {
                router.push(`/${l}${localeRemovedPathname}`);
              }}
            >
              <div className="flex items-center gap-2">
                <FlagComponent locale={l} className="h-4 w-6" />
                {LocaleTextMap[l]}
              </div>
              {currentLocale === l && <CheckIcon className="h-5 w-5" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default LocaleSwitcher;
