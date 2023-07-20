import React from "react";
import Image from "next/image";
import { TaskItem } from "@customTypes/taskTypes";

const TaskContent = ({
  content,
  imageUrl,
}: Pick<TaskItem, "content" | "imageUrl">) => {
  return (
    <>
      <p className="my-2 font-thin whitespace-pre-line md:my-5">
        {content.replaceAll("/n", "\n")}
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
