import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { TodoCategory, TodoPriority } from '../store/todo-store';
import { colors } from '../lib/colors';

interface TodoInputProps {
  onAdd: (todo: {
    text: string;
    priority: TodoPriority;
    category: TodoCategory;
    dueDate?: Date;
    notes?: string;
  }) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('low');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({
        text: text.trim(),
        priority,
        category,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        notes: notes.trim() || undefined,
      });
      setText('');
      setDueDate('');
      setNotes('');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border-2 border-black rounded-lg 
                   bg-white text-[#636E72] placeholder-gray-400
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                   transition-all"
        />
        <div className="flex gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 sm:flex-none px-4 py-3 bg-[#E3DFF2] text-[#636E72] rounded-lg
                     border-2 border-black
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[-2px] hover:translate-y-[-2px]
                     transition-all"
            style={{ backgroundColor: colors.lavender }}
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
          <button
            type="submit"
            className="flex-1 sm:flex-none px-6 py-3 bg-[#FF6B6B] text-white rounded-lg
                     border-2 border-black
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[-2px] hover:translate-y-[-2px]
                     transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-2">
            <label className="block text-[#636E72]">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriority)}
              className="w-full px-3 py-2 border-2 border-black rounded"
              style={{ backgroundColor: colors.priority[priority] }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#636E72]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TodoCategory)}
              className="w-full px-3 py-2 border-2 border-black rounded"
              style={{ backgroundColor: colors.category[category] }}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#636E72]">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded"
              style={{ backgroundColor: colors.pastelYellow }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#636E72]">Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              className="w-full px-3 py-2 border-2 border-black rounded"
              style={{ backgroundColor: colors.sage }}
            />
          </div>
        </div>
      )}
    </form>
  );
};