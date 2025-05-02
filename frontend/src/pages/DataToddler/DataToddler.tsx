import React from "react";

import Layout from "../../components/Layout";
import ListData from "../../features/Data/ListData";

export const DataToddler: React.FC = () => {
  return (
    <Layout withSidebar title="Data Balita">
      <ListData />
    </Layout>
  );
};
