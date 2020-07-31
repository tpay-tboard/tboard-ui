import React from 'react';

import AntdAsyncSelect from './AntdAsyncSelect';

export default {
  component: AntdAsyncSelect,
  title: 'AntdAsyncSelect',
  excludeStories: /.*Data$/,
};

export const Default = () => <AntdAsyncSelect />;
