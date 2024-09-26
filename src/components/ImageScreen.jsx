import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { HeroSection } from "./HeroSection";

const ImageScreen = ({header, data, setIsInteracting }) => {
  const imageUrl = data?.find((info) => info?.type === "2d_image");

  return (
    <Box position={"relative"} w={"100dvw"} h={"100dvh"} >
      <Box
        backgroundImage={imageUrl?.image_url}
        backgroundSize={"cover"}
        backgroundColor={"pink"}
        height={"100%"}
        width={"100%"}
      ></Box>
      <HeroSection header={header} setIsBottomSheetOpen={(val) => setIsInteracting(!val)} data={data} isImage />
    </Box>
  );
};

export default ImageScreen;
