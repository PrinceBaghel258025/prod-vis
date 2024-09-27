import { Stack, Text } from "@chakra-ui/react";
import React from "react";

export const TextContent = ({ header, content }) => {
  return (
    <>
      <Stack spacing={2}>
        <Text fontSize={"medium"} fontWeight={600}>
          {header}
        </Text>

        <Text fontSize={"small"} align={"justify"}>
          {content}
        </Text>
      </Stack>
    </>
  );
};
