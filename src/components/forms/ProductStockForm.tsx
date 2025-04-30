/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ProductStockForm.tsx
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
import { ProductStockFormData, productStockSchema } from "@/schemas/productStockSchema";
import { useProductDef } from "@/hooks/useProductDef";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ProductStockFormProps extends React.ComponentProps<"form"> {
  closeDialog: () => void;
  initialValues?: Partial<ProductStock>;
}

const ProductStockForm = ({ className, closeDialog, initialValues }: ProductStockFormProps) => {
  const form = useForm<z.infer<typeof productStockSchema>>({
    resolver: zodResolver(productStockSchema),
    defaultValues: {
      productionCode: initialValues?.productionCode || "",
      pushedBy: initialValues?.pushedBy || 0,
      receivedBy: initialValues?.receivedBy || 0,
      productInfo: initialValues?.productInfo || {},
      isAvailable: initialValues?.isAvailable || true,
      productDefId: initialValues?.productDefId || 0,
    },
  });

  const { data: productDefs, isLoading: productDefsLoading, isError: productDefsError } = useProductDef();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<ProductStockFormData> = async (data) => {
    setIsLoadingSubmit(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_PRODUCTION_STOCK}/${initialValues.id}`, processedData);
        toast.success(responseData?.message || "Product Stock updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_PRODUCTION_STOCK, processedData);
        toast.success(responseData?.message || "Product Stock created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Product Stock</div>
      <Form {...form}>
        <form 
          className={className} // Pass className here for custom styling
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Product Stock Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="productionCode"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Production Code</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Production Code" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="pushedBy"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Pushed By (User ID)</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="User ID" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="receivedBy"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Received By (User ID)</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="User ID" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Select for Product Definition */}
            <FormField
              control={form.control}
              name="productDefId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Product Definition</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Definition" />
                      </SelectTrigger>
                      <SelectContent>
                        {productDefsLoading ? (
                          <SelectItem disabled value="nil">Loading...</SelectItem>
                        ) : productDefsError ? (
                          <SelectItem disabled value="nil">Error loading product definitions</SelectItem>
                        ) : (
                          productDefs?.map((productDef) => (
                            <SelectItem key={productDef.id} value={productDef.id.toString()}>
                              {productDef.name} - {productDef.code}
                            </SelectItem>
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

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-2">
            <Button type="button" size="lg" variant="outline" onClick={closeDialog}>Cancel</Button>
            <CustomButton
              type="submit"
              size="lg"
              className=" bg-[#0F3F5F] hover:bg-[#0F3F5F]"
              isLoading={isLoadingSubmit}
            >
              {initialValues?.id ? "Update Product Stock" : "Create Product Stock"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductStockForm;
