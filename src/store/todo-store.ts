import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  color: string;
  priority: TodoPriority;
  category: TodoCategory;
  dueDate?: Date;
  notes?: string;
  tags?: string[];
}

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'color'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  getStats: () => {
    total: number;
    completed: number;
    active: number;
    byPriority: Record<TodoPriority, number>;
    byCategory: Record<TodoCategory, number>;
    completionRate: number;
    todayCompleted: number;
    weeklyProgress: number[];
  };
}

const COLORS = [
  '#DAF5F0', // Mint
  '#B5D2AD', // Sage
  '#FDFD96', // Pastel Yellow
  '#F8D6B3', // Peach
  '#FCDFFF', // Light Pink
  '#E3DFF2', // Lavender
  '#A7DBD8', // Light Cyan
  '#BAFCA2', // Light Green
  '#FFDB58', // Marigold
  '#FFA07A', // Light Salmon
];

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
            },
            ...state.todos,
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? new Date() : undefined,
                }
              : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
      getStats: () => {
        const todos = get().todos;
        const completed = todos.filter((t) => t.completed).length;
        const todayCompleted = todos.filter(
          (t) =>
            t.completed &&
            t.completedAt &&
            format(t.completedAt, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
        ).length;

        const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = format(date, 'yyyy-MM-dd');
          return todos.filter(
            (t) =>
              t.completed &&
              t.completedAt &&
              format(t.completedAt, 'yyyy-MM-dd') === dateStr
          ).length;
        }).reverse();

        const byPriority = todos.reduce(
          (acc, todo) => {
            acc[todo.priority]++;
            return acc;
          },
          { low: 0, medium: 0, high: 0 } as Record<TodoPriority, number>
        );

        const byCategory = todos.reduce(
          (acc, todo) => {
            acc[todo.category]++;
            return acc;
          },
          {
            work: 0,
            personal: 0,
            shopping: 0,
            health: 0,
            other: 0,
          } as Record<TodoCategory, number>
        );

        return {
          total: todos.length,
          completed,
          active: todos.length - completed,
          byPriority,
          byCategory,
          completionRate: todos.length ? (completed / todos.length) * 100 : 0,
          todayCompleted,
          weeklyProgress,
        };
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);