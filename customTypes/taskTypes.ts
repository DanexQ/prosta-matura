export interface TaskListItem extends TaskProps {
  isCompleted: boolean;
}

export type TaskList = TaskListItem[];

export type TaskProps = {
  taskId: string;
  answer: string;
  content: string;
  examType: "Oficjalna" | "Próbna" | "Dodatkowa";
  examYear: number;
  formula: "Stara" | "Nowa";
  imageUrl?: string;
  points: number;
  taskType: TaskType;
  taskNumber: number;
};

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

export const taskTypeList = {
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
