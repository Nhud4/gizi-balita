import { clsx } from "../../utils";
import styles from "./styles.module.css";

type Props = {
  customColor?: string;
  size?: "small" | "medium" | "large";
  type?: "primary" | "secondary";
};

export const Spinner = ({
  size = "small",
  type = "primary",
  customColor,
}: Props) => {
  return (
    <span
      className={clsx([styles[size], styles[type], customColor as string])}
    />
  );
};
