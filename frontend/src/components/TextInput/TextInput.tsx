import { InputHTMLAttributes } from "react";

import { clsx } from "../../utils";

type Props = {
  label?: string;
  isRequired?: boolean;
  onlyNumber?: boolean;
  onlyLetter?: boolean;
  withoutSpecialCharacter?: boolean;
  upperCase?: boolean;
  errMessage?: string;
  prefix?: string;
  integer?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement>;

export const TextInput = ({
  label,
  isRequired,
  onlyNumber,
  onlyLetter,
  withoutSpecialCharacter,
  upperCase,
  errMessage,
  prefix,
  integer,
  ...props
}: Props) => {
  function transFormValue<E>(event: React.ChangeEvent<E>) {
    const target = event.target as unknown as Record<string, unknown>;
    const value = target.value as string;
    if (onlyNumber) {
      return {
        ...event,
        target: {
          ...event.target,
          value: integer
            ? value.replace(/[^0-9]/g, "")
            : value.replace(/[^\d.]/g, ""),
        },
      };
    }
    if (onlyLetter) {
      return {
        ...event,
        target: {
          ...event.target,
          value: value.replace(/[^a-zA-Z. ]/g, ""),
        },
      };
    }
    if (withoutSpecialCharacter) {
      return {
        ...event,
        target: {
          ...event.target,
          value: value.replace(/[^a-zA-Z0-9]/g, ""),
        },
      };
    }
    if (upperCase) {
      return {
        ...event,
        target: {
          ...event.target,
          value: value.toUpperCase(),
        },
      };
    }
    return event;
  }

  return (
    <div className="space-y-1">
      <h1 className="text-sm text-left font-medium">
        {label}
        {isRequired ? <span>*</span> : null}
      </h1>
      <div
        className={clsx([
          "flex items-center gap-2 border px-4 py-3 rounded-md",
          "focus-within:outline focus-within:outline-[#108a4a]",
          errMessage ? "border-red-500" : "border-[#E5E5E5]",
          props.disabled ? "bg-[#F2F2F2]" : "",
        ])}
      >
        <input
          {...props}
          type="text"
          className="text-sm w-full outline-none"
          onChange={(e) => {
            if (props.onChange) {
              props.onChange(transFormValue(e));
            }
          }}
        />
        {prefix ? <p className="text-sm font-semibold">{prefix}</p> : null}
      </div>
      {errMessage ? (
        <p
          className="text-left text-sm text-red-500"
          style={{ transform: "skew(-10deg)" }}
        >
          {errMessage}
        </p>
      ) : null}
    </div>
  );
};
