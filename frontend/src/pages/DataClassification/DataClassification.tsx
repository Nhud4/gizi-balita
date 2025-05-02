import React from "react";

import Layout from "../../components/Layout";
import ClassificationList from "../../features/Classification/ClassificationList";
import Counting from "../../features/Classification/Counting";
import FormCalculation from "../../form/FormCalculation";

export const DataClassification: React.FC = () => {
  return (
    <Layout withSidebar title="Data Kalasifikasi">
      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <FormCalculation />
          </div>

          <Counting />
        </div>

        <ClassificationList />
      </section>
    </Layout>
  );
};
