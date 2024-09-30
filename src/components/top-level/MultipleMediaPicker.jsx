import { useCallback } from "react";
import {
  Box,
  Image,
  VStack,
  HStack,
  IconButton,
  Text,
  SimpleGrid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, DragHandleIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

const MultipleMediaPicker = ({
  type,
  dataList,
  onImagesChange,
  onDeleteImage,
  changeOrder,
}) => {
  console.log("from media picker data", type, dataList);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      "partners",
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

  const removeImage = (event, id) => {
    event.stopPropagation();
    onDeleteImage(id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = dataList.findIndex((item) => item.id === active.id);
      const newIndex = dataList.findIndex((item) => item.id === over.id);
      changeOrder(arrayMove(dataList, oldIndex, newIndex));
    }
  };

  const isPartners = type === "partners";

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {dataList.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={dataList} strategy={rectSortingStrategy}>
            <SimpleGrid
              columns={isPartners ? [1, 2, 3, 4] : [1, 2, 3]}
              spacing={4}
            >
              {dataList.map((item) => (
                // <SortableItem key={item.id} id={item.id}>

                // </SortableItem>
                <MediaCard
                  key={item.id}
                  item={item}
                  removeImage={removeImage}
                  type={type}
                />
              ))}
            </SimpleGrid>
          </SortableContext>
        </DndContext>
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

const MediaCard = ({ item, removeImage, type }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  const isPartners = type === "partners";

  return (
    <Card ref={setNodeRef} style={style} boxShadow={"none"}>
      <CardBody
        position="relative"
        p={0}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"transparent"}
      >
        {item.type === "video_content" ? (
          <video
            src={item.image_url}
            alt={`Selected media ${item.id}`}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <>
            {isPartners ? (
              <Image
                src={item.image_url}
                alt={`Selected media ${item.id}`}
                width="10rem"
                height="10rem"
                objectFit="cover"
                borderRadius="full"
                boxShadow={"md"}
              />
            ) : (
              <Image
                src={item.image_url}
                alt={`Selected media ${item.id}`}
                borderRadius="md"
              />
            )}
          </>
        )}
        <IconButton
          {...attributes}
          {...listeners}
          aria-label="Pick image"
          icon={<DragHandleIcon />}
          size="sm"
          position="absolute"
          top={2}
          left={2}
          colorScheme={"gray"}
          borderRadius={isPartners && "full"}
        />
        <IconButton
          aria-label="Remove image"
          icon={<CloseIcon />}
          size="sm"
          position="absolute"
          top={2}
          right={2}
          borderRadius={isPartners && "full"}
          onClick={(e) => removeImage(e, item.id)}
        />
      </CardBody>
    </Card>
  );
};
export default MultipleMediaPicker;
