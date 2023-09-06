import React from "react";
import Image from "next/image";
import { TaskItem } from "@CustomTypes/taskTypes";

const TaskContent = ({
  content,
  imageUrl,
}: Pick<TaskItem, "content" | "imageUrl">) => {
  return (
    <>
      <p className="my-2 font-thin text-justify whitespace-pre-line md:my-5">
        {content.replaceAll("/n", "\n")}
      </p>
      {!!imageUrl && (
        <Image
          src={imageUrl}
          alt="TaskImage"
          width={300}
          height={300}
          className="self-center mx-auto my-5 invert"
        />
      )}
    </>
  );
};

export default TaskContent;
