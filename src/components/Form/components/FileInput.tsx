import { Input, Button, Space } from 'antd';
import { ChangeEvent, useState, useEffect } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { isFunction } from 'lodash-es';
import { FileAddOutlined } from '@ant-design/icons';

export type FileInputProps = {
  value?: string;
  onChange?: (count: string) => void;
};

export function FileInput(props: FileInputProps) {
  const [value, setValue] = useState<string | undefined>(props.value);

  function changeValue(newValue: string) {
    setValue(newValue);

    if (isFunction(props.onChange)) {
      props.onChange(newValue);
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    changeValue(e.target.value);
  }

  async function onFocus() {
    try {
      const selectd = await open({
        multiple: false,
        directory: true,
      });

      if (selectd) {
        changeValue(selectd);
      }
    } catch (error) {}
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Space.Compact className='w-full'>
      <Input {...props} value={value} onChange={onChange} />

      <Button type='primary' icon={<FileAddOutlined />} onClick={onFocus} />
    </Space.Compact>
  );
}
