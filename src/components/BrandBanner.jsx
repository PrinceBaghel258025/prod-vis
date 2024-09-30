import { Image } from "@chakra-ui/react";
import React from "react";

export const BrandBanner = ({ data }) => {
  const brandBanner = data?.find((info) => info.type === "brand_banner");

  return (
    <>
      {brandBanner?.data[0]?.image_url && brandBanner?.isActive ? (
        <Image
          src={brandBanner?.data[0]?.image_url}
          alt="banner"
          position={"absolute"}
          top={0}
          left={0}
          borderTopRightRadius={"18px"}
          borderTopLeftRadius={"18px"}
          zIndex={10}
          h={"4.95rem"}
          w={"100%"}
          objectFit="cover"
        />
      ) : null}
    </>
  );
};
