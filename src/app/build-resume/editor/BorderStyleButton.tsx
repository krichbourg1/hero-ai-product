import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleIcon, SquareIcon, SquircleIcon } from "lucide-react";

export enum BorderStyles {
  SQUARE = "square",
  SQUIRCLE = "squircle",
  CIRCLE = "circle",
}

interface BorderStyleButtonProps {
  borderStyle?: string;
  onChange: (borderStyle: BorderStyles) => void;
}

export default function BorderStyleButton({
  borderStyle = BorderStyles.SQUIRCLE,
  onChange,
}: BorderStyleButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-background"
          title="Change border style"
        >
          {borderStyle === BorderStyles.SQUARE ? (
            <SquareIcon className="size-5" />
          ) : borderStyle === BorderStyles.CIRCLE ? (
            <CircleIcon className="size-5" />
          ) : (
            <SquircleIcon className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => onChange(BorderStyles.SQUARE)}>
          <SquareIcon className="me-2 size-4" />
          Square
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange(BorderStyles.SQUIRCLE)}>
          <SquircleIcon className="me-2 size-4" />
          Squircle
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange(BorderStyles.CIRCLE)}>
          <CircleIcon className="me-2 size-4" />
          Circle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 