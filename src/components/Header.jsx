import { Text } from "@chakra-ui/react";
import React from "react";

export const Header = ({ headerTitle }) => {
  return (
    <Text fontSize={"medium"} fontWeight={"semibold"} w={"100%"} bg={"white"}>
      {headerTitle}
    </Text>
  );
};
