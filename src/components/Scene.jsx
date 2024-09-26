"use client";

import { Box, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  Html,
  OrbitControls,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { HeroSection } from "./HeroSection";
import MediaContentIn360 from "./MediaContentIn360";
import { SplashScreen } from "./generic/SplashScreen";
import ScreenInfoCard from "./generic/ScreenInfoCard";
import { useInView } from "react-intersection-observer";
import { RiLoader4Fill } from "react-icons/ri";

export const LoadingBox = () => (
  <Box
    height={"100dvh"}
    width={"100dvw"}
    display={"flex"}
    justifyContent={"center"}
    borderWidth={4}
    alignItems={"center"}
  >
    <Box className="animate-pulse">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  </Box>
);

function Loading() {
  return (
    <Html>
      <LoadingBox />
    </Html>
  );
}

const ImageSphere = ({
  data,
  image_url,
  setIsInteracting,
  isBottomSheetOpen,
}) => {
  const { gl } = useThree();
  let imageTexture = useTexture(image_url);

  useEffect(() => {
    const handlePointerDown = () => setIsInteracting(true);
    const handlePointerUp = () => setIsInteracting(false);

    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    gl.domElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [gl, setIsInteracting]);

  return (
    <>
      {imageTexture ? (
        <>
          <ambientLight intensity={2} />
          <mesh>
            <sphereGeometry args={[1, 100, 100]} />
            <meshStandardMaterial map={imageTexture} side={THREE.DoubleSide} />
          </mesh>

          {isBottomSheetOpen && (
            <>
              <MediaContentIn360 data={data?.farmer_info} />

              {data?.screen_info?.map((info) => {
                return (
                  <Html
                    key={info}
                    position={[info?.x_axis, info?.y_axis, info?.z_axis]}
                  >
                    <ScreenInfoCard data={info} />
                  </Html>
                );
              })}
            </>
          )}
        </>
      ) : (
        <Html>
          <Stack w={"50vw"} left={50} position={"relative"}>
            <Text position={"absolute"} left={-120}>
              Texture is Loading...
            </Text>
          </Stack>
        </Html>
      )}
    </>
  );
};

const VideoSphere = ({
  data,
  image_url,
  targetRotation,
  setIsInteracting,
  isBottomSheetOpen,
}) => {
  const { gl } = useThree();
  let videoTexture = useVideoTexture(image_url);
  const meshRef = useRef();

  // const [rotated, setRotated] = useState(false);
  // useFrame(() => {
  //   if (meshRef.current && !rotated) {
  //     meshRef.current.rotation.y += 0.01;
  //     if (meshRef.current.rotation.y >= targetRotation) {
  //       setRotated(true); // Stop rotating once the target rotation is reached
  //     }
  //   }
  // });
  useEffect(() => {
    if (meshRef.current && targetRotation) {
      meshRef.current.rotation.y = targetRotation;
    }
  }, []);

  useEffect(() => {
    const handlePointerDown = () => setIsInteracting(true);
    const handlePointerUp = () => setIsInteracting(false);

    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    gl.domElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [gl, setIsInteracting]);

  return (
    <>
      {videoTexture ? (
        <>
          <ambientLight intensity={2} />
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 100, 100]} />
            <meshStandardMaterial map={videoTexture} side={THREE.DoubleSide} />
          </mesh>

          {isBottomSheetOpen && (
            <>
              <MediaContentIn360 data={data?.farmer_info} />

              {data?.screen_info?.map((info) => {
                return (
                  <Html
                    key={info}
                    position={[info?.x_axis, info?.y_axis, info?.z_axis]}
                  >
                    <ScreenInfoCard data={info} />
                  </Html>
                );
              })}
            </>
          )}
        </>
      ) : (
        <Html>
          <Stack w={"50vw"} left={50} position={"relative"}>
            <Text position={"absolute"} left={-120}>
              Texture is Loading...
            </Text>
          </Stack>
        </Html>
      )}
    </>
  );
};

const Sphere = ({
  data,
  setIsInteracting,
  isBottomSheetOpen,
  targetRotation,
}) => {
  const image_360 = data?.find((info) => info?.type === "360_image");
  const video_360 = data?.find((info) => info?.type === "360_video");
  if (image_360) {
    return (
      image_360?.image_url && (
        <ImageSphere
          targetRotation={targetRotation}
          data={image_360}
          setIsInteracting={setIsInteracting}
          image_url={image_360?.image_url}
          isBottomSheetOpen={isBottomSheetOpen}
        />
      )
    );
  } else if (video_360) {
    return (
      <VideoSphere
        targetRotation={targetRotation}
        data={video_360}
        setIsInteracting={setIsInteracting}
        image_url={video_360?.image_url}
        isBottomSheetOpen={isBottomSheetOpen}
      />
    );
  } else null;
};

const FrameUpdater = ({ setIsInsideSphere }) => {
  useFrame(({ camera }) => {
    setIsInsideSphere(camera.position.length() <= 1);
  });
  return null;
};

export const Scene = ({
  data,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  setIsInteracting,
  header,
  fov,
  targetRotation,
  zoom = 1,
}) => {
  const [isInsideSphere, setIsInsideSphere] = useState(true);

  // const { ref, inView } = useInView({
  //   threshold: 0.6, onChange: (inView, entry) => {
  //     console.log("value of changing view", header, inView, entry)
  //   }
  //   // triggerOnce: true, // Only trigger once for optimization
  // });

  // console.log("value of inView", header, inView)
  return (
    // <Box ref={ref} w={"100dvw"} h={"100dvh"}>
    <Box w={"50dvw"} h={"80dvh"}>
      {/* {inView ? */}
      <>
        <Canvas camera={{ position: [0, 0, 0.001], fov: 70, zoom: [zoom] }}>
          <ambientLight intensity={1} />
          <Suspense fallback={Loading}>
            {data && (
              <Sphere
                targetRotation={targetRotation}
                setIsInteracting={setIsInteracting}
                data={data}
                isBottomSheetOpen={isBottomSheetOpen}
              />
            )}
          </Suspense>
          <OrbitControls enableRotate={true} enableZoom={false} />
          <FrameUpdater setIsInsideSphere={setIsInsideSphere} />
        </Canvas>
        {isInsideSphere && (
          <>
            <HeroSection
              header={header}
              data={data}
              setIsBottomSheetOpen={(val) => {
                setIsBottomSheetOpen(val);
                setIsInteracting(!val);
              }}
            />
          </>
        )}
      </>
    </Box>
  );
};
