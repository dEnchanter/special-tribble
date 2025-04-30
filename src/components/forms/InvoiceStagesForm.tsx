/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/InvoiceStagesForm.tsx
"use client"

import { Button, CustomButton } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { Endpoint } from "@/services/api";
import { fetchPost, fetchPatch } from "@/services/fetcher";
import { toast } from "sonner";
import { z } from "zod";
import { InvoiceStagesFormData, invoiceStagesSchema } from "@/schemas/invoiceStageSchema";

const InvoiceStagesForm = ({ closeDialog, initialValues }: { closeDialog: () => void, initialValues?: Partial<InvoiceStages> }) => {
  const form = useForm<z.infer<typeof invoiceStagesSchema>>({
    resolver: zodResolver(invoiceStagesSchema),
    defaultValues: {
      state: initialValues?.state || "",
      stageDate: initialValues?.stageDate || "",
      invoiceId: initialValues?.invoiceId || 0,
      staffId: initialValues?.staffId || 0,
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<InvoiceStagesFormData> = async (data) => {
    setIsLoadingSubmit(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_INVOICE_STAGES}/${initialValues.id}`, processedData);
        toast.success(responseData?.message || "Invoice Stage updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_INVOICE_STAGES, processedData);
        toast.success(responseData?.message || "Invoice Stage created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Invoice Stage</div>
      <Form {...form}>
        <form 
          className="space-y-6" 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Invoice Stage Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">State</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="stageDate"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Stage Date</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="date" placeholder="Stage Date" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Invoice ID</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Invoice ID" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="staffId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Staff ID</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Staff ID" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-2">
            <Button type="button" size="lg" variant="outline" onClick={closeDialog}>Cancel</Button>
            <CustomButton
              type="submit"
              size="lg"
              className=" bg-[#0F3F5F] hover:bg-[#0F3F5F]"
              isLoading={isLoadingSubmit}
            >
              {initialValues?.id ? "Update Invoice Stage" : "Create Invoice Stage"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default InvoiceStagesForm;
