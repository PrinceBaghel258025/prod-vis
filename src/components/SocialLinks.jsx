import { Flex, Image, Link } from "@chakra-ui/react";
import React from "react";

export const SocialLinks = ({ socialLinks }) => {
  return (
    <Flex justifyContent={"center"} gap={3}>
      {socialLinks?.map((link) => (
        <Link
          href={link?.url}
          isExternal
          key={link?.url}
          w={"1.5rem"}
          h={"1.5rem"}
        >
          <Image
            borderRadius={100}
            w={"100%"}
            h={"100%"}
            src={link?.thumbnail}
            alt="thumbnail"
          />
        </Link>
      ))}
    </Flex>
  );
};
