"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "react-use-gesture/dist";
import {
  findNearestNumberInArray,
  rubberBandIfOutOfBounds,
  projection,
} from "../../helper/utils";
import useWindowSize from "../../helper/useWindowSize";
import { IconButton } from "@chakra-ui/react";
import { IoIosArrowUp } from "react-icons/io";
import { keyframes } from "@emotion/react";
import { BrandBanner } from "../BrandBanner";

const threshold = 10;
const spring = { tension: 247, friction: 27 };
const dampedSpring = { tension: 247, friction: 33 };

const [COLLAPSED, FULL_EXPANDED] = [0, 1];

export default function DraggableDrawer({
  children,
  data,
  setIsBottomSheetOpen,
}) {
  const { height } = useWindowSize();
  const level = React.useMemo(
    () => [0, -(height - 80), -(height - 80)],
    [height]
  );

  const [current, setCurrent] = React.useState(COLLAPSED);

  // Initial value settings
  const [{ y }, set] = useSpring(() => ({
    y: -40,
    config: { tension: 250, friction: 30 },
  }));

  const setDrawerOpen = () => {
    set({ y: level[FULL_EXPANDED], config: dampedSpring, immediate: false });
    setCurrent(FULL_EXPANDED);
  };

  const handleDrawerClose = () => {
    set({ y: -40, config: dampedSpring, immediate: false });
    setCurrent(COLLAPSED);
  };

  const bind = useDrag(
    ({ vxvy: [, velocityY], movement: [mx, my], first, last, memo, event }) => {
      event.preventDefault();
      const drawerIsOpen = y.value <= level[FULL_EXPANDED];
      const isClick = last && Math.abs(mx) + Math.abs(my) <= 3 && !drawerIsOpen;
      if (isClick) {
        return setDrawerOpen();
      }

      if (!memo) {
        const isIntentionalGesture =
          Math.abs(my) > threshold && Math.abs(my) > Math.abs(mx);
        if (!isIntentionalGesture) return;

        memo = y.get() - my;
      }

      if (first) {
        setCurrent(FULL_EXPANDED);
      }

      // When releasing the drag
      if (last) {
        const projectedEndpoint = y.get() + projection(velocityY);
        const point = findNearestNumberInArray(projectedEndpoint, level);
        set({
          y: point === level[COLLAPSED] ? -40 : point,
          immediate: false,
          config: spring,
        });

        if (point === level[COLLAPSED]) {
          setCurrent(COLLAPSED);
        } else {
          setCurrent(FULL_EXPANDED);
        }
        return;
      }

      const newY = rubberBandIfOutOfBounds(
        level[current + 1],
        0,
        my + memo,
        0.08
      );
      set({ y: newY, immediate: true });

      return memo;
    },
    { rubberband: true, eventOptions: { passive: false } }
  );

  const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 1); }
  50% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

  useEffect(() => {
    if (setIsBottomSheetOpen && typeof setIsBottomSheetOpen === "function") {
      if (current === COLLAPSED) {
        setIsBottomSheetOpen(true);
      } else {
        setIsBottomSheetOpen(false);
      }
    }
  }, [current]);

  return (
    <>
      <Backdrop
        as={animated.div}
        onClick={handleDrawerClose}
        style={{ opacity: y.to([0, level[1]], [0, 1]) }}
      />
      <BottomSheet
        as={animated.div}
        style={{ transform: y.to((y) => `translate3D(0, ${y}px, 0)`) }}
      >
        <Header {...bind()}>
          <IconButton
            display={current === FULL_EXPANDED ? "none" : "flex"}
            icon={current === COLLAPSED && <IoIosArrowUp size={40} />}
            color={"white"}
            borderRadius={50}
            top={-45}
            bg={"transparent"}
            _focus={{ bg: "transparent" }}
            sx={{
              animation: `${pulse} 2s infinite`,
            }}
          />
          <Handle />
          <BrandBanner data={data} />
        </Header>
        <Body as={animated.div} style={{ height: y.to((y) => Math.abs(y)) }}>
          {children}
        </Body>
      </BottomSheet>
    </>
  );
}

const BottomSheet = styled.div`
  touch-action: none;
  will-change: transform;
  min-height: 100dvh;
  border-radius: 18px 18px 0 0;
  background-color: rgba(255, 255, 255);
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 15px rgba(100, 100, 100, 0.25);
  color: #000;
  z-index: 100000000;

  display: flex;
  flex-direction: column;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.75);
  pointer-events: none;
`;

const Header = styled.div`
  width: 100%;
  border-radius: 18px 18px 0 0;
  display: flex;
  justify-content: center;

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const Body = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

export const Handle = styled.div`
  width: 4rem;
  height: 0.4rem;
  background-color: hsla(0, 0%, 0%, 0.3);
  border-radius: 9px;
  top: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
`;
