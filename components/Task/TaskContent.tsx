"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";

const config = {
  loader: { load: ["input/asciimath"] },
};

const TaskContent = ({ content }: { content: string }) => {
  return (
    <p className="my-2 font-thin text-justify whitespace-pre-line md:my-5">
      <MathJaxContext config={config}>
        <MathJax>{content.replaceAll("/n", "\n")}</MathJax>
        {/*
          TODO: MAKE ALL IMAGES IMAGES AND NOT SVG
          {!!details.imageUrl && (
            <Image
              src={details.imageUrl}
              alt="TaskImage"
              width={300}
              height={300}
            />
          )} */}
      </MathJaxContext>
    </p>
  );
};

export default TaskContent;
