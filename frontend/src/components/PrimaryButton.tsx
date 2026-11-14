import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function PrimaryButton({ children, ...props }: Props) {

  return (
    <button className="primary-button" {...props}>
      {children}
    </button>
  );

}
