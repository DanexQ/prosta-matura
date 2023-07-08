"use client";
import { db } from "@firebase";
import { CompletedTasksDataType } from "@firebase/getTasks";
import { capitalizeWord } from "@utils/capitalizeWord";
import { sumCompletedTasks } from "@utils/sumCompletedTasks";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const useExamTasksCounter = ({
  examType,
  examYear,
}: {
  examType: string;
  examYear: number;
}) => {
  const [tasksCounter, setTasksCounter] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    const id = session?.user.id as string;
    if (!id) return;
    const unsub = onSnapshot(doc(db, "completedTasks", id), (doc) => {
      const { completedTasks } = doc.data() as CompletedTasksDataType;
      const completedTasksCounter = completedTasks.filter(
        (completedTask) =>
          completedTask.examYear === examYear &&
          completedTask.examType === capitalizeWord(examType)
      ).length;
      setTasksCounter(completedTasksCounter);
    });
    return () => {
      unsub();
    };
  }, [session?.user.id, examType, examYear]);
  return { tasksCounter };
};
