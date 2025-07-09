"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  id: string;
  title: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  emptyText: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  emptyText,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20",
            className
          )}
        >
          {value
            ? options.find((option) => option.id === value)?.title
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-[#1a1f35] border-white/10">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="text-white bg-transparent border-white/10"
          />
          <CommandEmpty className="py-6 text-center text-sm text-white/60">
            {emptyText}
          </CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.id}
                value={option.title}
                onSelect={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                className="text-white hover:bg-white/10 aria-selected:bg-white/10"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 