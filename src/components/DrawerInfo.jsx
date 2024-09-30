"use client";

import React from "react";
import { Header } from "./Header";
import { TextContent } from "./TextContent";
import { ImageContent } from "./ImageContent";
import { SocialLinks } from "./SocialLinks";
import { Image, Stack, Text } from "@chakra-ui/react";
import RedirectButton from "./RedirectButton";
import VideoContent from "./VideoContent";
import { BusinessPartner } from "./BusinessPartner";

export const DrawerInfo = ({ data }) => {
  return (
    <Stack
      zIndex={100}
      p={3}
      overflowY={"scroll"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      justifyContent={"space-between"}
      mt={"4.5rem"}
      spacing={1}
    >
      {data?.length > 0
        ? data?.map((info) => {
            switch (info?.type) {
              case "header":
                return <Header key={info?.id} headerTitle={info?.header} />;
              case "text_content":
                return (
                  <TextContent
                    key={info?.id}
                    header={info?.header}
                    content={info?.content}
                  />
                );
              case "image_content":
                return (
                  <ImageContent
                    key={info?.id}
                    //  media={info?.image_urls}
                    media={info?.data}
                  />
                );
              case "partners":
                return <BusinessPartner key={info?.id} partner={info?.data} />;
              case "video_content":
                return <VideoContent key={info?.id} media={info?.data} />;
              case "redirect_url":
                return <RedirectButton key={info?.id} link={info} />;
              case "social_links":
                return (
                  <SocialLinks
                    key={info?.id}
                    socialLinks={info?.social_links}
                  />
                );
              default:
                return null;
            }
          })
        : null}

      <Text
        display={"inline-flex"}
        alignItems={"center"}
        gap={2}
        w={"100%"}
        justifyContent={"center"}
        fontSize={10}
      >
        Powered by
        <a href="https://agspert.com/" target="_blank">
          <Image
            h={"1rem"}
            src="https://360-images-v1.s3.ap-south-1.amazonaws.com/Logo_agspeak.png"
            alt="logo"
          />
        </a>
      </Text>
    </Stack>
  );
};
