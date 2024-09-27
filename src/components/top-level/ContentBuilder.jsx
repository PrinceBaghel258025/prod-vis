import React, { useState } from "react";
import { VStack, Box, Stack } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import AddContentButton from "./AddContentButton";
import { nanoid } from "nanoid";
import CarouselComponent from "../CarouselComponent";

const defaultSheetData = [
  {
    id: 2,
    type: "text_content",
    text_content: {
      name: "Wondering what you just saw?",
      content:
        "You can see the exact tea garden from where the box in your hand was processed! That is how transparent we are about our minimally hand processed tea!",
    },
  },
  {
    id: 3,
    type: "image_content",
    image_urls: [
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/images/Woolah+farm+(1).jpeg",
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/images/Woolah+farm+(2).jpeg",
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/images/Woolah+farm+(3).jpeg",
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/images/Woolah+farm+(5).jpeg",
    ],
  },
  {
    id: 4,
    type: "text_content",
    text_content: {
      name: "What makes the tea box in your hand so special?",
      content:
        "Woolah TrueDips is nothing like you have ever tasted or experienced. Woolah TrueDips is the World’s First Bagless Tea, which in the shape of a tablet locks in the most authentic and exotic Assam tea flavours you have ever tasted.",
    },
  },
  {
    id: 5,
    type: "video_content",
    video_urls: [
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/videos/WOOLAH+TEA+FEATURE_+THE+PLATE+-+upamanyu+borkakoty.mp4",
    ],
  },
  {
    id: 6,
    type: "text_content",
    text_content: {
      name: "‘Source transparency’ for you, the consumer:",
      content:
        "In the heart of Woolah is a meticulously curated value chain which provides gainful earning sources to organically grown micro tea farm owners, tea workers, packaging specialists. It has also delegated women workers to participate and earn a livelihood for themselves. \n              Woolah also contributes towards funding quality education for the children of tea workers. The idea is to empower our smallholder tea growers with more visibility, while keeping our sourcing 100% transparent for our consumers!\n              ",
    },
  },
  {
    id: 7,
    type: "header",
    header_text: "Our Team",
  },
  {
    id: 8,
    type: "image_content",
    image_urls: [
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/images/Woolah+farm+(4).jpeg",
    ],
  },
  {
    type: "brand_banner",
    brand_banner:
      "https://360-images-v1.s3.ap-south-1.amazonaws.com/Woolah_banner2.webp",
  },
  {
    link: {
      url: "https://woolahtea.com/products/rare-assam-green-tea",
      label: "View Product",
    },
    type: "redirect_url",
  },
  {
    type: "social_links",
    social_links: [
      {
        url: "https://www.youtube.com/@woolahtea",
        label: "Youtube",
        thumbnail:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/social_icons/youtube.png",
      },
      {
        url: "https://www.facebook.com/WoolahTea/",
        label: "Facebook",
        thumbnail:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/social_icons/facebook.png",
      },
      {
        url: "https://www.instagram.com/be_woolah/",
        label: "Instagram",
        thumbnail:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/social_icons/instagram.png",
      },
    ],
  },
];

const datasets = [
  {
    id: 1,
    type: "360_video",
    header: "Plucking",
    data: [
      {
        id: 1,
        type: "360_video",
        image_url:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/Hand+Plucking.mp4",
        farmer_info: {
          x_axis: -50,
          y_axis: -5,
          z_axis: 50,
          age: 45,
          name: "Sailen Phukan",
          image:
            "https://360-images-v1.s3.ap-south-1.amazonaws.com/consumer_app/360_media/farmer.jpg",
          location: "GP Tea Farm",
        },
        screen_info: [
          {
            x_axis: 50,
            y_axis: -20,
            z_axis: 50,
            info: `Only the top tender two leaves and a bud are meticulously plucked by skilled workers perfected over years of working in the farm. Its is also known as the Gold Standard of Tea Plucking. `,
          },
          {
            x_axis: 50,
            y_axis: 20,
            z_axis: -50,
            info: `High Nutritive Value: The young leaves and buds contain a high concentration of polyphenols, especially catechins, which are powerful antioxidants. These compounds help protect the body against free radical damage. Theanine is an amino acid found in higher concentrations in young tea leaves. It has a calming effect on the brain and can enhance focus and concentration.
            Regenerative Natural Farming: At Woolah Tea, we grow our teas organically without chemicals, using regenerative methods to enhance soil health and biodiversity. By adopting sustainable practices like natural pest control and renewable energy, we aim to cut down on our carbon footprint. Our commitment ensures that you enjoy pure, nutrient-rich teas while supporting a healthier planet and local communities.`,
          },
        ],
      },
      ...defaultSheetData,
    ],
  },

  {
    id: 2,
    type: "2d_video",
    header: "Withering",
    data: [
      {
        id: 1,
        type: "2d_video",
        image_url:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/Natural+withering.mp4",
        screen_info: {
          x_axis: 85,
          y_axis: 250,
          info: "Unlike mass-produced commodity teas, we follow traditional and natural withering processes in small batches. It helps in controlled dehydration or moisture reduction of the leaves and helps in flavour development. Fresh oxygen comes in contact with the leaves to do the magic.",
        },
      },
      ...defaultSheetData,
    ],
  },

  {
    id: 3,
    type: "360_video",
    header: "Tea Crafting",
    data: [
      {
        id: 1,
        type: "360_video",
        image_url:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/test_360video.mp4",
        screen_info: [
          {
            x_axis: 50,
            y_axis: -20,
            z_axis: 50,
            info: "Sorting & tying of the finest tea leaves Weighing of the leaves Compressing of the tea dips Sachet Packaging",
          },
        ],
      },
      ...defaultSheetData,
    ],
  },

  {
    id: 4,
    type: "360_video",
    header: "Sachet Making",
    data: [
      {
        id: 1,
        type: "360_video",
        image_url:
          "https://360-images-v1.s3.ap-south-1.amazonaws.com/Sachet_packing.mp4",
      },
      ...defaultSheetData,
    ],
  },
];
const datasets2 = [
  {
    id: "dTcuL2iE_wS3NnO9EhYjL",
    type: "360_Image",
    header: "",
    data: [
      {
        id: "Der7d5eSBAjWC8jEFNG6X",
        type: "360_Image",
        image_url:
          "blob:http://localhost:5173/155af97b-2477-457f-b4ed-3341d3b8c3e9",
      },
    ],
  },
];

const ContentBuilder = () => {
  const [contents, setContents] = useState([]);

  const addContent = (type) => {
    setContents([
      ...contents,
      {
        id: nanoid(),
        type,
        header: "",
        text_content: "",
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

  console.log("state", contents);

  const deleteContent = (id) => {
    setContents(contents.filter((content) => content.id !== id));
  };

  return (
    <Box display="flex" h="100%" bg={"#F5F6FA"}>
      <Box
        width="60%"
        position="relative"
        h="100dvh"
        padding={10}
        overflowX={"hidden"}
        overflowY={"scroll"}
      >
        <Box position="absolute" top={10} right={4}>
          <AddContentButton onAdd={addContent} contents={contents} />
        </Box>

        <VStack mt={24} spacing={4} align="stretch">
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              {...content}
              onUpdate={(newData) => updateContent(content.id, newData)}
              onDelete={() => deleteContent(content.id)}
            />
          ))}
        </VStack>
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
            defaultSheetData={defaultSheetData}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContentBuilder;
