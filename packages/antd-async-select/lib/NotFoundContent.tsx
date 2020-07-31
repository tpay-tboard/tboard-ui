import { Spin } from 'antd';
import React from 'react';

const NotFoundContent: React.FC<{
  open: boolean;
  loading: boolean;
}> = ({ open, loading }) => {
  if (!open || !loading) return null;

  return <Spin size="small" />;
};

export default NotFoundContent;
