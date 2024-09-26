import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const BusinessPartner = ({ partner }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
  };
  return (
    <>
      <Flex w={"100%"} justifyContent={"center"}>
        {partner?.length === 1 ? (
          <Flex
            direction={"column"}
            alignItems={"center"}
            textAlign={"center"}
            w={"fit-content"}
            color={"black"}
            gap={1}
          >
            <Flex
              w={20}
              h={20}
              overflow={"auto"}
              borderRadius={"5rem"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                w={"100%"}
                // aspectRatio={"3/2"}
                objectFit={"contain"}
                src={partner[0]?.image_url}
                alt="profile"
              />
            </Flex>
            <Text mb={0} fontSize={"small"}>
              {partner[0]?.name}
            </Text>
          </Flex>
        ) : (
          <HStack as={Slider} {...settings} width={"100%"} my={3}>
            {partner?.map((item) => (
              <Flex
                direction={"column"}
                alignItems={"center"}
                textAlign={"center"}
                w={"fit-content"}
                color={"black"}
                gap={1}
                key={item?.id}
              >
                <Flex
                  w={20}
                  h={20}
                  overflow={"auto"}
                  borderRadius={"5rem"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    w={"100%"}
                    // aspectRatio={"3/2"}
                    objectFit={"contain"}
                    src={item?.image_url}
                    alt="profile"
                  />
                </Flex>
                <Text mb={0} fontSize={"small"}>
                  {item?.name}
                </Text>
              </Flex>
            ))}
          </HStack>
        )}
      </Flex>
    </>
  );
};
