import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import Image from "next/image";

const config = {
  loader: { load: ["input/asciimath"] },
};

const TaskContent = ({
  content,
  imageUrl,
}: {
  content: string;
  imageUrl?: string;
}) => {
  return (
    <MathJaxContext config={config}>
      <p className="my-2 font-thin text-justify whitespace-pre-line md:my-5">
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
    </MathJaxContext>
  );
};

export default TaskContent;
