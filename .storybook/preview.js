import 'antd/dist/antd.css';

import React from 'react';
import { addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  viewport: {
    viewports: {
      // ADD YOUR CUSTOM VIEWPORT
      ...INITIAL_VIEWPORTS
    },
  },
};

const containerStyles = {
  padding: '30px 20px',
};
const StoryContainer = ({ children }) => {
  return <div style={containerStyles}>{children}</div>;
}

addDecorator(story => (
  <StoryContainer>{story()}</StoryContainer>
))