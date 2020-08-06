import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  OptionType,
  Props as ComponentProps,
  ValueType,
} from './AntdAsyncSelect';

type RequiredProps = Required<
  Pick<
    ComponentProps,
    | 'promiseFn'
    | 'disabled'
    | 'focusIfActive'
    | 'optionInValue'
    | 'valueKey'
    | 'labelKey'
  >
>;
type OptionalProps = Partial<
  Pick<ComponentProps, 'value' | 'onChange' | 'mode'>
>;
type Props = OptionalProps &
  RequiredProps & {
    ref?:
      | React.MutableRefObject<Select<SelectValue> | null>
      | ((instance: Select<SelectValue> | null) => void)
      | null;
  };

const useAsyncSelect = ({
  promiseFn,
  ref,
  mode,
  value,
  labelKey,
  valueKey,
  onChange,
  disabled,
  optionInValue,
  focusIfActive,
}: Props) => {
  const mountRef = useRef<boolean>(false);
  const selectRef = useRef<Select<SelectValue> | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);

  const handleFocus = () => !open && setOpen(true);

  const handleBlur = () => {
    open && setOpen(false);

    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const handleChange: SelectProps<ValueType>['onChange'] = (value, option) => {
    if (!onChange) return;

    if (!optionInValue) {
      onChange(value, option);
    } else {
      const theOption = options.find(
        (option) => option[valueKey].toString() === value,
      );
      theOption && onChange(theOption, option);
    }

    handleBlur();
  };

  const handleMultipleChange: SelectProps<ValueType>['onChange'] = (
    values,
    selectedOptions,
  ) => {
    if (!onChange) return;

    if (!optionInValue) {
      onChange(values, selectedOptions);
    } else {
      const theOptions = [] as OptionType[];
      selectedOptions.forEach((option: OptionType, index: number) => {
        if (option.value) {
          const theOption = options.find(
            (item) => item[valueKey].toString() === option.value,
          );
          if (!theOption) return;
          theOption[valueKey] = theOption[valueKey].toString();
          theOptions.push(theOption);

          return;
        }

        // support option which does not exsists
        if (mode === 'tags' && Array.isArray(values)) {
          const addedValue = values[index] as string;
          const newOption = {
            [labelKey]: addedValue,
            [valueKey]: addedValue,
            __tagType: 'new',
          };

          setOptions((prev) => [...prev, newOption]);
          theOptions.push(newOption);

          return;
        }
      });

      onChange(theOptions, selectedOptions);
    }
  };

  const handleLoadOptions = useCallback(async () => {
    if (options.length > 0) return;

    try {
      setLoading(true);
      const options = await promiseFn();
      setOptions(options);
    } finally {
      setLoading(false);
    }
  }, [promiseFn, options.length]);

  useEffect(() => {
    if (!mountRef.current) return;

    if (open) {
      handleLoadOptions();
    }
  }, [handleLoadOptions, open]);

  useEffect(() => {
    if (!value && options.length === 0) return;
    handleLoadOptions();
  }, [handleLoadOptions, options.length, value]);

  useEffect(() => {
    if (mountRef.current && !disabled && focusIfActive && selectRef.current) {
      selectRef.current.focus();
    }
  }, [disabled, focusIfActive]);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  useImperativeHandle<unknown, { focus: () => void }>(
    ref,
    () => ({
      focus: () => {
        if (selectRef.current) {
          selectRef.current.focus();
        }
      },
      blur: () => {
        if (selectRef.current) {
          selectRef.current.blur();
        }
      },
    }),
    [],
  );

  return {
    open,
    loading,
    options,
    selectRef,
    handleBlur,
    handleFocus,
    handleChange:
      mode === 'multiple' || mode === 'tags'
        ? handleMultipleChange
        : handleChange,
  };
};

export default useAsyncSelect;
