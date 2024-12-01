import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";


export const FilterDropdown = ({
    label,
    items,
    value,
    onValueChange,
    minWidth,
  }: {
    label: string;
    items: string[];
    value: string;
    onValueChange: (value: string) => void;
    minWidth: string;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-[40px] ${minWidth} p-2 flex justify-between items-center`}
        >
          <span>{value || "All"}</span> {/* Display "All" if no filter is applied */}
          <ChevronDown className="h-[20px] w-[20px] ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {items.map((item, idx) => (
            <DropdownMenuRadioItem value={item} key={idx}>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );