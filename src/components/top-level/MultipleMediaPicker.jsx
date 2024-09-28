import React, { useCallback, useState } from "react";
import {
  Box,
  Image,
  VStack,
  HStack,
  IconButton,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";

const MultipleMediaPicker = ({ type, dataList, onImagesChange, onDeleteImage }) => {
  console.log("from media picker data", type, dataList);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles
        .filter(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("video/")
        )
        .map((file) => URL.createObjectURL(file));
      onImagesChange([...newImages]);
    },
    [dataList, onImagesChange]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: [
      "carousel_360_image",
      "brand_banner",
      "carousel_2d_image",
      "image_content",
    ].some((t) => t === type)
      ? {
        "image/jpeg": [],
        "image/png": [],
      }
      : {
        "video/mp4": [],
        "video/mov": [],
      },
    noClick: true,
    noKeyboard: true,
  });

  const removeImage = (id) => {
    onDeleteImage(id);
    // onImagesChange(dataList.filter((_, i) => i !== index));
  };

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {dataList.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {dataList.map((image, index) => (
            <Box key={image?.id} position="relative">
              {image?.type === "video_content" ? <video
                src={image?.image_url}
                alt={`Selected media ${index + 1}`}
              // borderRadius="md"
              /> : <Image
                src={image?.image_url}
                alt={`Selected media ${index + 1}`}
                borderRadius="md"
              />}
              <IconButton
                aria-label="Remove image"
                icon={<CloseIcon />}
                size="sm"
                position="absolute"
                top={2}
                right={2}
                onClick={() => removeImage(image?.id)}
              />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <VStack
          borderWidth={2}
          borderStyle="dashed"
          borderRadius="md"
          p={4}
          spacing={2}
          alignItems="center"
          cursor="pointer"
          onClick={open}
        >
          <IconButton aria-label="Add media" icon={<AddIcon />} size="lg" />
          <Text>
            Click to add {type === "360° Image" ? "a 360° image" : "media"}
          </Text>
        </VStack>
      )}
      <HStack mt={4} justifyContent="flex-end">
        <IconButton
          aria-label="Add more"
          icon={<AddIcon />}
          size="sm"
          onClick={open}
        />
      </HStack>
    </Box>
  );
};

export default MultipleMediaPicker;
