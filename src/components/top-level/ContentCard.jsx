import React, { useRef } from "react";
import {
  Box,
  IconButton,
  HStack,
  Heading,
  Switch,
  Input,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, DragHandleIcon } from "@chakra-ui/icons";
import MediaPicker from "./MediaPicker";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ContentCard = ({
  id,
  type,
  header,
  data,
  onUpdate,
  content,
  onDelete,
  label,
  url,
  isCarousel = false,
}) => {
  const inputRef = useRef(null);
  const textContentRef = useRef(null);
  const labelRef = useRef(null);
  const urlRef = useRef(null);

  const handleLabelChange = (e) => {
    onUpdate({ label: e.target.value });
  };

  const handleUrlChange = (e) => {
    onUpdate({ url: e.target.value });
  };

  const handleHeaderChange = (e) => {
    onUpdate({ header: e.target.value });
  };

  const handleTextContentChange = (e) => {
    onUpdate({ content: e.target.value });
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

  const mediaTypes = [
    "carousel_360_image",
    "carousel_360_video",
    "brand_banner",
    "carousel_2d_image",
    "carousel_2d_video",
    "image_content",
    "video_content",
  ];

  const contentTypes = [
    "header",
    "text_content",
    "carousel_360_image",
    "carousel_360_video",
  ];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      borderRadius="2xl"
      boxShadow="lg"
      p={4}
      bg={"white"}
      borderLeftWidth={5}
      borderLeftColor={isCarousel ? "lightblue" : "orange"}
    >
      <HStack justifyContent="space-between" mb={4}>
        <HStack>
          <IconButton
            {...attributes}
            {...listeners}
            aria-label="Drag handle"
            icon={<DragHandleIcon />}
            size="sm"
            cursor="grab"
            _active={{ cursor: "grabbing" }}
            bg={"transparent"}
          />
          <Heading size="md">{type}</Heading>
        </HStack>
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
            value={content}
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

      {type === "redirect_url" && (
        <Stack spacing={0}>
          <Box display="flex" alignItems="start" mb={4}>
            <Input
              placeholder="Label"
              size="sm"
              ref={labelRef}
              value={label}
              onChange={handleLabelChange}
            />
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              size="sm"
              ml={2}
              onClick={() => labelRef.current.focus()}
            />
          </Box>

          <Box display="flex" alignItems="start" mb={4}>
            <Input
              placeholder="Enter url"
              size="sm"
              ref={urlRef}
              value={url}
              onChange={handleUrlChange}
              type="url"
            />
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              size="sm"
              ml={2}
              onClick={() => urlRef.current.focus()}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default ContentCard;
