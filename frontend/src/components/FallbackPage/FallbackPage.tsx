import React from "react";
import IMAGES from "../../configs/images";

export const FallbackPage: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <img src={IMAGES.Waiting} alt="waiting" style={{ width: "400px" }} />

      <h1 className="text-3xl">Please wait...</h1>
    </section>
  );
};
