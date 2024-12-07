import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit2, Star, Calendar, MessageSquare, Tag } from 'lucide-react';
import { Todo, TodoPriority } from '../store/todo-store';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { colors } from '../lib/colors';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'p-4 rounded-lg border-2 border-black',
        'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        'transition-all',
        'sm:p-6',
        todo.completed ? 'opacity-75' : ''
      )}
      style={{ 
        backgroundColor: colors.priority[todo.priority],
        color: todo.priority === 'high' ? 'white' : colors.text.primary
      }}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-2 bg-white border-2 border-black rounded"
            style={{ color: colors.text.primary }}
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded border-2 border-black"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => onToggle(todo.id)}
              className={cn(
                'w-6 h-6 border-2 border-black rounded flex items-center justify-center shrink-0',
                todo.completed ? 'bg-black' : 'bg-white'
              )}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <span
              className={cn(
                'flex-1 font-medium break-words',
                todo.completed && 'line-through opacity-50'
              )}
              style={{ color: todo.priority === 'high' ? 'white' : colors.text.primary }}
            >
              {todo.text}
            </span>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-2 hover:bg-black/10 rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4" style={{ color: todo.priority === 'high' ? 'white' : 'black' }} />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-black/10 rounded transition-colors"
              >
                <Edit2 className="w-4 h-4" style={{ color: todo.priority === 'high' ? 'white' : 'black' }} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 hover:bg-black/10 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" style={{ color: todo.priority === 'high' ? 'white' : 'black' }} />
              </button>
            </div>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 bg-black/10 rounded-lg space-y-2"
            >
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1" style={{ color: todo.priority === 'high' ? 'white' : 'black' }}>
                  <Star
                    className={cn(
                      'w-4 h-4',
                      todo.priority === 'high' && 'fill-current'
                    )}
                  />
                  {todo.priority}
                </span>
                <span
                  className="px-2 py-1 rounded font-medium text-xs border border-black bg-white"
                >
                  {todo.category}
                </span>
                {todo.dueDate && (
                  <span className="flex items-center gap-1" style={{ color: todo.priority === 'high' ? 'white' : 'black' }}>
                    <Calendar className="w-4 h-4" />
                    {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
              {todo.notes && (
                <p className="text-sm" style={{ color: todo.priority === 'high' ? 'white' : 'black', opacity: 0.8 }}>
                  {todo.notes}
                </p>
              )}
              {todo.tags && todo.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {todo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border border-black"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};