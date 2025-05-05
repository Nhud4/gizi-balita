import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

import ICONS from "../../configs/icons";
import { clsx } from "../../utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  labelStatus?: string[];
  onDelete?: () => void;
  onDetail?: () => void;
  onEdit?: () => void;
  status?: "active" | "inactive";
  value: string | React.ReactNode;
  variant?: "success" | "info";
};

export const Popup: React.FC<Props> = ({
  value,
  className,
  onDetail,
  onEdit,
  onDelete,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const Popupref = useRef<HTMLDivElement>(null);
  const openModal = () => {
    setShowModal(!showModal);
  };
  const CloseDot = () => {
    setShowModal(false);
  };
  const ClosePopUp = (event: MouseEvent) => {
    if (Popupref.current && !Popupref.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("click", ClosePopUp);
    } else {
      document.removeEventListener("click", ClosePopUp);
    }

    return () => {
      document.removeEventListener("click", ClosePopUp);
    };
  }, [showModal]);
  return (
    <div
      {...props}
      ref={Popupref}
      className={clsx([
        "flex items-center justify-between w-full",
        className as string,
      ])}
    >
      <div className="w-[60%]">{value}</div>
      <button
        className="flex items-center justify-center rounded-full shadow-lg w-7 h-7 cursor-pointer"
        onClick={openModal}
      >
        <ICONS.Dote width={20} height={20} />
      </button>
      <div onClick={CloseDot}>
        {showModal ? (
          <div className="absolute z-10 flex justify-center bg-white rounded-md shadow-2xl right-8 top-12 w-36 border border-[#E5E5E5]">
            <div className="grid w-36">
              <div>
                <button
                  className="flex items-center w-full py-2 text-black cursor-pointer"
                  onClick={onDetail}
                >
                  <ICONS.Eye className="mx-2" width={20} height={20} />
                  Lihat
                </button>
              </div>
              <span className="border-b-[1px] border-solid border-[#E5E5E5] w-full" />

              <div>
                <button
                  className="flex items-center w-full py-2 text-black cursor-pointer"
                  onClick={onEdit}
                >
                  <ICONS.Edit className="mx-2" width={20} height={20} />
                  Ubah
                </button>
              </div>
              <span className="border-b-[1px] border-solid border-[#E5E5E5] w-full" />

              <div>
                <button
                  className="flex items-center w-full py-2 text-[#D62A24] cursor-pointer"
                  onClick={onDelete}
                >
                  <ICONS.Trash
                    className="mx-2"
                    width={20}
                    height={20}
                    style={{ fill: "#D62A24" }}
                  />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
