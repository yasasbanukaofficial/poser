export interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  onChange?: () => void;
}
