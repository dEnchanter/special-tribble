import Image from "next/image";
import { useState } from "react";
import { Input } from "./input";

interface ImageUploadProps {
  onChange: (image: string) => void;
  value?: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(value);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String); // Display the preview
        onChange(base64String); // Send the base64 string to the parent component
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <div className="space-y-2">
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <Image src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 object-cover" height={500} width={500} />
      )}
    </div>
  );
};

export default ImageUpload;
