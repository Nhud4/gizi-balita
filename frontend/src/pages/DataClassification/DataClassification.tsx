import React from "react";

import Layout from "../../components/Layout";
import ClassificationList from "../../features/Classification/ClassificationList";
import Counting from "../../features/Classification/Counting";
import SyntheticList from "../../features/Classification/SyntheticList";
import TotalAllData from "../../features/Classification/TotalAllData";
import TotalData from "../../features/Classification/TotalData";
import FormCalculation from "../../form/FormCalculation";
import { useAppSelector } from "../../redux/hooks";

export const DataClassification: React.FC = () => {
  const { data } = useAppSelector((state) => state.data.add);

  return (
    <Layout withSidebar title="Data Kalasifikasi">
      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <FormCalculation />
          </div>

          <Counting data={data?.payload} />
        </div>

        <ClassificationList data={data?.neighbor} />

        {data ? (
          <>
            <SyntheticList data={data} />

            <div className="grid grid-cols-2 gap-5">
              <TotalData data={data} />
              <TotalAllData data={data} />
            </div>
          </>
        ) : null}
      </section>
    </Layout>
  );
};
