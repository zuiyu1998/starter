import { SearchOutlined } from '@ant-design/icons';
import { Space, Input, Button } from 'antd';
import { useState } from 'react';

export type ProjectSearchProps = {
  onSearch: (tags: string) => void;
};

export function ProjectSearch(props: ProjectSearchProps) {
  const [text, setText] = useState('');

  return (
    <Space.Compact className='w-full'>
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          props.onSearch(e.target.value);
        }}
      />

      <Button
        type='primary'
        icon={<SearchOutlined />}
        onClick={() => {
          props.onSearch(text);
        }}
      />
    </Space.Compact>
  );
}
