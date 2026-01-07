export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  const base =
    "px-6 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md " +
    "hover:bg-blue-700 hover:shadow-lg active:scale-95 transition " +
    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2";

  return (
    <button type={type} className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
