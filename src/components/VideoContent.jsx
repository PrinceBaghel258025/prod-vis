"use client";

import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoContent = ({ media }) => {
  const splitMedia = (media) => {
    const videos = media?.filter((item) => item.endsWith(".mp4"));
    return { videos };
  };

  const { videos } = splitMedia(media);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      {videos?.length === 1 ? (
        <Flex borderRadius={"1rem"}>
          <video
            style={{
              borderRadius: "0.5rem",
            }}
            src={videos[0]}
            controls
            autoPlay
            loop
            muted
            playsInline
          />
          <Text w={"16rem"} h={"9rem"} display={"none"} />
        </Flex>
      ) : (
        <HStack as={Slider} {...settings} width={"100%"} my={3}>
          {videos?.map((video) => (
            <Flex key={video} borderRadius={"1rem"}>
              <video
                style={{
                  borderRadius: "0.5rem",
                }}
                src={video}
                controls
                autoPlay
                loop
                muted
                playsInline
              />
              <Text w={"16rem"} h={"9rem"} display={"none"} />
            </Flex>
          ))}
        </HStack>
      )}
    </>
  );
};

export default VideoContent;
