export type TaskType =
  | "Stereometria"
  | "Optymalizacja"
  | "Granice"
  | "Trygonometria"
  | "Równania trygonometryczne"
  | "Wielomiany"
  | "Ciągi"
  | "Dowody algebraiczne"
  | "Dowody geometryczne"
  | "Nierówności"
  | "Równania z parametrem"
  | "Prawdopodobieństwo"
  | "Kombinatoryka"
  | "Wartości bezwzględne"
  | "Geometria analityczna"
  | "Planimetria";

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
