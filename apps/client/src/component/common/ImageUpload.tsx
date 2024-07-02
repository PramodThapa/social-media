import { Upload } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import React, { useState } from "react";
import "~/styles/__image.scss";

export interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload">
      <input
        accept="image/*"
        className="image-upload__input"
        id="upload-image"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="upload-image" className="image-upload__label">
        <Avatar
          sx={{ width: "100%", height: 400, cursor: "pointer" }}
          variant="square"
          src={imageUrl}
          alt="Upload"
          className="image-upload__avatar"
        >
          <Typography sx={{ font: "inherit" }}>
            Upload Thumbnail <Upload />
          </Typography>
        </Avatar>
      </label>
    </div>
  );
};
export default ImageUpload;
