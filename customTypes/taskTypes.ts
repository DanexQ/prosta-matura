import { ExamFormula, ExamType, ExamYear } from "./examTypes";

export type Task = {
  taskId: string;
  answer: string;
  content: string;
  examType: ExamType;
  examYear: ExamYear;
  formula: ExamFormula;
  imageUrl?: string;
  points: number;
  taskType: TaskType;
  taskNumber: number;
};

export interface TaskItem extends Task {
  isCompleted: boolean;
}
export type TasksDetails = {
  tasks: TaskList;
  tasksQuantity: number;
};

export type TaskList = TaskItem[];

export type TaskType =
  | "stereometria"
  | "optymalizacja"
  | "granice"
  | "trygonometria"
  | "wielomiany"
  | "ciagi"
  | "dalgebraiczne"
  | "dgeometryczne"
  | "rownoscinierownosci"
  | "rzparametrem"
  | "prawdopodobienstwo"
  | "kombinatoryka"
  | "wbezwzgledne"
  | "geoanalityczna"
  | "planimetria";

export const taskTypeData = {
  stereometria: "Stereometria",
  optymalizacja: "Optymalizacja",
  granice: "Granice",
  trygonometria: "Trygonometria",
  wielomiany: "Wielomiany",
  ciagi: "Ciągi",
  dalgebraiczne: "Dowody algebraiczne",
  dgeometryczne: "Dowody geometryczne",
  rownoscinierownosci: "Równości i nierówności",
  rzparametrem: "Równania z parametrem",
  prawdopodobienstwo: "Prawdopodobieństwo",
  kombinatoryka: "Kombinatoryka",
  wbezwzgledne: "Wartości bezwzględne",
  geoanalityczna: "Geometria analityczna",
  planimetria: "Planimetria",
};
