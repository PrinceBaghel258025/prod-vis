import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { HeroSection } from "./HeroSection";

const VideoScreen = ({ header, data, setIsInteracting }) => {
  const videoUrl = data?.find((info) => info?.type === "carousel_2d_video");

  return (
    <Box position={"relative"} width={"fit-content"} h={"80dvh"}>
      {videoUrl?.image_url && (
        <Stack overflow={"hidden"}>
          <video
            style={{
              height: "35.5rem",
              objectFit: "fill",
            }}
            src={videoUrl?.image_url}
            // controls
            autoPlay
            loop
            muted
            playsInline
          />
        </Stack>
      )}
      <HeroSection
        header={header}
        setIsBottomSheetOpen={(val) => setIsInteracting(!val)}
        data={data}
        isVideo
      />
    </Box>
  );
};

export default VideoScreen;
