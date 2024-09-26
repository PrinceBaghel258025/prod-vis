import React from 'react';
import { Box } from '@chakra-ui/react';
import ContentBuilder from './ContentBuilder';

const ContentBuilderPage = () => {
  return (
    <Box w="100dvw" minH="100dvh" borderWidth={2} borderColor="red">
      <ContentBuilder />
    </Box>
  );
};

export default ContentBuilderPage;