import { InputHTMLAttributes, useState } from "react";

import ICONS from "../../configs/icons";
import { clsx } from "../../utils";

type Props = {
  label?: string;
  isRequired?: boolean;
  errMessage?: string;
} & InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement>;

export const PasswordInput = ({
  label,
  isRequired,
  errMessage,
  ...props
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <h1 className="text-left font-medium">
        {label}
        {isRequired ? <span>*</span> : null}
      </h1>
      <div
        className={clsx([
          "relative border px-4 py-3 rounded-md",
          "focus-within:outline focus-within:outline-[#108a4a]",
          errMessage ? "border-red-500" : "border-[#E5E5E5]",
        ])}
      >
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full rounded-md outline-none"
        />

        <button
          className="absolute right-4 cursor-pointer"
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <ICONS.EyeCross
              width={25}
              height={25}
              style={{ fill: "#AE9292 " }}
            />
          ) : (
            <ICONS.Eye width={25} height={25} style={{ fill: "#AE9292 " }} />
          )}
        </button>
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
