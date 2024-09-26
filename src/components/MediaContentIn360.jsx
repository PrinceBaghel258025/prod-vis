import { useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

const MediaContentIn360 = ({ data }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <Html position={[data?.x_axis, data?.y_axis, data?.z_axis]}>
      <Box position={"relative"}>
        {data?.image ? (
          <Box
            as={motion.div}
            position={"absolute"}
            top={0}
            border={"1px solid white"}
            boxShadow={"0px 0px 15px 8px rgba(255,255,255,0.6)"}
            borderRadius={50}
            display={showUserInfo ? "flex" : "none"}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <Image
              src={data?.image}
              width={32}
              height={32}
              borderRadius={"25rem"}
              onClick={() => {
                setShowUserInfo((prev) => !prev);
              }}
              alt="person image"
            />

            <Text w={"2rem"} />
          </Box>
        ) : null}

        {!showUserInfo && (
          <Flex
            as={motion.div}
            position={"absolute"}
            top={-90}
            left={"-7.5rem"}
            p={4}
            w={"17rem"}
            borderRadius={12}
            alignItems={"center"}
            gap={5}
            bg={"transparent"}
            overflowY={"auto"}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            onClick={() => {
              setShowUserInfo((prev) => !prev);
            }}
          >
            {data?.image ? (
              <Image
                src={data?.image}
                width={80}
                height={80}
                borderRadius={"25rem"}
                alt="person image"
              />
            ) : null}

            <Box
              w={"fit-content"}
              bg={"rgb(255, 255, 255, 0.8)"}
              p={8}
              borderRadius={10}
              fontWeight={500}
              fontSize={"small"}
            >
              {data?.name ? <Text>Name: {data?.name} </Text> : null}

              {data?.age ? <Text>Age: {data?.age} Years </Text> : null}

              {data?.location ? <Text>Location: {data?.location}</Text> : null}
            </Box>
          </Flex>
        )}
      </Box>
    </Html>
  );
};

export default MediaContentIn360;
