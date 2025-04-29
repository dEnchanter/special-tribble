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
import { fetchPatch, fetchPost } from "@/services/fetcher";
import { toast } from "sonner";
import { z } from "zod";
import { MaterialRequestFormData, materialRequestSchema } from "@/schemas/materialRequestSchema";
import { useStaff } from "@/hooks/useStaff";
import { DatePicker } from "../ui/date-picker";

interface MaterialRequestFormProps extends React.ComponentProps<"form"> {
  closeDialog: () => void;
  initialValues?: Partial<MaterialRequest>; 
}

const MaterialRequestForm = ({ className, closeDialog, initialValues }: MaterialRequestFormProps) => {

  const form = useForm<z.infer<typeof materialRequestSchema>>({
    resolver: zodResolver(materialRequestSchema),
    defaultValues: {
      requestDate: initialValues?.requestDate || "",
      approveDate: initialValues?.approveDate || "",
      requesterId: initialValues?.requesterId || 0,
      approvedId: initialValues?.approvedId || 0,
      quantity: initialValues?.quantity || {},
      materials: initialValues?.materials || {},
      isAssigned: initialValues?.isAssigned || false,
      productionId: initialValues?.productionId || 0,
    },
  });

  const { data: staffs, isLoading: staffsIsLoading, isError: staffsError } = useStaff();
  // const { data: productions, isLoading: productionsLoading, isError: productionsError } = useProductions();
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<MaterialRequestFormData> = async (data) => {
    setIsLoading(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(
          `${Endpoint.UPDATE_MATERIAL_REQUEST}/${initialValues.id}`, 
          processedData
        );
        toast.success(responseData?.message || "Material request updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_MATERIAL_REQUEST, processedData);
        toast.success(responseData?.message || "Material request created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Material Request</div>
      <Form {...form}>
        <form 
          className={cn("space-y-6", className)} 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Material Request Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="text-md font-semibold italic sm:col-span-2">Material Request Information</div>

            <FormField
              control={form.control}
              name="requestDate"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Request Date</Label>
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
              name="approveDate"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Approve Date</Label>
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
            
            {/* Requester */}
            <FormField
              control={form.control}
              name="requesterId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Requester</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select requester" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffsIsLoading ? (
                          <SelectItem disabled value="nil">Loading...</SelectItem>
                        ) : staffsError ? (
                          <SelectItem disabled value="nil">Error loading users</SelectItem>
                        ) : (
                          staffs?.map(staff => (
                            <SelectItem key={staff.id} value={staff.id.toString()}>{staff.staffName}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Approver */}
            <FormField
              control={form.control}
              name="approvedId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Approver</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select approver" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffsIsLoading ? (
                          <SelectItem disabled value="nil">Loading...</SelectItem>
                        ) : staffsError ? (
                          <SelectItem disabled value="nil">Error loading users</SelectItem>
                        ) : (
                          staffs?.map(staff => (
                            <SelectItem key={staff.id} value={staff.id.toString()}>{staff.staffName}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Materials */}
            <FormField
              control={form.control}
              name="materials"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Materials</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Materials" value={JSON.stringify(field.value)} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Quantity</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input 
                      type="number" 
                      placeholder="Quantity" 
                      value={typeof field.value === 'number' ? field.value : 0} 
                      onChange={field.onChange} 
                      onBlur={field.onBlur} 
                      name={field.name} 
                      ref={field.ref} 
                    />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Assigned */}
            <FormField
              control={form.control}
              name="isAssigned"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Assigned</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={(value) => field.onChange(value === 'true')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Is Assigned?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Production */}
            {/* <FormField
              control={form.control}
              name="productionId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Production</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select production" />
                      </SelectTrigger>
                      <SelectContent>
                        {productionsLoading ? (
                          <SelectItem disabled value="nil">Loading...</SelectItem>
                        ) : productionsError ? (
                          <SelectItem disabled value="nil">Error loading productions</SelectItem>
                        ) : (
                          productions?.map(production => (
                            <SelectItem key={production.id} value={production.id.toString()}>{production.name}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            /> */}
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Button type="button" size="lg" variant="outline" onClick={closeDialog}>Cancel</Button>
            <CustomButton
              type="submit"
              size="lg"
              className=" bg-[#0F3F5F] hover:bg-[#0F3F5F]"
              isLoading={isLoading}
            >
               {initialValues?.id ? "Update Material Request" : "Create Material Request"}	
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
}

export default MaterialRequestForm;
