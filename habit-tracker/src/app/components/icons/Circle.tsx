export function Circle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
      className="w-6 h-6 text-gray-500 hover:text-gray-500"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}