import { Image } from "@chakra-ui/react";
import React from "react";

export const BrandBanner = ({ data }) => {
  const brandBanner = data?.find((info) => info.type === "brand_banner");

  return (
    <>
      {brandBanner ? (
        <Image
          src={brandBanner?.brand_banner}
          alt="banner"
          position={"absolute"}
          top={0}
          left={0}
          borderTopRightRadius={"18px"}
          borderTopLeftRadius={"18px"}
          zIndex={10}
        />
      ) : null}
    </>
  );
};
