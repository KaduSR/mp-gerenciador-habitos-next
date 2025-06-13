export function Trash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
      className="w-6 h-6 text-red-400 hover:text-red-300"
    >
      <path d="M3 6h18M9 6v12m6-12v12" />
    </svg>
  );
}
