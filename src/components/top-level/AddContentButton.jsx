import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddContentButton = ({ onAdd, contents }) => {
  const includes360 = contents?.some(
    (con) => con?.type === "360_image" || con?.type === "360_video"
  );

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Add content"
        icon={<AddIcon />}
        colorScheme="teal"
        size="lg"
        isRound
      />
      <MenuList>
        {!includes360 && (
          <>
            <MenuItem onClick={() => onAdd("360_image")}>360° Image</MenuItem>
            <MenuItem onClick={() => onAdd("360_video")}>360° Video</MenuItem>
          </>
        )}
        <MenuItem onClick={() => onAdd("header")}>Header</MenuItem>
        <MenuItem onClick={() => onAdd("text_content")}>Text Content</MenuItem>
        <MenuItem onClick={() => onAdd("media_content")}>
          Media Content
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AddContentButton;
