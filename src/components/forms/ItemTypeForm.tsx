/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ItemTypeForm.tsx
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
import { ItemTypeFormData, itemTypeSchema } from "@/schemas/itemTypeSchema";
import { cn } from "@/lib/utils";

const ItemTypeForm = ({ className, closeDialog, initialValues }: { className?: string, closeDialog: () => void, initialValues?: Partial<ItemType> }) => {
  const form = useForm<z.infer<typeof itemTypeSchema>>({
    resolver: zodResolver(itemTypeSchema),
    defaultValues: {
      name: initialValues?.name || "",
      code: initialValues?.code || "",
      unit: initialValues?.unit || "",
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<ItemTypeFormData> = async (data) => {
    setIsLoadingSubmit(true);

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_ITEM_TYPES}/${initialValues.id}`, data);
        toast.success(responseData?.message || "Item Type updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_ITEM_TYPES, data);
        toast.success(responseData?.message || "Item Type created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Item Type</div>
      <Form {...form}>
        <form 
          className={cn("space-y-6", className)} 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <Label>Item Type Name</Label>
                <FormControl>
                  <Input placeholder="Item Type Name" {...field} />
                </FormControl>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <div>
                <Label>Code</Label>
                <FormControl>
                  <Input placeholder="Code" {...field} />
                </FormControl>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <div>
                <Label>Unit</Label>
                <FormControl>
                  <Input placeholder="Unit" {...field} />
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
              {initialValues?.id ? "Update Item Type" : "Create Item Type"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ItemTypeForm;
