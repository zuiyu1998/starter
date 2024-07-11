import { Input } from 'antd';
import type { InputRef } from 'antd';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { isFunction } from 'lodash-es';

export type FileInputProps = {
  value?: string;
  onChange?: (count: string) => void;
};

export function FileInput(props: FileInputProps) {
  const [value, setValue] = useState<string | undefined>(props.value);

  const inputRef = useRef<InputRef>(null);

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
      inputRef.current?.blur();
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
    <Input
      {...props}
      onFocus={onFocus}
      value={value}
      onChange={onChange}
      ref={inputRef}
    />
  );
}
