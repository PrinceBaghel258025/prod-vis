import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
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
        <MenuItem onClick={() => onAdd("banner")} gap={2}>
          Banner <Tag borderRadius={10}>Sheet</Tag>
        </MenuItem>
        <MenuItem onClick={() => onAdd("header")} gap={2}>
          Header <Tag borderRadius={10}>Sheet</Tag>
        </MenuItem>
        <MenuItem onClick={() => onAdd("text_content")} gap={2}>
          Text Content <Tag borderRadius={10}>Sheet</Tag>
        </MenuItem>
        <MenuItem onClick={() => onAdd("media_content")} gap={2}>
          Media Content <Tag borderRadius={10}>Sheet</Tag>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AddContentButton;
