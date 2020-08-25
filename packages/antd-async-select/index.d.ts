import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

import { Props } from './lib/AntdAsyncSelect';

declare const AntdAsyncSelect: ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<Select<SelectValue>>
>;
export default AntdAsyncSelect;
