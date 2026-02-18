import React from "react";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name?: string;
}

const SelectField = ({ label, name, children, ...props }: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="bg-zinc-900 border border-dashed border-zinc-800 p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4ff00] font-mono text-xs w-full"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectField;
