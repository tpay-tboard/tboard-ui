import 'antd/dist/antd.css';

import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import AntdAsyncSelect from './AntdAsyncSelect';

export default {
  component: AntdAsyncSelect,
  title: 'AntdAsyncSelect',
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

export const Default = () => <AntdAsyncSelect />;
