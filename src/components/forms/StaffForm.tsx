/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button, CustomButton } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Endpoint } from "@/services/api";
import { fetchPost } from "@/services/fetcher";
import { toast } from "sonner";
import { z } from "zod";
import { StaffFormData, staffSchema } from "@/schemas/staffSchema";
import { useRoles } from "@/hooks/useRole";
import { DatePicker } from "../ui/date-picker";
import ImageUpload from "../ui/image-upload-comp";

interface StaffFormProps extends React.ComponentProps<"form"> {
  closeDialog: () => void;
  initialValues?: Partial<Staff>; // Assuming you have the Staff type defined
}

const StaffForm = ({ className, closeDialog, initialValues }: StaffFormProps) => {

  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),  // assuming you have a schema for validation
    defaultValues: {
      staffName: initialValues?.staffName || "",
      dob: initialValues?.dob || "",
      picture: initialValues?.picture || "",
      address: initialValues?.address || "",
      lga: initialValues?.lga || "",
      stateOfOrigin: initialValues?.stateOfOrigin || "",
      country: initialValues?.country || "",
      email: initialValues?.email || "",
      phoneNumber: initialValues?.phoneNumber || "",
    },
  });

  const { data: role, isLoading: roleIsLoading, error: roleError } = useRoles();
  // const [selectedRole, setSelectedRole] = useState<string | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<StaffFormData> = async (data) => {
    setIsLoading(true);

    const processedData = {
      ...data,
      staffName: data.staffName || initialValues?.staffName,
      dob: data.dob || initialValues?.dob,
      picture: data.picture || initialValues?.picture,
      address: data.address || initialValues?.address,
      lga: data.lga || initialValues?.lga,
      stateOfOrigin: data.stateOfOrigin || initialValues?.stateOfOrigin,
      country: data.country || initialValues?.country,
      email: data.email || initialValues?.email,
      phoneNumber: data.phoneNumber || initialValues?.phoneNumber,
    };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPost(
          `${Endpoint.UPDATE_USERS}/${initialValues.id}`, 
          processedData
        );
        toast.success(responseData?.message || "Staff updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.SIGNUP, processedData);
        toast.success(responseData?.message || "Staff created successfully!");
      }
      closeDialog();
    } catch (error: any) {
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Staff</div>
      <Form {...form}>
        <form 
          className={cn("space-y-6", className)} // Added space between sections
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="text-md font-semibold italic sm:col-span-2">Personal Information</div>

            <FormField
              control={form.control}
              name="staffName"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Staff Name</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Date of Birth</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <DatePicker 
                      onChange={(selectedDate: Date) => field.onChange(selectedDate)} 
                      value={field.value ? new Date(field.value) : undefined} 
                    />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="picture"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Picture</Label>
                  <FormControl className={field.value ? "font-medium" : "border-gray-300"}>
                    <ImageUpload
                      value={field.value}
                      onChange={(image) => field.onChange(image)} // Handle image change
                    />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
          </div>

          {/* Address Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="text-md font-semibold sm:col-span-2 italic">Address Information</div>

            <FormField
              control={form.control}
              name="address"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Address</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="123 Street Name" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="lga"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Local Government Area</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="LGA" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="stateOfOrigin"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">State of Origin</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Country</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
          </div>

          {/* Contact Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="text-md font-semibold sm:col-span-2 italic">Contact Information</div>

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Email</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="xyz@gmail.com" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Phone Number</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="08012345678" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
          </div>

          {/* Role Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="text-md font-semibold sm:col-span-2 italic">Role Information</div>

            <FormField
              control={form.control}
              name="roleId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Role</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleIsLoading ? (
                          <SelectItem disabled value="nil">Loading...</SelectItem>
                        ) : roleError ? (
                          <SelectItem disabled value="nil">Error loading roles</SelectItem>
                        ) : (
                          role?.map(role => (
                            <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Button type="button" size="lg" variant="outline" onClick={closeDialog}>Cancel</Button>
            <CustomButton
              type="submit"
              size="lg"
              className=" bg-[#0F3F5F] hover:bg-[#0F3F5F]"
              isLoading={isLoading}
            >
               {initialValues?.id ? "Update Staff" : "Create Staff"}	
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
}

export default StaffForm;
