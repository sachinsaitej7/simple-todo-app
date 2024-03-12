import React from "react";

import { Box } from "@chakra-ui/react";

import TopBar from "./TopBar";

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <Box px={4}>{children}</Box>
    </>
  );
};
