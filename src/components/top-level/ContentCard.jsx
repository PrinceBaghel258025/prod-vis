import React, { useRef } from "react";
import {
  Box,
  IconButton,
  HStack,
  Heading,
  Switch,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import MediaPicker from "./MediaPicker";

const ContentCard = ({
  id,
  type,
  header,
  data,
  onUpdate,
  text_content,
  onDelete,
}) => {
  const inputRef = useRef(null);
  const textContentRef = useRef(null);

  const handleHeaderChange = (e) => {
    onUpdate({ header: e.target.value });
  };

  const handleTextContentChange = (e) => {
    onUpdate({ text_content: e.target.value });
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

  const mediaTypes = ["360_image", "360_video", "media_content", "banner"];

  const contentTypes = ["header", "text_content"];

  return (
    <Box borderRadius="2xl" boxShadow="lg" p={4} bg={"white"}>
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

      {contentTypes.includes(type) && (
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

      {type === "text_content" && (
        <Box display="flex" alignItems="start" mb={4}>
          <Textarea
            placeholder="text content"
            size="sm"
            ref={textContentRef}
            value={text_content}
            onChange={handleTextContentChange}
            height="100px"
          />
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            size="sm"
            ml={2}
            onClick={() => textContentRef.current.focus()}
          />
        </Box>
      )}

      {mediaTypes.includes(type) && (
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
