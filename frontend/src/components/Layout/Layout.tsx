import React from "react";

import Header from "../Header";
import Sidebar from "../Sidebar";

type Props = {
  children: React.ReactNode;
  title?: string;
  withSidebar?: boolean;
};

export const Layout: React.FC<Props> = ({ title, withSidebar, children }) => {
  return (
    <div>
      {withSidebar ? <Sidebar /> : null}
      <main>
        <Header title={title} />
        <div className="pl-[256px] pb-8 pr-4 pt-[104px]">{children}</div>
      </main>
    </div>
  );
};
