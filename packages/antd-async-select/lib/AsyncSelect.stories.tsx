import React from 'react';

import AsyncSelect from './index';

export default {
  component: AsyncSelect,
  title: 'AsyncSelect',
  excludeStories: /.*Data$/,
};

export const Default = () => <AsyncSelect />;
