import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { HeroSection } from "./HeroSection";

const ImageScreen = ({ header, data, setIsInteracting }) => {
  const imageUrl = data?.find((info) => info?.type === "carousel_2d_image");

  return (
    <Box position={"relative"} h={"80dvh"} overflow={"hidden"}>
      <Stack overflow={"hidden"}>
        {imageUrl?.image_url && (
          <Image
            src={imageUrl?.image_url}
            height={"35.5rem"}
            objectFit={"fill"}
            alt="img"
          />
        )}
      </Stack>
      <HeroSection
        header={header}
        setIsBottomSheetOpen={(val) => setIsInteracting(!val)}
        data={data}
        isImage
      />
    </Box>
  );
};

export default ImageScreen;
