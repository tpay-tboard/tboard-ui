import { Button, Input } from 'antd';
import React, { useMemo, useState } from 'react';

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
   * Set Input disabled or not
   */
  disabled?: boolean;
  /**
   * maximum value
   */
  max?: number;
  /**
   * minimum value
   */
  min?: number;
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
  onChange?: (value: string | number) => void;
  /**
   * Enter keydown EventHandler
   */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Input value
   */
  value?: number;
  /**
   * Format number with comma or not
   */
  withComma?: boolean;
  /**
   * Whether to show step buttons or not
   */
  showStepButtons?: boolean;
  /**
   * Step to be used when clicking add or subtract buttons (showStepButtons prop should be set as true)
   */
  step?: number;
} & React.ComponentProps<typeof Input>;

const AntdInputNumber = React.forwardRef<Input, Props>(
  (
    {
      min,
      max,
      onChange,
      onBlur,
      value,
      step = 1,
      showStepButtons = false,
      disabled = false,
      allowClear = true,
      withComma = true,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const formatter = useMemo(() => {
      return withComma
        ? (value: number) => new Intl.NumberFormat().format(value)
        : (value: number) => value.toString();
    }, [withComma]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { value } = e.currentTarget;
      const intValue = parseInt(value.replace(/,/g, ''), 10);

      if (!value) {
        setInternalValue(value);
        onChange && onChange(value);

        return;
      }

      if (value === '-') {
        setInternalValue(value);

        return;
      }

      if (!isNaN(intValue) && /^-?\d*$/.test(intValue.toString())) {
        setInternalValue(formatter(intValue));
        onChange && onChange(intValue);
      }
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
      onBlur && onBlur(event);

      if (internalValue === '-') {
        setInternalValue('');

        return;
      }

      if (value && max && max < value) {
        onChange && onChange(max);
        setInternalValue(formatter(max));

        return;
      }

      if (value && min && min > value) {
        onChange && onChange(min);
        setInternalValue(formatter(min));

        return;
      }
    };

    const handleStepButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
      e,
    ) => {
      e.stopPropagation();
      const { name } = e.currentTarget;
      const updatedValue = (value || 0) + step * (name === 'plus' ? 1 : -1);
      setInternalValue(formatter(updatedValue));
      onChange && onChange(updatedValue);
    };

    return (
      <Input
        {...rest}
        ref={ref}
        disabled={disabled}
        allowClear={allowClear}
        value={internalValue}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(showStepButtons && {
          addonBefore: (
            <Button
              type="text"
              size="small"
              name="minus"
              onClick={handleStepButtonClick}
            >
              -
            </Button>
          ),
          addonAfter: (
            <Button
              type="text"
              size="small"
              name="plus"
              onClick={handleStepButtonClick}
            >
              +
            </Button>
          ),
        })}
      />
    );
  },
);

AntdInputNumber.displayName = 'AntdInputNumber';
export default AntdInputNumber;
