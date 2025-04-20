"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { LocaleKeyType } from "@/src/types/locale";

interface ModalProps {
  userId: string;
}

type FormData = {
  modelName: string;
  file: FileList;
};

const UserPage = ({ userId }: ModalProps) => {
  const locale = useLocale() as LocaleKeyType;
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  // Temporary dummy data
  const user = {
    models: [
      { model_id: "1", model_name: "Model 1" },
      { model_id: "2", model_name: "Model 2" },
    ],
  };

  useEffect(() => {
    // Reset the form or set default values if needed
    setValue("modelName", "");
  }, [setValue]);

  return (
    <div className="p-4">
      {session && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {locale === "en" ? "My page" : "マイページ"}
            </h1>
            <Link href="/api/auth/logout">
              <button className="mt-2 rounded bg-red-500 px-4 py-2 text-white">
                Logout
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              type="file"
              className="w-full border p-2"
              {...register("file")}
            />
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Model Name"
                className="w-[300px] border p-2"
                {...register("modelName", { required: true })}
              />
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add Model
              </button>
            </div>
          </form>
        </>
      )}
      <div>
        {user ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {user.models.map((model, index) => (
              <div key={index} className="cursor-pointer border p-2">
                <Link href={`/${locale}/share/${userId}/${model.model_id}`}>
                  <Image
                    src={`/images/users/${userId}/${model.model_id}/img.webp`}
                    alt={model.model_name}
                    width={100}
                    height={100}
                    className="h-32 w-full"
                    priority
                  />
                  <div className="mt-2 text-center">{model.model_name}</div>
                </Link>
              </div>
            ))}
          </div>
        ) : !user ? (
          <p className="mt-4">No models found</p>
        ) : (
          <p className="mt-4">Please login</p>
        )}
        {!session?.user && (
          <div className="mt-4">
            <Link href="/api/auth/login">
              <button className="rounded bg-green-500 px-4 py-2 text-white">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
