import 'antd/dist/antd.css';

import { withKnobs } from '@storybook/addon-knobs';
import { Button, Form, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { SelectValue } from 'antd/lib/select';
import React, { useRef, useState } from 'react';

import AntdAsyncSelect, { ValueType } from './AntdAsyncSelect';

export default {
  component: AntdAsyncSelect,
  title: 'AntdAsyncSelect',
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle:
      'component which is able to handle async option fethcing',
  },
};

const createMockGet = <T extends unknown>(result: T[], delay = 300) => {
  return () =>
    new Promise<T[]>((resolve) => {
      setTimeout(() => {
        return resolve(result);
      }, delay);
    });
};

const promiseFn = createMockGet<Record<string, string>>([
  { id: '1', name: 'Option 1 (value: 1)' },
  { id: '2', name: 'Option 2 (value: 2)' },
  { id: '3', name: 'Option 3 (value: 3)' },
  { id: '4', name: 'Option 4 (value: 4)' },
]);

export const Default = () => {
  const [values, setValues] = useState<Record<string, ValueType>>();

  const createOnChange = (key: string) => (value: ValueType) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h4>Only value</h4>
        <div>Selected value: {values?.value1}</div>
        <AntdAsyncSelect
          promiseFn={promiseFn}
          value={values?.value1}
          onChange={createOnChange('value1')}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Option In Value</h4>
        <div>Selected value: {JSON.stringify(values?.value2)}</div>
        <AntdAsyncSelect
          optionInValue
          promiseFn={promiseFn}
          value={values?.value2}
          onChange={createOnChange('value2')}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Multiple Mode</h4>
        <div>Selected value: {JSON.stringify(values?.value3)}</div>
        <AntdAsyncSelect
          promiseFn={promiseFn}
          mode="multiple"
          value={values?.value3}
          onChange={createOnChange('value3')}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Multiple Mode Option In Value</h4>
        <div>Selected value: {JSON.stringify(values?.value4)}</div>
        <AntdAsyncSelect
          optionInValue
          mode="multiple"
          promiseFn={promiseFn}
          value={values?.value4}
          onChange={createOnChange('value4')}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Tags Mode</h4>
        <div>Selected value: {JSON.stringify(values?.value5)}</div>
        <AntdAsyncSelect
          mode="tags"
          promiseFn={promiseFn}
          value={values?.value5}
          onChange={createOnChange('value5')}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Tags Mode Option In Value</h4>
        <div>Selected value: {JSON.stringify(values?.value6)}</div>
        <AntdAsyncSelect
          mode="tags"
          optionInValue
          promiseFn={promiseFn}
          value={values?.value6}
          onChange={createOnChange('value6')}
        />
      </div>
    </div>
  );
};

export const WithFormItem = () => {
  const [currentValues, setCurrentValues] = useState<Store>();
  const [form] = Form.useForm();

  const handleValueChange = (changedValues: Store, values: Store) => {
    setCurrentValues(values);
  };

  return (
    <Form onValuesChange={handleValueChange} form={form}>
      <h4>Only value</h4>
      <p>selected: {currentValues?.value1}</p>
      <Form.Item name="value1">
        <AntdAsyncSelect promiseFn={promiseFn} />
      </Form.Item>
      <h4>Option In Value</h4>
      <p>selected: {JSON.stringify(currentValues?.value2)}</p>
      <Form.Item name="value2">
        <AntdAsyncSelect promiseFn={promiseFn} optionInValue />
      </Form.Item>
      <h4>Multiple Mode</h4>
      <p>selected: {JSON.stringify(currentValues?.value3)}</p>
      <Form.Item name="value3">
        <AntdAsyncSelect promiseFn={promiseFn} mode="multiple" />
      </Form.Item>
      <h4>Multiple Mode Option In Value</h4>
      <p>selected: {JSON.stringify(currentValues?.value4)}</p>
      <Form.Item name="value4">
        <AntdAsyncSelect promiseFn={promiseFn} optionInValue mode="multiple" />
      </Form.Item>
      <h4>Tags Mode</h4>
      <p>selected: {JSON.stringify(currentValues?.value5)}</p>
      <Form.Item name="value5">
        <AntdAsyncSelect promiseFn={promiseFn} mode="tags" />
      </Form.Item>
      <h4>Tags Mode Option In Value</h4>
      <p>selected: {JSON.stringify(currentValues?.value6)}</p>
      <Form.Item name="value6">
        <AntdAsyncSelect promiseFn={promiseFn} optionInValue mode="tags" />
      </Form.Item>
    </Form>
  );
};

export const OpenAndCloseSelectProgmatically = () => {
  const selectRef = useRef<Select<SelectValue>>(null);
  const [selected, setSelected] = useState<ValueType>();

  const handleChange = (value: ValueType) => {
    setSelected(value);
  };

  const handleOpen = () => selectRef.current?.focus();
  const handleClose = () => selectRef.current?.blur();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button.Group>
          <Button onClick={handleOpen}>Open</Button>
          <Button onClick={handleClose}>Close</Button>
        </Button.Group>
      </div>
      <AntdAsyncSelect
        promiseFn={promiseFn}
        ref={selectRef}
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
};
