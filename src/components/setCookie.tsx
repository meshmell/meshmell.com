"use server";
import { cookies } from "next/headers";

export async function setCookie(settingName: string, settingValue: string) {
  cookies().set(settingName, settingValue);
}
