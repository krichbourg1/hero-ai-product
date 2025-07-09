import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color?: string;
  onChange: (color: { hex: string }) => void;
}

export default function ColorPicker({
  color = "#000000",
  onChange,
}: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-background"
          title="Change accent color"
        >
          <div
            className="size-5 rounded-full border"
            style={{ backgroundColor: color }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-none bg-transparent p-0 shadow-none">
        <HexColorPicker
          color={color}
          onChange={(hex: string) => onChange({ hex })}
        />
      </PopoverContent>
    </Popover>
  );
} 