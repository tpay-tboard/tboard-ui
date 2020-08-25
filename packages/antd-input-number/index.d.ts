import { Input } from 'antd';
import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

import { Props } from './lib/AntdInputNumber';
declare const AntdInputNumber: ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<Input>
>;
export default AntdInputNumber;
