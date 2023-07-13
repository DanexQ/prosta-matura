import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import Image from "next/image";

const TaskContent = ({
  content,
  imageUrl,
}: {
  content: string;
  imageUrl?: string;
}) => {
  return (
    <>
      <p className="my-2 font-thin whitespace-pre-line md:my-5">
        <MathJax>{content.replaceAll("/n", "\n")}</MathJax>
      </p>

      {!!imageUrl && (
        <Image
          src={imageUrl}
          alt="TaskImage"
          width={250}
          height={250}
          className="self-center invert"
        />
      )}
    </>
  );
};

export default TaskContent;
