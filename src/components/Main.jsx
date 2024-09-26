"use client";

import { Stack, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useGetProduct } from "../apiHooks/useGetProduct";
import { SplashScreen } from "./generic/SplashScreen";
import ErrorImage from "../../public/404_error.jpg";
// import Image from "next/image";
import { Image } from "@chakra-ui/react";
import CarouselComponent from "./CarouselComponent";

export const Main = () => {
  const searchParams = useSearchParams();

  let urlProductId;
  let urlEnterpriseName;

  if (typeof window !== "undefined") {
    // Product Id
    urlProductId = searchParams.get("id") || null;
    // Enterprise name
    urlEnterpriseName = window.location.hostname.split(".")[0] || "woolah";
  }

  console.log("SEARCH: ", urlEnterpriseName, "Product: ", urlProductId);

  // Fake Data
  // const productId = 33;
  // const enterpriseName = "kvkdt";

  const {
    data: productData,
    isPending,
    isSuccess,
  } = useGetProduct({
    productId: urlProductId,
    enterpriseName: urlEnterpriseName,
  });


  return (
    <>
      {isPending ? (
        <SplashScreen />
      ) : isSuccess ? (
        <CarouselComponent productData={productData?.data} defaultSheetData={productData?.defaultSheetData} />

      ) : (
        <Error404 />
      )}
    </>
  );
};

const Error404 = () => {
  return (
    <Stack
      h={"100dvh"}
      w={"100dvw"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image src={ErrorImage} alt="logo" width={250} />
      <Text textAlign={"center"} fontSize={14} marginX={50}>
        Something went wrong. If this issue persists, please contact us through
        our help center at{" "}
        <a
          href="https://agspert.com/"
          target="_blank"
          style={{ color: "#00B894" }}
        >
          help.agspeak.com
        </a>
      </Text>
    </Stack>
  );
};
