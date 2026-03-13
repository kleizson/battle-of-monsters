import type { ChangeEvent } from "react";

interface StatInputProps {
  id: string;
  name: string;
  label: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelClass: string;
  inputClass: string;
}

export function StatInput({
  id,
  name,
  label,
  value,
  onChange,
  labelClass,
  inputClass,
}: StatInputProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
        min="1"
      />
    </div>
  );
}
