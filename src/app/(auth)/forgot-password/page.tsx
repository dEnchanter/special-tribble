/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { FieldErrors, UseFormRegister, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { fetchPost } from "@/services/fetcher";
import { Endpoint } from "@/services/api";
import { toast } from 'sonner';
import { saveAccessToken, saveUserData, saveUserRoleDetail } from "@/utils/storage";

interface FormData {
  username: string;
}

interface EmailFieldProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}

const generateStars = (count: number) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
  }));
};

export default function ForgotPasswordPage() {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [stars, setStars] = useState<{ top: string; left: string; animationDelay: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStars(generateStars(50)); // Only generate random values on the client
  }, []);

  async function login(data: FormData) {
    return fetchPost(Endpoint.LOGIN, data);
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const loginResponse: any = await login(data);

      if (loginResponse.statusCode === '00' && loginResponse.data.token) {

        saveAccessToken(loginResponse.data.token);
        saveUserData({ data: loginResponse.data });
        saveUserRoleDetail(loginResponse.data.role);

        toast.success(loginResponse?.message);

        router.push('/sign-in');

      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-brand-25 via-gray-900 to-brand-25 flex items-center justify-center overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-[400px] p-8 bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
            <Icons.diamond className="w-6 h-6 text-gray-900" />
          </div>

          <Link href="/" className="flex flex-col items-center z-40 font-semibold text-2xl">
            <span className="text-zinc-200">Forgot Password to</span>
            <div>
              <span className="font-medium bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">April</span>
              <span className="italic">Wind</span>
            </div>
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <EmailField register={register} errors={errors} />
            <Button className="w-full bg-zinc-200 text-gray-900 hover:bg-zinc-200" type="submit" disabled={loading}>
              {loading ? "Forgot Password..." : "Forgot Password"}
            </Button>
          </form>

          <p className="text-sm text-gray-400">
            Need access? Contact your administrator.
          </p>
        </div>
      </Card>
    </div>
  )
}

function EmailField({ register, errors }: EmailFieldProps) {
  return (
    <div>
      <Label htmlFor="username" className="block text-xs font-medium text-zinc-600">Email</Label>
      <Input
        id="username"
        type="email"
        autoComplete="off"
        {...register('username', {
          required: 'Username is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email format'
          }
        })}
        placeholder="Enter email address"
        className="placeholder:text-[#626466] border border-zinc-600 shadow-xs text-white"
      />
      {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message?.toString()}</p>}
    </div>
  );
}