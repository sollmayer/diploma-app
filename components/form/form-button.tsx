"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface IFormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "outline"
      | "ghost"
      | "link"
      | "primary";
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant = "primary",
  }: IFormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
          type="submit"
          size={"sm"}
          variant={variant}
          disabled={disabled || pending}
          className={className}
        >
          {children}
        </Button>
    );
}