import { cn } from "../lib/utils";
export default function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 disabled:opacity-50",
        {
          "bg-white text-black hover:bg-zinc-200": variant === "default",
          "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-white":
            variant === "outline",
          "bg-transparent hover:bg-zinc-800 text-white": variant === "ghost",
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3": size === "sm",
          "h-11 px-8": size === "lg",
          "h-10 w-10 p-0": size === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
