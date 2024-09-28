import React, { useState, useMemo } from "react";
import { VStack, Box, Stack, Text, Tag } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import AddContentButton from "./AddContentButton";
import { nanoid } from "nanoid";
import CarouselComponent from "../CarouselComponent";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";


const ContentBuilder = () => {
  const [contents, setContents] = useState([]);
  const [sheetData, setSheetData] = useState([]);

  const template = {
    text_content: {
      header: "",
      content: "",
    },
    image_content: {
      image_urls: [],
    },
    video_content: {
      video_urls: [],
    },
    header: {
      header: "",
    },
    brand_banner: "",
    redirect_url: {
      url: "",
      label: "",
    },
    social_links: {
      social_links: [
        {
          url: "",
          label: "",
          thumbnail: "",
        },
      ],
    },
  };

  const addContent = (type) => {
    if (["carousel_360_image", "carousel_360_video", "carousel_2d_image", "carousel_2d_video"].includes(type)) {
      setContents([
        ...contents,
        {
          id: nanoid(),
          type,
          header: "",
          data: [
            {
              id: nanoid(),
              type,
              image_url: "",
            },
          ],
        },
      ]);
      return;
    }
    // If the type is not in the template, create an empty object
    const contentData = template[type] ? template[type] : {};

    setSheetData([
      ...sheetData,
      {
        id: nanoid(),
        type,
        ...contentData,
        header: "",
        data: [
          {
            id: nanoid(),
            type,
            image_url: "",
          },
        ],
      },
    ]);
  };

  const updateContent = (id, newData) => {
    setContents(
      contents.map((content) =>
        content.id === id ? { ...content, ...newData } : content
      )
    );
  };
  const updateSheetData = (id, newData) => {
    setSheetData(
      sheetData.map((content) =>
        content.id === id ? { ...content, ...newData } : content
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setContents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const deleteContent = (id) => {
    setContents(contents.filter((content) => content.id !== id));
    setSheetData(sheetData.filter((content) => content.id !== id));
  };

  return (
    <Box display="flex" h="100%" bg={"#F5F6FA"}>
      <Box
        width="60%"
        position="relative"
        h="100dvh"
        paddingX={10}
        overflowX={"hidden"}
        overflowY={"scroll"}
        pb={"10dvh"}
      >
        <Box position="absolute" top={10} right={4}>
          <AddContentButton onAdd={addContent} contents={contents} />
        </Box>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <VStack mt={24} spacing={4} align="stretch">
            <SortableContext
              items={contents.map((content) => content.id)}
              strategy={verticalListSortingStrategy}
            >
              {contents?.length > 0 && (
                <Tag
                  mb={0}
                  alignSelf={"center"}
                  fontSize={18}
                  fontWeight={"semibold"}
                  bg={"white"}
                  px={4}
                  py={2}
                  borderRadius={50}
                  boxShadow="lg"
                >
                  Carousel Section
                </Tag>
              )}

              {contents.map((content) => (
                <ContentCard
                  key={content.id}
                  {...content}
                  onUpdate={(newData) => updateContent(content.id, newData)}
                  onDelete={() => deleteContent(content.id)}
                  isCarousel
                />
              ))}
            </SortableContext>

            <SortableContext
              items={sheetData.map((content) => content.id)}
              strategy={verticalListSortingStrategy}
            >
              {sheetData?.length > 0 && (
                <Tag
                  mb={0}
                  alignSelf={"center"}
                  fontSize={18}
                  fontWeight={"semibold"}
                  bg={"white"}
                  px={4}
                  py={2}
                  borderRadius={50}
                  boxShadow="lg"
                >
                  Bottom Sheet Section
                </Tag>
              )}

              {sheetData.map((content) => (
                <ContentCard
                  key={content.id}
                  {...content}
                  onUpdate={(newData) => updateSheetData(content.id, newData)}
                  onDelete={() => deleteContent(content.id)}
                />
              ))}
            </SortableContext>
          </VStack>
        </DndContext>
      </Box>

      <Stack width="40%" h="100%" alignItems={"center"}>
        <Stack
          w={"292px"}
          h={"603px"}
          mt={50}
          borderWidth={5}
          borderColor={"black"}
          borderRadius={50}
          overflow={"hidden"}
        >
          <CarouselComponent
            productData={contents}
            defaultSheetData={sheetData}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContentBuilder;
