import { Flex, HStack, Image, Stack } from "@chakra-ui/react";
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
      <Flex justifyContent={"center"} mb={3}>
        {partner?.length === 1 ? (
          <Image
            src={partner[0]?.image_url}
            alt={`img`}
            width="3.5rem"
            height="3.5rem"
            objectFit="cover"
            borderRadius="full"
            boxShadow={"md"}
          />
        ) : (
          <HStack as={Slider} {...settings} width={"100%"} my={3} spacing={2}>
            {partner?.map((item) => {
              return (
                <Stack>
                  <Image
                    src={item?.image_url}
                    alt={`img`}
                    width="3.5rem"
                    height="3.5rem"
                    objectFit="cover"
                    borderRadius="full"
                    boxShadow={"md"}
                  />
                </Stack>
              );
            })}
          </HStack>
        )}
      </Flex>
    </>
  );
};
