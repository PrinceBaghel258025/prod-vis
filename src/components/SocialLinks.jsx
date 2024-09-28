import React from "react";
import { Flex, Link, Icon } from "@chakra-ui/react";
import {
  FaYoutube,
  FaAmazon,
  FaFacebookSquare,
  FaPinterest,
  FaShopify,
} from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

const initialSocialIcons = [
  { icon: FaYoutube, color: "#ce1312", name: "Youtube" },
  { icon: FaAmazon, color: "black", name: "Amazon" },
  { icon: FaFacebookSquare, color: "#4460A0", name: "Facebook" },
  { icon: FaPinterest, color: "#cc2127", name: "Pinterest" },
  { icon: FaShopify, color: "#81bf37", name: "Shopify" },
  { icon: IoLogoInstagram, color: "#d62da6", name: "Instagram" },
];

export const SocialLinks = ({ socialLinks }) => {
  console.log("socialLinks:", socialLinks);

  const getIconComponent = (label) => {
    const iconInfo = initialSocialIcons.find(
      (icon) => icon.name.toLowerCase() === label.toLowerCase()
    );
    return iconInfo ? iconInfo.icon : null;
  };

  return (
    <Flex justifyContent={"center"} gap={1}>
      {socialLinks?.map((link) => {
        const IconComponent = getIconComponent(link.label);
        return (
          <Link
            href={link?.url}
            isExternal
            key={link?.id}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={"0.5px solid lightgray"}
            borderRadius={"100%"}
            p={1}
          >
            {IconComponent && (
              <Icon
                as={IconComponent}
                w="100%"
                h="100%"
                color={
                  initialSocialIcons.find(
                    (icon) =>
                      icon.name.toLowerCase() === link.label.toLowerCase()
                  )?.color
                }
              />
            )}
          </Link>
        );
      })}
    </Flex>
  );
};

export default SocialLinks;
