import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
  title?: string;
  withSidebar?: boolean;
};

export const Layout: React.FC<Props> = ({ title, withSidebar, children }) => {
  return (
    <div>
      {withSidebar ? <Sidebar /> : null}
      <main className="pl-[240px]">
        <Header title={title} />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};
