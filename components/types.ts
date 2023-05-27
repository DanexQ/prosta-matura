export type TaskType =
  | "stereometria"
  | "optymalizacja"
  | "granice"
  | "trygonometria"
  | "wielomiany"
  | "ciagi"
  | "dalgebraiczne"
  | "dgeometryczne"
  | "nierownosci"
  | "rzparametrem"
  | "prawdopodobienstwo"
  | "kombinatoryka"
  | "wbezwzgledne"
  | "geoanalityczna"
  | "planimetria";

export type FilterType = {
  id: string;
  quantity: number;
  type: TaskType;
};

export type TaskProps = {
  answer: string;
  content: string;
  examType: "Oficjalna" | "Próbna" | "Dodatkowa";
  examYear: number;
  formula: "Stara" | "Nowa";
  imageUrl?: string;
  points: number;
  taskType: TaskType;
};

export interface TaskListItem extends TaskProps {
  id: string;
}

export type TaskList = TaskListItem[];
