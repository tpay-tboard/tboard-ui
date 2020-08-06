import { Select, Spin } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React, { ReactElement } from 'react';

import useAsyncSelect from './useAsyncSelect';

export type OptionType = Record<string, string | number>;
export type ValueType = SelectValue | OptionType | OptionType[];
export type SelectType = SelectProps<ValueType>;
export type Props = Omit<Partial<SelectType>, 'defaultValue'> & {
  /**
   * Promise to fetch options
   */
  promiseFn: () => Promise<OptionType[]>;
  /**
   * Event handler triggered when selected option changes
   */
  onChange?: SelectProps<ValueType>['onChange'];
  /**
   * Selected option value
   */
  value?: ValueType;
  /**
   * Key to render `label` in option object
   */
  labelKey?: string;
  /**
   * Key to render `value` in option object
   */
  valueKey?: string;
  /**
   * If true, selected value contains original option object
   */
  optionInValue?: boolean;
  /**
   * If true, open select when select status is changed from `disabled` to `active`
   */
  focusIfActive?: boolean;
  /**
   * Select placeholder
   */
  placeholder?: string;
  /**
   * Select disabled
   */
  disabled?: boolean;
  /**
   * Allow to clear selected option
   */
  allowClear?: boolean;
  /**
   * Allow to search options
   */
  showSearch?: boolean;
  /**
   * Show select arrow
   */
  showArrow?: boolean;
  /**
   * Show select arrow (mode: 'multiple' | 'tags')
   */
  mode?: SelectType['mode'];
  /**
   * Key to filter options
   */
  optionFilterProp?: string;
  /**
   * Use display block style
   */
  block?: boolean;
};

const AntdAsyncSslect = React.forwardRef<Select<SelectValue>, Props>(
  (
    {
      promiseFn,
      labelKey = 'name',
      valueKey = 'id',
      optionFilterProp = 'children',
      optionInValue = false,
      focusIfActive = false,
      disabled = false,
      allowClear = true,
      showSearch = true,
      showArrow = true,
      block = true,
      placeholder = '',
      mode,
      value,
      onChange,
      ...rest
    }: Props,
    ref,
  ): ReactElement => {
    const {
      open,
      options,
      loading,
      selectRef,
      handleBlur,
      handleFocus,
      handleChange,
    } = useAsyncSelect({
      ref,
      promiseFn,
      mode,
      value,
      disabled,
      labelKey,
      valueKey,
      optionInValue,
      focusIfActive,
      onChange,
    });

    const selectedValue = (() => {
      switch (true) {
        case !value || options.length === 0:
          return undefined;
        case Array.isArray(value):
          return ((value as (string | number | OptionType)[]) || []).map(
            (item) => {
              if (typeof item === 'object') return item[valueKey].toString();

              return item.toString();
            },
          );
        case typeof value === 'object':
          return (value as OptionType)[valueKey].toString();
        default:
          return value?.toString() as SelectValue;
      }
    })();

    return (
      <Select
        mode={mode}
        open={open}
        value={selectedValue}
        ref={selectRef}
        loading={loading}
        disabled={disabled}
        placeholder={placeholder}
        optionFilterProp={optionFilterProp}
        onBlur={handleBlur}
        onFocus={handleFocus}
        allowClear={allowClear}
        showSearch={showSearch}
        showArrow={showArrow}
        notFoundContent={open && loading ? <Spin size="small" /> : undefined}
        onChange={handleChange}
        {...(block && { style: { ...rest.style, display: 'block' } })}
        {...rest}
      >
        {options.map((option) => {
          return (
            <Select.Option
              key={option[valueKey].toString()}
              value={option[valueKey].toString()}
            >
              {option[labelKey]}
            </Select.Option>
          );
        })}
      </Select>
    );
  },
);

AntdAsyncSslect.displayName = 'AntdAsyncSelect';
export default AntdAsyncSslect;
