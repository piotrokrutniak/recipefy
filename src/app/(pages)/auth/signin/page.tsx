"use client";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/app/components/generic/button';
import { useUser } from '@/app/utilities/contexts/user/UserContext';
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).nonempty({ message: "Password is required" }),
});

type SignInFormInputs = z.infer<typeof schema>;

const SignInPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema),
  });

  const { user, signIn } = useUser();
  const router = useRouter();

  const onSubmit = (data: SignInFormInputs) => {
    if(data.email == "superadmin@gmail.com" && data.password == "123Pa$$word!") {
      signIn(data);
      console.log(user)
    }
  };

  useEffect(() => {
    if(user?.isSignedIn) {
      router.push("/");
    }
  }, [router, user?.isSignedIn]);
  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl h-fit w-full flex flex-col space-y-4 p-16 bg-black rounded-lg shadow-sm outline-1 outline outline-slate-200/10
        mx-auto mt-20"
    >
      <NewFormInput label="email" type="email" error={errors.email?.message} register={register("email")} />
      <NewFormInput label="password" type="password" error={errors.password?.message} register={register("password")} />
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SignInPage;

const NewFormInput = ({ label, type, error, register, ...inputProps }: any) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={label}>{label}</label>
      <input {...register} type={type} id={label} className="p-2 rounded-lg bg-slate-100/10" {...inputProps} />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};