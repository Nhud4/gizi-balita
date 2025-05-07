import React from "react";

import Layout from "../../components/Layout";
import ClassificationList from "../../features/Classification/ClassificationList";
import Counting from "../../features/Classification/Counting";
import FormCalculation from "../../form/FormCalculation";
import { useAppSelector } from "../../redux/hooks";

export const DataClassification: React.FC = () => {
  const { data } = useAppSelector((state) => state.data.add);

  console.log(data);

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
      </section>
    </Layout>
  );
};
