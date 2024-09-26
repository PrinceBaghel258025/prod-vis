import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HeroSection } from "./HeroSection";
import { useInView } from 'react-intersection-observer';
import { LoadingBox } from "./Scene";

const VideoScreen = ({ header, data, setIsInteracting }) => {

  const [url, setUrl] = useState(null)
  useEffect(() => {
    const videoUrl = data?.find(async (info) => {
      return data?.type === "2d_video"
    });
    setUrl(videoUrl?.image_url)
  }, [])
  // const { ref, inView } = useInView({
  //   threshold: 0.6, onChange: (inView, entry) => {
  //     console.log("value of changing view", header, inView, entry)
  //   }
  //   // triggerOnce: true, // Only trigger once for optimization
  // });

  return (
    <Box position={"relative"} w={"100dvw"} h={"100dvh"}>
    {/* <Box ref={ref} position={"relative"} w={"100dvw"} h={"100dvh"}> */}
      {/* {inView ? */}
       <>
        <Box>
          <video style={{ height: "100dvh", objectFit: 'fill' }}
            src={url}
            // controls
            autoPlay
            loop
            muted
            playsInline
          />
        </Box>
        <HeroSection header={header} setIsBottomSheetOpen={(val) => setIsInteracting(!val)} data={data} isVideo />
      </>
      {/* //  : <LoadingBox /> */}
      {/* } */}
    </Box>
  );
};

export default VideoScreen;
