"use client";
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import { OurFileRouter } from "app/api/uploadthing/core";

const ButtonUploader = ({
  setImageUrl,
}: {
  setImageUrl: (imgUrl: string | null) => void;
}) => {
  return (
    <UploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        setImageUrl(res?.at(0)?.fileUrl ?? null);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default ButtonUploader;
