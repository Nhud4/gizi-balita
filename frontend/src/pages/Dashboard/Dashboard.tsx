import React, { JSX } from "react";
import Layout from "../../components/Layout";
import Summary from "../../features/Dashboard/Summary";

export const Dashboard: React.FC = (): JSX.Element => {
  return (
    <Layout withSidebar title="Dashboard">
      <Summary />
    </Layout>
  );
};
