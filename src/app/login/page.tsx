"use client";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useContext } from "react";
import { context } from "@/context/context";
import { Button, Input } from "@/components";
import Link from "next/link";
import { LoginResponseDto } from "@/dtos/LoginResponse.dto";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { setJwt, setUserId, setUsername } = useContext(context);
  const { register, handleSubmit, reset } = useForm<{
    username: string;
    password: string;
  }>();

  const loginUser = handleSubmit(async (data) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH + "api/v1/auth/authenticate", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData: Partial<LoginResponseDto> = await response.json();

      if (responseData?.user && responseData?.token) {
        setUsername(responseData.user.username);
        setUserId(responseData.user.id);
        setJwt(responseData.token);
        reset();
        router.push("/messages");
      }
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <main className={styles.container}>
      <form onSubmit={loginUser} className={styles.form}>
        <Input type="text" placeholder="username" {...register("username")} />
        <Input type="password" placeholder="password" {...register("password")} />
        <Button type="submit">submit</Button>
      </form>
    </main>
  );
}
