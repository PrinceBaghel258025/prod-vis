import { Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const RedirectButton = ({ link }) => {
  const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(0, 184, 148, 0.7); }
    50% { box-shadow: 0 0 0 15px rgba(0, 184, 148, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 184, 148, 0); }
  `;
  return (
    <a
      href={link?.url}
      style={{ width: "100%" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        bg={"#00B894"}
        w={"100%"}
        color={"white"}
        borderRadius={50}
        sx={{
          animation: `${pulse} 2s infinite`,
        }}
      >
        {link?.label}
      </Button>
    </a>
  );
};

export default RedirectButton;
