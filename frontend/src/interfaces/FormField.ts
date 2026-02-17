import type { ChangeEvent } from "react";

export interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
