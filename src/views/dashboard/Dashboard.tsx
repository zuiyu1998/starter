import { useCallback, useEffect, useState } from 'react';
import { StarterProject, StarterProjectCreate } from '/#/abi/project';
import { ProjectItem } from './ProjectItem';

import { FloatButton, Form, Input, Select } from 'antd';
import { BaseModal, useModal } from '/@/components/Modal';
import { FileInput } from '/@/components/Form/components/FileInput';
import { projectCommand } from '/@/api/project';
import { FolderAddOutlined } from '@ant-design/icons';

type FieldType = StarterProjectCreate;

export function Dashboard() {
  const [list, setList] = useState<StarterProject[]>([]);

  const [executerOptions] = useState([{ label: '环境变量', value: 2 }]);

  const [form] = Form.useForm<FieldType>();

  const onFinish = async () => {
    try {
      const create = await form.validateFields();
      await projectCommand.createProject(create);

      await _getData();

      closeModal();
    } catch (error) {}
  };

  const {
    register,
    method: { openModal, closeModal },
  } = useModal();

  const _getData = useCallback(async () => {
    try {
      const res = await projectCommand.getProjectList(0, 50);
      setList(res.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    _getData();
  }, [_getData]);

  function onAdd() {
    openModal();
  }

  async function onOpen(uuid: string) {
    try {
      await projectCommand.executeProject(uuid);
    } catch (error) {}
  }
  async function onDelete(uuid: string) {
    try {
      await projectCommand.deleteProject(uuid);
      await _getData();
    } catch (error) {}
  }

  return (
    <div className='h-full w-full bg-slate-50'>
      <div className='py-4'>
        {list.map((item) => {
          return (
            <ProjectItem
              item={item}
              key={item.meta.uuid}
              onOpen={onOpen}
              onDelete={onDelete}
            />
          );
        })}
      </div>
      <FloatButton icon={<FolderAddOutlined />} onClick={onAdd}>
        添加
      </FloatButton>

      <BaseModal register={register} onOk={onFinish}>
        <Form
          name='project_crete'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          autoComplete='off'
          form={form}
        >
          <Form.Item<FieldType>
            label='名称'
            name='name'
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='描述'
            name='description'
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='图标'
            name='icon'
            rules={[{ required: true, message: '请输入图标' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='项目路径'
            name='path'
            rules={[{ required: true, message: '请输入项目路径' }]}
          >
            <FileInput />
          </Form.Item>

          <Form.Item<FieldType>
            label='程序路径'
            name='exe_path'
            rules={[{ required: true, message: '请输入程序路径' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='执行器'
            name='executer'
            rules={[{ required: true, message: '请输入程序路径' }]}
          >
            <Select options={executerOptions} />
          </Form.Item>
        </Form>
      </BaseModal>
    </div>
  );
}
