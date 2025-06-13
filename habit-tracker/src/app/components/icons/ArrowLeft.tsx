// app/components/icons/ArrowLeft.tsx
import { SVGProps } from "react";

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
      className="w-6 h-6 text-green-400 hover:text-green-300"
    >
      <path d="M21.3,3.05a1,1,0,0,0-1.12.38S16.94,8.06,12,8.86V6a1,1,0,0,0-1.63-.77L2.74,11.45a2,2,0,0,0,0,3.1l7.63,6.22A1,1,0,0,0,11,21a.94.94,0,0,0,.43-.1A1,1,0,0,0,12,20V16.91C19.36,16.13,22,9.57,22,4A1,1,0,0,0,21.3,3.05Z" />
    </svg>
  );
}
