import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, X } from "lucide-react";
import * as React from "react";

import { ChevronDownIcon, CloseIcon } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";
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

export type MultiSelectProps = {
  options: SelectOption[];
  value: SelectOptionValue[];
  onChange: (value: SelectOptionValue[]) => void;
  placeholder?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  clearable?: boolean;
  renderOption?: (option: SelectOption) => React.ReactNode;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  onChange,
  options,
  value,
  placeholder,
  disabled = false,
  "aria-invalid": ariaInvalid = false,
  clearable = false,
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
    [ref],
  );
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectOptionValue[]>(
    value ?? [],
  );

  const handleUnselect = React.useCallback((option: SelectOptionValue) => {
    setSelected((prev) => prev.filter((s) => s !== option));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = options;
  // filter((option) => !selected?.includes(option.value)) ?? [];

  React.useEffect(() => {
    onChange(selected ?? []);
  }, [selected, onChange]);

  React.useEffect(() => {
    setSelected(value ?? []);
  }, [value]);

  const handleClear = () => {
    setSelected([]);
    onChange([]);
  };

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={"overflow-visible bg-transparent relative"}
    >
      <div
        aria-invalid={ariaInvalid}
        autoFocus
        className={cn(
          "group flex min-h-11 items-center px-1 py-1.5 text-sm",
          "placeholder:text-muted-foreground backdrop-blur-md selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input rounded-md border bg-transparent text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-within:border-ring focus-within:ring-ring/10 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/10 dark:aria-invalid:ring-destructive/30 aria-invalid:border-destructive",
        )}
      >
        <div
          className={cn(
            selected?.length > 0 && "ms-2",
            "flex w-full flex-wrap items-center gap-1",
          )}
        >
          {selected.map((option) => {
            return (
              <Badge className="" key={option + ""} variant="outline">
                {options.find((o) => o.value === option)?.label ?? ""}
                <button
                  type="button"
                  className="ms-1 cursor-pointer rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={combinedRef}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            disabled={disabled}
            placeholder={placeholder ?? "Select options..."}
            className="ms-2 min-h-6 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
          {clearable && !!value?.length && (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
            >
              <CloseIcon className="size-4 text-muted-foreground" />
            </button>
          )}
          <ChevronDownIcon className="me-2 size-3 self-center text-muted-foreground" />
        </div>
      </div>
      {open && selectables?.length > 0 ? (
        <CommandList className="absolute px-1 top-[calc(100%+8px)] z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="flex h-full flex-col gap-2 overflow-auto">
            {selectables?.map?.((option) => {
              const alreadySelected = selected?.some((e) => e === option.value);
              return (
                <CommandItem
                  key={option.value + ""}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    if (alreadySelected)
                      setSelected((prev) =>
                        prev.filter((s) => s !== option.value),
                      );
                    else setSelected((prev) => [...prev, option.value]);
                  }}
                  className={"flex w-full cursor-pointer justify-between gap-2"}
                >
                  {renderOption ? renderOption(option) : option.label}
                  {alreadySelected && <CheckIcon className="h-4 w-4" />}
                </CommandItem>
              );
            }) ?? []}
          </CommandGroup>
        </CommandList>
      ) : null}
    </Command>
  );
};

export default MultiSelect;
