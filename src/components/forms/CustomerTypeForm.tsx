/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/CustomerTypeForm.tsx
"use client"

import { Button, CustomButton } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Form, FormControl, FormField } from "../ui/form";
import { Endpoint } from "@/services/api";
import { fetchPost, fetchPatch } from "@/services/fetcher";
import { toast } from "sonner";
import { z } from "zod";
import { CustomerTypeFormData, customerTypeSchema } from "@/schemas/customerTypeSchema";
import { cn } from "@/lib/utils";

const CustomerTypeForm = ({ className, closeDialog, initialValues }: { className?: string, closeDialog: () => void, initialValues?: Partial<CustomerType> }) => {
  const form = useForm<z.infer<typeof customerTypeSchema>>({
    resolver: zodResolver(customerTypeSchema),
    defaultValues: {
      type: initialValues?.type || "", // Pre-populate with initial values if available
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<CustomerTypeFormData> = async (data) => {
    setIsLoadingSubmit(true);

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_CUSTOMER_TYPE}/${initialValues.id}`, data);
        toast.success(responseData?.message || "Customer Type updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_CUSTOMER_TYPE, data);
        toast.success(responseData?.message || "Customer Type created successfully!");
      }
      closeDialog();
    } catch (error: any) {
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Customer Type</div>
      <Form {...form}>
        <form 
          className={cn("space-y-6", className)} 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <div>
                <Label>Customer Type</Label>
                <FormControl>
                  <Input placeholder="Customer Type" {...field} />
                </FormControl>
              </div>
            )}
          />
        
          <div className="flex items-center justify-end space-x-2">
            <Button type="button" size="lg" variant="outline" onClick={closeDialog}>Cancel</Button>
            <CustomButton
              type="submit"
              size="lg"
              className=" bg-[#0F3F5F] hover:bg-[#0F3F5F]"
              isLoading={isLoadingSubmit}
            >
               {initialValues?.id ? "Update Customer Type" : "Create Customer Type"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CustomerTypeForm;
