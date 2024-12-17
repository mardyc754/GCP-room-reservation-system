import { forwardRef } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type LabelWithInputProps = {
  labelProps?: Omit<React.ComponentProps<typeof Label>, "htmlFor">;
  inputProps?: React.ComponentProps<typeof Input>;
  label: string;
  errorLabel?: string;
};

export const LabelWithInput = forwardRef<HTMLInputElement, LabelWithInputProps>(
  ({ labelProps, inputProps, label, errorLabel }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        <Label {...labelProps} htmlFor={inputProps?.name}>
          {label}
        </Label>
        <div className={cn("flex flex-col", !errorLabel && "pb-4")}>
          <Input ref={ref} {...inputProps} />
          {errorLabel && <p className="text-red-500 text-xs">{errorLabel}</p>}
        </div>
      </div>
    );
  }
);

LabelWithInput.displayName = "LabelWithInput";
