import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export function NewInsuranceRequest() {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  const { form: UsersTranslations } = translations.pages.users.newTab;
  return (
    <Form
      {...formItemLayout}
      name="newUser"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item label={t(UsersTranslations.fullName.label())}>
        <Input.Group compact>
          <Form.Item
            name="ownerName"
            noStyle
            rules={[
              {
                required: true,
                message: t(UsersTranslations.fullName.emptyError()),
              },
            ]}
          >
            <Input
              style={{ width: '50%' }}
              placeholder={t(UsersTranslations.fullName.fName())}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            noStyle
            rules={[
              {
                required: true,
                message: t(UsersTranslations.fullName.emptyError()),
              },
            ]}
          >
            <Input
              style={{ width: '50%' }}
              placeholder={t(UsersTranslations.fullName.lName())}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name="melliCode"
        label={t(UsersTranslations.melliCode.label())}
        rules={[
          {
            required: true,
            message: t(UsersTranslations.melliCode.emptyError()),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label={t(UsersTranslations.phone.label())}
        rules={[
          {
            required: true,
            message: t(UsersTranslations.phone.emptyError()),
          },
        ]}
      >
        <Input addonBefore="+98" />
      </Form.Item>
      <Form.Item label={t(UsersTranslations.attachment.label())}>
        <Form.Item
          name="attachment"
          valuePropName="attachment"
          getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: t(UsersTranslations.attachment.emptyError()),
            },
          ]}
        >
          <Upload.Dragger
            fileList={fileList}
            name="attachment"
            action="/upload.do"
            onChange={handleUploadChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t(UsersTranslations.attachment.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(UsersTranslations.attachment.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
          {t(UsersTranslations.submit())}
        </Button>
      </Form.Item>
    </Form>
  );
}
