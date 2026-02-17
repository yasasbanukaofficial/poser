import { type FormFieldProps } from "../interfaces/FormField";

const FormField = ({
  name,
  label,
  placeholder,
  type = "text",
  onChange,
  value,
}: FormFieldProps) => (
  <div className="flex flex-col gap-2 mb-6">
    <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
      {label}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#d4ff00] transition-colors"
    />
  </div>
);

export default FormField;
