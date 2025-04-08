/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
import { getUserData } from "@/utils/storage";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

interface PasswordFieldProps {
  fieldName: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const generateStars = (count: number) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
  }));
};

export default function ChangePasswordPage() {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordForm>();

  const [stars, setStars] = useState<{ top: string; left: string; animationDelay: string }[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    setStars(generateStars(50)); // Only generate random values on the client
  }, []);

  const onSubmit = async (data: ChangePasswordForm) => {
    setLoading(true);

    const storedUser = getUserData();

    if (!storedUser) {
      toast.error("User not found. Please login again.");
      return;
    }

    const { phoneNumber } = storedUser;

    const payload = {
      phoneNumber,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      const response: any = await fetchPost(Endpoint.CHANGE_PASSWORD, payload);

      if (response.statusCode === "00") {
        toast.success("Password changed successfully");
        router.replace("/login");
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
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
          <Link href="/dashboard-overview">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
              <Icons.diamond className="w-6 h-6 text-gray-900" />
            </div>
          </Link>

          <Link href="/" className="flex flex-col items-center z-40 font-semibold text-2xl">
            <span className="text-zinc-200">Change Password to</span>
            <div>
              <span className="font-medium bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">April</span>
              <span className="italic">Wind</span>
            </div>
            {/* <p className="mt-2 text-zinc-600 text-sm">Sign in to manage your fashion business efficiently.</p> */}
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            {/* Old Password */}
            <PasswordField
              fieldName="oldPassword"
              label="Old Password"
              register={register}
              errors={errors}
              placeholder="Enter Old Password"
              passwordVisible={showOldPassword}
              togglePasswordVisibility={() => setShowOldPassword(prev => !prev)}
            />

            <PasswordField
              fieldName="newPassword"
              label="New Password"
              register={register}
              errors={errors}
              placeholder="Enter New Password"
              passwordVisible={showNewPassword}
              togglePasswordVisibility={() => setShowNewPassword(prev => !prev)}
            />

            <Button className="w-full bg-zinc-200 text-gray-900 hover:bg-zinc-200" type="submit" disabled={loading}>
              {loading ? "Change Password..." : "Change Password"}
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

function PasswordField({ register, errors, placeholder, passwordVisible, togglePasswordVisibility }: PasswordFieldProps) {
  return (
    <div className="relative">
      <Label htmlFor="password" className="block text-xs font-medium text-zinc-600">Password</Label>
      <div className="relative">
        <Input
          id="password"
          type={passwordVisible ? "text" : "password"}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Password must have at least 4 characters'
            }
          })}
          placeholder={placeholder || "Enter password"}
          className="placeholder:text-[#626466] border border-zinc-600 shadow-xs pr-10 text-white"
        />
        <div
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
        >
          {passwordVisible ? (
            <EyeOffIcon className="h-5 w-5 text-[#626466]" />
          ) : (
            <EyeIcon className="h-5 w-5 text-[#626466]" />
          )}
        </div>
      </div>
      {errors.password && <p className="text-red-500 text-xs italic">{String(errors.password.message)}</p>}
    </div>
  );
}