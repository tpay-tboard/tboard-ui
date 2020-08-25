import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { useState } from 'react';

import AntdInputNumber from './AntdInputNumber';

export default {
  component: AntdInputNumber,
  title: 'AntdInputNumber',
  excludeStories: /.*Data$/,
  parameters: {
    componentSubtitle:
      'component which enhance antd input to be used as inputNumber',
  },
};

export const Default = () => {
  const [values, setValues] = useState<Record<string, number>>({});
  const [form] = Form.useForm();

  const handleValueChange = (_: Store, values: Store) => {
    setValues(values);
  };

  return (
    <Form form={form} onValuesChange={handleValueChange}>
      <div style={{ marginBottom: 16 }}>
        <h4>Number without comma</h4>
        <p>Current value: {values.input0}</p>
        <Form.Item name="input0">
          <AntdInputNumber withComma={false} />
        </Form.Item>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Number with comma</h4>
        <p>Current value: {values.input1}</p>
        <Form.Item name="input1">
          <AntdInputNumber />
        </Form.Item>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Minimum & Maximum Values</h4>
        <p>Try to type less than 1 or greater than 10 and trigger blur event</p>
        <p>Current value: {values.input2}</p>
        <Form.Item
          name="input2"
          rules={[
            {
              min: 1,
              type: 'number',
              message: 'Minimum value is 1',
            },
            {
              max: 10,
              type: 'number',
              message: 'Maximum value is 10',
            },
          ]}
        >
          <AntdInputNumber min={1} max={10} />
        </Form.Item>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Step Buttons</h4>
        <p>Current value: {values.input3}</p>
        <Form.Item name="input3">
          <AntdInputNumber showStepButtons step={1000} />
        </Form.Item>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h4>Won Currency Input</h4>
        <p>Current value: {values.input4}</p>
        <Form.Item name="input4">
          <AntdInputNumber prefix="₩" />
        </Form.Item>
      </div>
    </Form>
  );
};
