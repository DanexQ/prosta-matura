export const taskStatusStyling = (
  taskStatus: {
    loading: boolean;
    isCompleted: boolean;
  },
  stylings: { pending: string; completed: string; neutral: string }
) => {
  if (taskStatus.isCompleted && !taskStatus.loading) return stylings.completed;
  if (taskStatus.loading) return stylings.pending;
  return stylings.neutral;
};
