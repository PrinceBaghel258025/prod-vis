import React, { useRef } from "react";
import {
  Box,
  IconButton,
  HStack,
  Heading,
  Switch,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import MediaPicker from "./MediaPicker";

const ContentCard = ({ id, type, header, data, onUpdate, onDelete }) => {
  const inputRef = useRef(null);

  const handleHeaderChange = (e) => {
    onUpdate({ header: e.target.value });
  };

  const handleMediaChange = (newMedia) => {
    onUpdate({
      data: [
        {
          ...data[0],
          image_url: newMedia[0],
        },
      ],
    });
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Heading size="md">{type}</Heading>
        <HStack>
          <IconButton
            onClick={onDelete}
            aria-label="Delete"
            icon={<DeleteIcon />}
            size="sm"
          />
          <Switch
            size="sm"
            onChange={() => onUpdate({ isActive: !data[0]?.isActive })}
          />
        </HStack>
      </HStack>

      {type === "header" && (
        <Box display="flex" alignItems="center" mb={4}>
          <Input
            placeholder="Header"
            size="sm"
            ref={inputRef}
            value={header}
            onChange={handleHeaderChange}
          />
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            size="sm"
            ml={2}
            onClick={() => inputRef.current.focus()}
          />
        </Box>
      )}

      {type === "360_image" && (
        <MediaPicker
          type={type}
          selectedImages={data[0]?.image_url ? [data[0].image_url] : []}
          onImagesChange={handleMediaChange}
        />
      )}

      {type === "360_video" && (
        <MediaPicker
          type={type}
          selectedImages={data[0]?.image_url ? [data[0].image_url] : []}
          onImagesChange={handleMediaChange}
        />
      )}

      {type === "media_content" && (
        <MediaPicker
          type={type}
          selectedImages={data[0]?.image_url ? [data[0].image_url] : []}
          onImagesChange={handleMediaChange}
        />
      )}
    </Box>
  );
};

export default ContentCard;
