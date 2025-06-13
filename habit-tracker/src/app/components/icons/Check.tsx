export function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
      className="w-6 h-6 text-green-400 hover:text-green-300"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
