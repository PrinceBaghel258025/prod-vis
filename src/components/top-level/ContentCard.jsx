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
  Text,
  Icon,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, DragHandleIcon } from "@chakra-ui/icons";
import MediaPicker from "./MediaPicker";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaYoutube } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { nanoid } from "nanoid";
import MultipleMediaPicker from "./MultipleMediaPicker";

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


  const handleMultipleMediaChange = (newMedia, type) => {
    console.log("new media", newMedia)
    onUpdate({
      data: [
        ...data,
        {
          id: nanoid(),
          type,
          image_url: newMedia[0],
        },
      ],
    });
  };
  
  const handleChangeOrder = (newOrder) => {
    onUpdate({
      data: newOrder,
    });
  };


  const handleDeleteImage = (id) => {
    onUpdate({
      data: data.filter((image) => image.id !== id),
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
  const multipleMediaTypes = [
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

        <HStack spacing={5}>
          <IconButton
            onClick={onDelete}
            aria-label="Delete"
            icon={<DeleteIcon />}
            size="md"
            borderRadius={"100%"}
          />
          <Switch
            size="md"
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
            borderRadius={50}
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
            borderRadius={10}
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

      {mediaTypes.includes(type) ?
        multipleMediaTypes.includes(type) ?
          (
            <MultipleMediaPicker
              type={type}
              dataList={data}
              onImagesChange={(newMedia) => handleMultipleMediaChange(newMedia, type)}
              onDeleteImage={handleDeleteImage}
              changeOrder={handleChangeOrder}
            />
          ) :
          (
            <MediaPicker
              type={type}
              selectedImages={data[0]?.image_url ? [data[0].image_url] : []}
              onImagesChange={handleMediaChange}
            />
          ) : null}

      {type === "redirect_url" && ( //TODO: check if url is correct through regex
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
              placeholder="Enter url: https://agspert.com/"
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

      {type === "social_links" && ( //TODO: make a component for this
        <Stack mx={10} my={5}>
          <HStack
            bg={"#EAEAEA"}
            padding={3}
            w={"fit-content"}
            borderRadius={50}
            spacing={5}
          >
            <SocialIcon icon={FaYoutube} color={"#ce1312"} />
            <SocialIcon icon={FaAmazon} color={"black"} />
            <SocialIcon icon={FaFacebookSquare} color={"#4460A0"} />
            <SocialIcon icon={FaPinterest} color={"#cc2127"} />
            <SocialIcon icon={FaShopify} color={"#81bf37"} />
            <SocialIcon icon={IoLogoInstagram} color={"#d62da6"} />
          </HStack>

          <Stack mt={3}>
            <HStack>
              <Icon
                as={FaYoutube}
                color={"#ce1312"}
                fontSize={35}
                bg={"white"}
                p={1}
                borderRadius={"100%"}
                cursor={"pointer"}
                border={"1px solid #E2E8F0"}
              />
              <Input
                placeholder="Youtube"
                size="sm"
                ref={inputRef}
                value={header}
                onChange={() => { }}
                borderRadius={50}
              />
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                onClick={() => textContentRef.current.focus()}
              />
              <IconButton
                onClick={() => { }}
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                borderRadius={5}
              />
            </HStack>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

const SocialIcon = ({ icon, color }) => {
  return (
    <Icon
      as={icon}
      color={color}
      fontSize={50}
      bg={"white"}
      p={1}
      borderRadius={"100%"}
      cursor={"pointer"}
    />
  );
};

export default ContentCard;
