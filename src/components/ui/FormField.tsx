import type { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "url" | "email";
  placeholder?: string;
  labelClass: string;
  inputClass: string;
}

export function FormField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  labelClass,
  inputClass,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder={placeholder}
      />
    </div>
  );
}
