import { BaseModal, CustomModelProps } from '/@/components/Modal';
import { FileInput } from '/@/components/Form/components/FileInput';
import { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { StarterProjectCreate, StarterProject } from '/#/abi/project';
import { projectCommand } from '/@/api/project';
import { iconData } from '/@/components/Icon';
import { useModalInner } from '/@/components/Modal/useModal';
import { pick } from 'lodash-es';
import { useExecuterStore } from '/@/store/src/executer';

type FieldType = StarterProjectCreate;

function covertItemToForm(item: StarterProject): Partial<FieldType> {
  let tmp: Partial<FieldType> = pick(item.meta, [
    'name',
    'description',
    'icon',
    'tags',
    'path',
    'exe_path',
  ]);

  tmp['executer'] = item.executer;

  return tmp;
}

export function ProjectCreateModal(
  props: CustomModelProps & { onSuccess?: () => void }
) {
  const executerStore = useExecuterStore();

  const [executerOptions] = useState(executerStore.executerItems);
  const [iconOptions] = useState(
    iconData.map((item) => {
      return { label: item, value: item };
    })
  );

  const [form] = Form.useForm<FieldType>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [_id, setId] = useState(-1);

  const { register } = useModalInner(props, (data) => {
    if (data?.isUpdate) {
      setIsUpdate(true);

      setId(data?.item?.id ?? -1);

      form.setFieldsValue(covertItemToForm(data?.item ?? {}));
    } else {
      setIsUpdate(false);
    }
  });

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      if (!isUpdate) {
        await projectCommand.createProject(values);

        props.onSuccess && props.onSuccess();
      } else {
        const update = Object.assign(values, { id: _id });

        await projectCommand.updateProject(update);
        props.onSuccess && props.onSuccess();
      }
    } catch (error) {}
  };

  return (
    <BaseModal {...props} register={register} onOk={onFinish}>
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
          <Select options={iconOptions} />
        </Form.Item>

        <Form.Item<FieldType>
          label='标签'
          name='tags'
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
          label='执行器'
          name='executer'
          rules={[{ required: true, message: '请输入程序路径' }]}
        >
          <Select options={executerOptions} />
        </Form.Item>

        <Form.Item<FieldType>
          label='程序路径'
          name='exe_path'
          rules={[{ required: true, message: '请输入程序路径' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}
