"use client";

import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { update } from "@/redux/userSlice";
import { useAppDispatch } from "@/redux/store";
import { useLoginMutation } from "@/hooks/reactQuery/login/useLoginQuery";
import LoadingSpinner from "@/components/Loading/Loading";

interface FormValue {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValue>();
  const dispatch = useAppDispatch();
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const { mutate, isLoading } = useLoginMutation();

  if (isLoading) return <LoadingSpinner />;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(data => {
        mutate(data, {
          onSuccess: uid => {
            dispatch(update(uid));
          },
          onError: () => {
            alert("로그인 실패했습니다. 다시 로그인 해주세요");
          },
        });
      })}
      className="w-[422px] flex flex-col gap-[30px]"
    >
      <div className="relative mb-2">
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
          type="email"
          placeholder="이메일 주소"
          {...register("email", {
            required: "이메일 주소를 입력해주세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
          className={`w-full h-12 px-[15px] py-[15px] rounded-[10px] bg-grayscale-5
            border-2
            focus:outline-none 
            ${errors.email ? "border-red" : "border-white"}
            ${errors.email ? "focus:border-red" : "focus:border-primary-80"}`}
        />
        {errors.email && (
          <p className="text-grayscale-40 absolute left-4 top-12 text-xs">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="relative mb-2">
        {passwordValue ? (
          <label
            htmlFor="password"
            className="text-primary-80 absolute left-4 bottom-12 font-semibold text-sm transition-all transform ease-out duration-300 opacity-100 translate-y-0"
          >
            비밀번호
          </label>
        ) : (
          <label
            htmlFor="password"
            className="text-primary-80 absolute left-4 bottom-12 font-semibold text-sm transition-all transform ease-out duration-300 opacity-0 translate-y-1"
          >
            비밀번호
          </label>
        )}
        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          className={`
          w-full h-12 px-[15px] py-[15px] rounded-[10px] bg-grayscale-5
          border-2
          focus:outline-none 
          ${errors.password ? "border-red" : "border-white"}
          ${errors.password ? "focus:border-red" : "focus:border-primary-80"}
          }}
          `}
        />
        {errors.password && (
          <p className="text-grayscale-40 absolute left-4 top-12 text-xs">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex justify-between mx-[15px]">
        <p className="text-grayscale-60">비밀번호를 잊어버리셨나요?</p>
        <Link href="/forgotPassword/" className="text-primary-100">
          비밀번호 찾기
        </Link>
      </div>
      <Button
        text="로그인"
        disabled={isSubmitting}
        isError={errors.email || errors.password ? true : false}
      />
    </form>
  );
}
