"use client";

import { useState, useEffect, useRef } from 'react';

interface Option {
  id: string;
  title: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
}: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the selected option's title
  const selectedOption = options.find(opt => opt.id === value);
  
  useEffect(() => {
    // Enhanced search logic to match at word boundaries and be more forgiving
    const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filtered = options.filter(option => {
      const title = option.title.toLowerCase();
      // Match all search terms
      return searchTerms.every(term => {
        // Match at start of any word in the title
        return title.split(' ').some(word => word.startsWith(term)) ||
          // Or match anywhere in the title for flexibility
          title.includes(term);
      });
    });
    
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.id);
    setSearchTerm(''); // Clear search term when option is selected
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm || (selectedOption?.title || '')}
        onChange={handleInputChange}
        onFocus={() => !disabled && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-500/50 ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      />
      {isOpen && !disabled && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-[#1a1f35] border border-white/10 rounded-lg shadow-lg">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-white/10 ${
                value === option.id ? 'bg-white/10 text-emerald-400' : 'text-white'
              }`}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
      {isOpen && !disabled && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 p-4 bg-[#1a1f35] border border-white/10 rounded-lg shadow-lg text-white/50 text-center">
          No matching MOS/Rate found
        </div>
      )}
    </div>
  );
} 