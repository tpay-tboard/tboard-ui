import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { OptionType, Props as ComponentProps } from './AntdAsyncSelect';

type RequiredProps = Required<
  Pick<
    ComponentProps,
    'promiseFn' | 'disabled' | 'focusIfActive' | 'optionInValue' | 'valueKey'
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

  const handleChange = (value: SelectValue) => {
    if (!onChange) return;

    if (!optionInValue) {
      onChange(value);
    } else {
      const theOption = options.find(
        (option) => option[valueKey].toString() === value,
      );
      theOption && onChange(theOption);
    }

    handleBlur();
  };

  const handleMultipleChange = (values: SelectValue, selectedOptions: any) => {
    if (!onChange) return;

    if (!optionInValue) {
      onChange(values);
    } else {
      const theOptions = [] as OptionType[];
      selectedOptions.forEach((option: OptionType) => {
        const theOption = options.find(
          (item) => item[valueKey] === option.value.toString(),
        );
        if (theOption) theOptions.push(theOption);
      });
      onChange(theOptions);
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
    if (!value) return;
    handleLoadOptions();
    // eslint-disable-next-line
  }, []);

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
