import React from "react";
import IMAGES from "../../configs/images";
import { useLocation } from "react-router-dom";

type Props = {
  title?: string;
};

export const Header: React.FC<Props> = ({ title }) => {
  const { pathname } = useLocation();
  const splitPath = pathname.split("/").filter((path) => ![""].includes(path));

  return (
    <div className="flex justify-between items-center px-4 h-20">
      <div>
        <div className="flex items-center space-x-1 text-sm text-[#707EAE]">
          <p>Page</p>
          {splitPath.length > 0 &&
            splitPath.map((item) => (
              <>
                <p>/</p>
                <p className="capitalize">{item.split("-").join(" ")}</p>
              </>
            ))}

          {splitPath.length === 0 && (
            <>
              <p>/</p>
              <p>Dahsboard</p>
            </>
          )}
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center space-x-4 py-3 pr-3 pl-6 rounded-full bg-white shadow-lg text-sm">
        <h1 className="font-semibold">Admin Satu</h1>
        <img src={IMAGES.Avatar} alt="avatar" />
      </div>
    </div>
  );
};
