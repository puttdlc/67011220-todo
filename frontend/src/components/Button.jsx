export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  const base =
    "px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg active:scale-95 transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2";

  const primary =
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400";

  return (
    <button type={type} className={`${base} ${primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
