import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: {
    viewports: {
      // ADD YOUR CUSTOM VIEWPORT
      ...INITIAL_VIEWPORTS
    },
  },
});