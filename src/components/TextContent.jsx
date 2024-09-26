import { Stack, Text } from "@chakra-ui/react";
import React from "react";

export const TextContent = ({ textContent }) => {
  return (
    <>
      <Stack spacing={2}>
        <Text fontSize={"medium"} fontWeight={600}>
          {textContent?.name}
        </Text>

        <Text fontSize={"small"} align={"justify"}>
          {textContent?.content}
        </Text>
      </Stack>
    </>
  );
};
