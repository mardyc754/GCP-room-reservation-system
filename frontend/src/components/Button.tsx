import { ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "./ui/button";

export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <ShadcnButton
      {...props}
      // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </ShadcnButton>
  );
};
