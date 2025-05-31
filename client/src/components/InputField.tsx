import React from "react";

type InputFieldProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, type = "text", placeholder, icon, error, ...rest }, ref) => (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="text-zinc-300 block">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-3 h-4 w-4 text-zinc-400">
          {icon}
        </span>
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full pl-9 bg-zinc-800/50 border ${
            error ? "border-red-500" : "border-zinc-700"
          } text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg py-2 mb-4 px-3`}
          {...rest} // <-- Spread register props
        />
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-md text-red-400 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  )
);

export default InputField;
