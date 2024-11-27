export type Achivements = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  icon: string;
  progress: {
    completed: number;
    total: number;
  };
  status: string;
};