import { Input } from 'antd';
import React from 'react';

export type Props = {
  /**
   * Component displayed after input field
   */
  addonAfter?: string | React.ReactNode;
  /**
   * Component displayed before input field
   */
  addonBefore?: string | React.ReactNode;
  /**
   * Input disabled
   */
  disabled?: boolean;
  /**
   * Input value's maxLength
   */
  maxLength?: number;
  /**
   * Input's prefix Component
   */
  prefix?: string | React.ReactNode;
  /**
   * Input's suffix Component
   */
  suffix?: string | React.ReactNode;
  /**
   * Show clear button at the end of input
   */
  allowClear?: boolean;
  /**
   * onChange EventHandler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Enter keydown EventHandler
   */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Input value
   */
  value?: string;
} & React.ComponentProps<typeof Input>;

const AntdInputNumber = React.forwardRef<Input, Props>(
  ({ disabled = false, allowClear = true, ...rest }, ref) => {
    return (
      <Input disabled={disabled} allowClear={allowClear} ref={ref} {...rest} />
    );
  },
);

AntdInputNumber.displayName = 'AntdInputNumber';
export default AntdInputNumber;
