import React, { JSX } from "react";
import Layout from "../../components/Layout";

export const Dashboard: React.FC = (): JSX.Element => {
  return (
    <Layout withSidebar title="Dashboard">
      <h1>Halaman Dashboard</h1>
    </Layout>
  );
};
