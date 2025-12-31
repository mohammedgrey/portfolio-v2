import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { ChevronDownIcon, CloseIcon } from "@/assets/icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string | number | boolean;
  label: string;
};

export type SelectOptionValue = SelectOption["value"];

export type SingleSelectProps = {
  options: SelectOption[];
  value?: SelectOptionValue;
  onChange: (value: SelectOptionValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  "aria-invalid"?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  renderOption?: (option: SelectOption) => React.ReactNode;
};

const SingleSelect: React.FC<SingleSelectProps> = ({
  onChange,
  options,
  value,
  placeholder,
  disabled = false,
  clearable = false,
  "aria-invalid": ariaInvalid = false,
  renderOption,
  ref,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Combine the forwarded ref with internal ref
  const combinedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectOptionValue | null>(
    value ?? null
  );
  const [inputValue, setInputValue] = React.useState("");

  const handleClear = React.useCallback(() => {
    setSelected(null);
    setInputValue("");
    onChange(null);
  }, [onChange]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && clearable && selected !== null) {
            handleClear();
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [clearable, selected, handleClear]
  );

  const selectables = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  React.useEffect(() => {
    if (selected !== value) {
      setSelected(value ?? null);
    }
  }, [value, selected]);

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={"overflow-visible bg-transparent relative"}
    >
      <div
        aria-invalid={ariaInvalid}
        autoFocus
        className={cn(
          "group px-1 min-h-9 py-[6px] text-sm",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input rounded-md border bg-transparent text-base shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-within:border-ring focus-within:ring-ring/10 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/10 dark:aria-invalid:ring-destructive/30 aria-invalid:border-destructive"
        )}
      >
        <div className="flex items-center gap-1">
          {selectedOption && (
            <div className="flex ps-2 items-center gap-1">
              <span className="text-sm text-foreground">
                {selectedOption.label}
              </span>
            </div>
          )}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={combinedRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onKeyDown={() => setOpen(true)}
            disabled={disabled}
            placeholder={
              selectedOption ? "" : placeholder ?? "Select option..."
            }
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
              selectedOption ? "ms-0" : "ms-2"
            )}
          />
          {clearable && value != null && (
            <button
              type="button"
              onClick={handleClear}
              className="flex mt-[2px] hover:bg-muted rounded-full h-5 w-5 items-center justify-center"
            >
              <CloseIcon className="size-4 text-muted-foreground" />
            </button>
          )}
          <ChevronDownIcon className="size-3 text-muted-foreground me-2 mt-[3.5px]" />
        </div>
      </div>
      {open && selectables?.length > 0 ? (
        <CommandList className="absolute px-1 top-[calc(100%+8px)] z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="flex h-full flex-col gap-2 overflow-auto">
            {selectables?.map?.((option) => {
              const isSelected = selected === option.value;
              return (
                <CommandItem
                  key={option.value + ""}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setSelected(option.value);
                    setInputValue(""); // Clear input value when option is selected
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={"flex w-full cursor-pointer justify-between gap-2"}
                >
                  {renderOption ? renderOption(option) : option.label}
                  {isSelected && <CheckIcon className="h-4 w-4" />}
                </CommandItem>
              );
            }) ?? []}
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SingleSelect;
