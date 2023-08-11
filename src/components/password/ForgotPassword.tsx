"use client";
import Image from "next/image";
import loginLogo from "/public/images/login.svg";
import { useForm } from "react-hook-form";
import useFindPassword from "@/hooks/reactQuery/login/useFindPassword";
import { Text } from "sfac-designkit-react";
import { Toast } from "sfac-designkit-react";

interface FormValue {
  email: string;
}

export default function FindPassword() {
  const { resetPasswordMutation, toastProps } = useFindPassword();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValue>();
  const emailValue = watch("email");
  return (
    <form
      onSubmit={handleSubmit((data: FormValue) => {
        resetPasswordMutation.mutate({ email: data.email });
      })}
    >
      <div className="h-screen flex flex-col justify-center items-center gap-y-6">
        <Image src={loginLogo} alt="logo" priority={true} className="mb-8" />
        <div className="relative w-[422px]">
          {emailValue ? (
            <label
              htmlFor="email"
              className="text-primary-80 absolute left-4 bottom-12 font-semibold text-sm transition-all transform ease-out duration-300 opacity-100 translate-y-0"
            >
              이메일
            </label>
          ) : (
            <label
              htmlFor="email"
              className="text-primary-80 absolute left-4 bottom-12 font-semibold text-sm transition-all transform ease-out duration-300 opacity-0 translate-y-1"
            >
              이메일
            </label>
          )}
          <input
            id="email"
            type="text"
            placeholder="이메일 주소"
            {...register("email", {
              required: "이메일 주소를 입력해주세요.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            className={`
          w-full h-12 px-[15px] py-[15px] rounded-[10px] bg-grayscale-5
          ${errors.email ? "border-primary-100 border-2" : "border-white"}
          `}
          />
          {errors.email && (
            <p className="text-rose-500 absolute left-4 top-12 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-[422px] flex flex-col gap-[30px]">
          <button className="h-[50px] px-[20px] py-[15px] rounded-[10px] bg-primary-80 text-white hover:opacity-60">
            비밀번호 초기화 요청하기
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Text size="sm" weight="medium">
            요청하고{" "}
            <Text size="sm" weight="bold" className="text-color-Grayscale-80">
              최대 1시간
            </Text>
            이 걸릴 수 있습니다.
          </Text>
          <Text size="sm" weight="medium">
            혹은 요청 후에 담당 매니저에게 연락을 해주세요.
          </Text>
        </div>
      </div>
      {toastProps && (
        <div className="absolute top-[10%] right-[10%]">
          <Toast {...toastProps} />
        </div>
      )}
    </form>
  );
}
