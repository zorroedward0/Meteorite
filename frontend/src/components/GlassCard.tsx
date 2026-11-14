import type { ReactNode } from "react";

export default function CardGlass({children, className = ""}: {children: ReactNode; className?: string;}) {

  return <div className={`card ${className}`}>{children}</div>;

}
