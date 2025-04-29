/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Example Country List
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Japan",
  "Mexico",
  "China",
];

export const CountryPicker = ({ control, name, label }: any) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }: any) => (
        <div>
          <Label className="text-xs">{label}</Label>
          <FormControl className={field.value ? "font-medium" : "border-gray-300"}>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
        </div>
      )}
    />
  );
};