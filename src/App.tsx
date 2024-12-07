import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { Stats } from './components/Stats';
import { useTodoStore } from './store/todo-store';
import { CheckSquare } from 'lucide-react';
import { colors } from './lib/colors';

function App() {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:py-12"
      style={{ backgroundColor: colors.background.primary }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 
            className="text-4xl sm:text-5xl font-bold flex items-center justify-center gap-3 mb-4"
            style={{ color: colors.background.accent }}
          >
            <CheckSquare className="w-8 h-8 sm:w-12 sm:h-12" />
            TaskMaster Pro
          </h1>
          <p style={{ color: colors.text.secondary }} className="text-base sm:text-lg font-medium">
            Get things done with style and attitude!
          </p>
        </div>

        <Stats />
        <TodoInput onAdd={addTodo} />
        <TodoFilter filter={filter} onFilterChange={setFilter} />

        <div className="space-y-4">
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </AnimatePresence>

          {filteredTodos.length === 0 && (
            <div 
              className="text-center py-8 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ 
                backgroundColor: colors.lightGreen,
                color: colors.text.secondary
              }}
            >
              No tasks found. Add some tasks to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;