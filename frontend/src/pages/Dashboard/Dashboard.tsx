import React, { JSX } from "react";

import Layout from "../../components/Layout";
import ChartAge from "../../features/Dashboard/ChartAge";
import ChartGizi from "../../features/Dashboard/ChartGizi";
import PercentageGender from "../../features/Dashboard/PercentageGender";
import PercentageGizi from "../../features/Dashboard/PercentageGizi";
import Summary from "../../features/Dashboard/Summary";

export const Dashboard: React.FC = (): JSX.Element => {
  return (
    <Layout withSidebar title="Dashboard">
      <section className="grid gap-6">
        <Summary />

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <ChartGizi />
          </div>
          <PercentageGizi />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <ChartAge />
          </div>
          <PercentageGender />
        </div>
      </section>
    </Layout>
  );
};
