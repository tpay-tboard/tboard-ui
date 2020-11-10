import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React, { FC, useCallback } from 'react';

interface IOption extends Omit<ButtonProps, 'type' | 'onClick'> {
  all?: boolean;
  text: string;
  value: string;
}

type BaseProps = {
  /**
   * ButtonGroup Options
   */
  options: IOption[];
};

type SigleOptionProps = BaseProps & {
  value: string;
  multiple?: false;
  onChange: (value: string) => void;
};

type MultipleOptionProps = BaseProps & {
  value: string[];
  multiple: true;
  onChange: (value: string[]) => void;
};

export type Props = SigleOptionProps | MultipleOptionProps;

const AntdButtonGroup: FC<Props> = (props) => {
  const { value, options } = props;
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      const el = e.currentTarget;
      el.blur();

      const { value: newValue, allButton } = el.dataset;
      if (!newValue) return;

      if (!props.multiple) {
        newValue !== value && props.onChange(newValue);

        return;
      }

      const allOption = options.find((option) => option.all);
      const included = props.value.includes(newValue);
      const shouldBeReset =
        allButton ||
        (!included && props.value.length + 1 === options.length - 1) ||
        (included && props.value.length === 1);

      if (shouldBeReset) {
        allOption && props.onChange([allOption.value]);

        return;
      }

      if (included) {
        props.onChange(props.value.filter((item) => item !== newValue));

        return;
      }

      props.onChange(
        [...props.value, newValue].filter((item) => item !== allOption?.value),
      );
    },
    [options, props, value],
  );

  return (
    <Button.Group>
      {options.map(
        ({ text: optionText, value: optionValue, all, ...props }) => {
          // active or not
          const active =
            typeof value === 'string'
              ? value === optionValue
              : value.includes(optionValue);
          const buttonType = active ? 'primary' : 'default';

          return (
            <Button
              {...props}
              key={optionValue}
              type={buttonType}
              data-all-button={all}
              data-value={optionValue}
              onClick={handleButtonClick}
            >
              {optionText}
            </Button>
          );
        },
      )}
    </Button.Group>
  );
};

export default AntdButtonGroup;
