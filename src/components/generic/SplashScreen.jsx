import { Flex, Text } from "@chakra-ui/react";
import {Image} from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import AgSpeakLogo from "../../../public/agspeak_logo.png";

export const SplashScreen = ({ inScene = false }) => {
  const [display, setDisplay] = useState("flex");

  useEffect(() => {
    const splashScreenTimer = setTimeout(() => {
      setDisplay("none");
    }, 1500);

    return () => {
      clearTimeout(splashScreenTimer);
    };
  }, []);

  return (
    <Flex
      backgroundColor={"#00B894"}
      h={"100dvh"}
      w={"100dvw"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      position={inScene ? "absolute" : "relative"}
      top={0}
      left={0}
      zIndex={inScene && "100000000"}
      display={inScene ? display : "flex"}
    >
      <Image src={AgSpeakLogo} alt="logo" width={250} />

      <Text position={"absolute"} bottom={65} color={"white"} fontSize={15}>
        © AgSpert Technologies Pvt. Ltd.
      </Text>
    </Flex>
  );
};
