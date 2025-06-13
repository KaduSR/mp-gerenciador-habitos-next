export function Cancel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
      className="w-6 h-6 text-red-400 hover:text-red-300"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
