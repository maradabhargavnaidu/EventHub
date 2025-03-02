import React from "react";

type InputFieldProps = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    error?: string; // Add error prop to display validation errors
};

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    icon,
    error,
}) => (
    <div className="space-y-2">
        <label htmlFor={id} className="text-zinc-300 block">
            {label}
        </label>
        <div className="relative">
            <span className="absolute left-3 top-3 h-4 w-4 text-zinc-400">{icon}</span>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full pl-9 bg-zinc-800/50 border ${error ? "border-red-500" : "border-zinc-700"
                    } text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg py-2 px-3`}
            />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default InputField;
