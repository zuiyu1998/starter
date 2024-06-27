import { Input } from 'antd';
import type { InputRef } from 'antd';
import { ChangeEvent, useRef, useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';

export type FileInputProps = {
  value?: string;
  onChange?: (count: number) => void;
};

export function FileInput(props: FileInputProps) {
  const [value, setValue] = useState<string | undefined>(props.value);

  const inputRef = useRef<InputRef>(null);
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function onFocus() {
    try {
      inputRef.current?.blur();
      const selectd = await open({
        multiple: false,
        directory: true,
      });

      if (selectd) {
        setValue(selectd);
      }
    } catch (error) {}
  }

  return (
    <Input
      {...props}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      ref={inputRef}
    />
  );
}
