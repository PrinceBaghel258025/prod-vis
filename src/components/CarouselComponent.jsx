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
  console.log("state carousel", productData, defaultSheetData);

  return (
    <Stack position={"relative"} overflow={"hidden"}>
      <Slider ref={sliderRef} {...settings}>
        {productData?.length === 0 ||
          (!productData?.[0]?.isActive && <Stack h={"80dvh"} />)}

        {productData?.map((dataset) => {
          return (
            <Stack key={dataset.id}>
              {dataset?.type === "carousel_360_image" && dataset?.isActive && (
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

              {dataset?.type === "carousel_360_video" && dataset?.isActive && (
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

              {dataset?.type === "carousel_2d_image" && dataset?.isActive && (
                <ImageScreen
                  header={dataset?.header}
                  setIsInteracting={setIsInteracting}
                  data={dataset?.data}
                />
              )}

              {dataset?.type === "carousel_2d_video" && dataset?.isActive && (
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
