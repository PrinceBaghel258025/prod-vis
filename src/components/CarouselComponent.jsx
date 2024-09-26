// CarouselComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Scene } from "./Scene";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomNextArrow, CustomPrevArrow } from "./CustomArrow";
import { Stack, Text } from "@chakra-ui/react";
import ImageScreen from "./ImageScreen";
import VideoScreen from "./VideoScreen";
import DraggableDrawer from "./generic/DraggableDrawer";
import { DrawerInfo } from "./DrawerInfo";

const CarouselComponent = ({ productData, defaultSheetData }) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    if (isInteracting) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInteracting]);
  const settings = {
    infinite: false,
    speed: 500,
    swipe: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // lazyLoad: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    afterChange: (newIndex) => setCurrentSlide(newIndex),
    // prevArrow: currentSlide > 0 && <CustomPrevArrow isVisible={isVisible} />,
    // nextArrow: currentSlide < datasets.length - 1 && <CustomNextArrow isVisible={isVisible} />,
  };
  const sliderRef = useRef();

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  console.log("state carousel", productData)

  return (
    <Stack position={"relative"} overflow={"hidden"} maxH={"80dvh"}>
      <Slider ref={sliderRef} {...settings}>
        {productData?.map((dataset) => {
          return (
            <Stack key={dataset.id}>
              {dataset?.type === "360_image" && (
                <Scene
                  zoom={dataset?.zoom || 1}
                  targetRotation={dataset?.targetRotation}
                  fov={dataset?.fov}
                  header={dataset?.header}
                  setIsInteracting={setIsInteracting}
                  data={dataset?.data}
                  isBottomSheetOpen={isBottomSheetOpen}
                  setIsBottomSheetOpen={setIsBottomSheetOpen}
                />
              )}

              {dataset?.type === "360_video" && (
                <Scene
                  zoom={dataset?.zoom || 1}
                  targetRotation={dataset?.targetRotation}
                  header={dataset?.header}
                  setIsInteracting={setIsInteracting}
                  data={dataset?.data}
                  isBottomSheetOpen={isBottomSheetOpen}
                  setIsBottomSheetOpen={setIsBottomSheetOpen}
                />
              )}

              {dataset?.type === "2d_image" && (
                <ImageScreen
                  header={dataset?.header}
                  setIsInteracting={setIsInteracting}
                  data={dataset?.data}
                />
              )}

              {dataset?.type === "2d_video" && (
                <VideoScreen
                  header={dataset?.header}
                  setIsInteracting={setIsInteracting}
                  data={dataset?.data}
                />
              )}
            </Stack>
          );
        })}
      </Slider>

      <DraggableDrawer
        data={defaultSheetData}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      >
        <DrawerInfo data={defaultSheetData} />
      </DraggableDrawer>

      {currentSlide > 0 && (
        <CustomPrevArrow isVisible={isVisible} onClick={prevSlide} />
      )}
      {currentSlide < productData?.length - 1 && (
        <CustomNextArrow isVisible={isVisible} onClick={nextSlide} />
      )}
    </Stack>
  );
};

export default CarouselComponent;
