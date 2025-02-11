import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
  rounded?: "small" | "medium" | "large" | "none";
}

const Button = ({
  variant = "primary",
  size = "medium",
  rounded = "medium",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} btn-rounded-${rounded} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;