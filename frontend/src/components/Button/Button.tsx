import React, { ButtonHTMLAttributes } from "react";

import { clsx } from "../../utils";
import styles from "./styles.module.css";

type Props = {
  children: string | React.ReactNode;
  className?: string;
  color?: "primary" | "secondary";
  onClick?: () => void;
  leftIcon?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  children,
  className = "",
  color = "primary",
  onClick,
  leftIcon,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx([
        styles.base,
        styles[color],
        className,
        leftIcon ? "gap-2" : "",
        props.disabled ? "cursor-not-allowed !bg-[#9E9E9E]" : "cursor-pointer",
      ])}
      onClick={onClick}
    >
      {leftIcon}
      {children}
    </button>
  );
};
