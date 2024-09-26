import React from "react";
import { IconButton } from "@chakra-ui/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CustomPrevArrow = ({ onClick, isVisible }) => {
  return (
    <IconButton
      icon={<IoIosArrowBack fontSize={25} />}
      onClick={onClick}
      position="absolute"
      top="50%"
      left="10px"
      transform="translateY(-50%)"
      zIndex={1}
      aria-label="Previous Slide"
      opacity={isVisible ? 0.6 : 0}
      transition="opacity 0.5s ease"
      borderRadius={"100%"}
    />
  );
};

const CustomNextArrow = ({ onClick, isVisible }) => {
  return (
    <IconButton
      icon={<IoIosArrowForward fontSize={25} />}
      onClick={onClick}
      position="absolute"
      top="50%"
      right="10px"
      transform="translateY(-50%)"
      zIndex={1}
      aria-label="Next Slide"
      opacity={isVisible ? 0.6 : 0}
      transition="opacity 0.5s ease"
      borderRadius={"100%"}
    />
  );
};

export { CustomPrevArrow, CustomNextArrow };
