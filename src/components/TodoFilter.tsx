import React from 'react';
import { cn } from '../lib/utils';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      {(['all', 'active', 'completed'] as const).map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={cn(
            'px-4 py-2 border-2 border-black rounded-lg capitalize',
            'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
            'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
            'hover:translate-x-[-2px] hover:translate-y-[-2px]',
            'transition-all',
            filter === f
              ? 'bg-black text-white'
              : 'bg-white hover:bg-gray-100'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
};