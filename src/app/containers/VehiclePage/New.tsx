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

  const { form: VehicleTranslations } = translations.pages.vehicle.newTab;
  return (
    <Form
      {...formItemLayout}
      name="newInsurance"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="insurer"
        label={t(VehicleTranslations.insurer.label())}
        rules={[
          {
            required: true,
            message: t(VehicleTranslations.insurer.emptyError()),
          },
        ]}
      >
        <Select></Select>
      </Form.Item>
      <Form.Item label={t(VehicleTranslations.owner.label())}>
        <Input.Group compact>
          <Form.Item
            name="ownerName"
            noStyle
            rules={[
              {
                required: true,
                message: t(VehicleTranslations.owner.emptyError()),
              },
            ]}
          >
            <Input
              style={{ width: '50%' }}
              placeholder={t(VehicleTranslations.owner.phName())}
            />
          </Form.Item>
          <Form.Item
            name="ownerLastName"
            noStyle
            rules={[
              {
                required: true,
                message: t(VehicleTranslations.owner.emptyError()),
              },
            ]}
          >
            <Input
              style={{ width: '50%' }}
              placeholder={t(VehicleTranslations.owner.phLName())}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name="engineNumber"
        label={t(VehicleTranslations.engineNumber.label())}
        rules={[
          {
            required: true,
            message: t(VehicleTranslations.engineNumber.emptyError()),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="chassisNumber"
        label={t(VehicleTranslations.chassisNumber.label())}
        rules={[
          {
            required: true,
            message: t(VehicleTranslations.chassisNumber.emptyError()),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={t(VehicleTranslations.plateNumber.label())}>
        <Input.Group compact>
          <Form.Item
            name="plateFirstTwoNumbers"
            noStyle
            rules={[
              {
                required: true,
                message: t(VehicleTranslations.plateNumber.emptyError()),
              },
            ]}
          >
            <InputNumber
              style={{ width: '20%' }}
              placeholder={t(VehicleTranslations.plateNumber.firstTwo())}
              min={10}
              max={99}
            />
          </Form.Item>
          <Form.Item
            name="plateLetter"
            noStyle
            rules={[
              {
                required: true,
                message: t(VehicleTranslations.plateNumber.emptyError()),
              },
            ]}
          >
            <Select
              style={{ width: '25%' }}
              placeholder={t(VehicleTranslations.plateNumber.letter())}
            />
          </Form.Item>
          <Form.Item
            name="plateLastThreeNumbers"
            noStyle
            rules={[
              {
                required: true,
                message: t(VehicleTranslations.plateNumber.emptyError()),
              },
            ]}
          >
            <InputNumber
              style={{ width: '30%' }}
              placeholder={t(VehicleTranslations.plateNumber.lastThree())}
              min={100}
              max={999}
            />
          </Form.Item>
          <Form.Item
            name="plateIRNumber"
            noStyle
            rules={[
              {
                required: true,
                message: t(VehicleTranslations.plateNumber.emptyError()),
              },
            ]}
          >
            <InputNumber
              style={{ width: '25%' }}
              placeholder={t(VehicleTranslations.plateNumber.irNum())}
              min={10}
              max={99}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label={t(VehicleTranslations.attachment.label())}>
        <Form.Item
          name="attachment"
          valuePropName="attachment"
          getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: t(VehicleTranslations.attachment.emptyError()),
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
              {t(VehicleTranslations.attachment.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(VehicleTranslations.attachment.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item
        name="address"
        label={t(VehicleTranslations.address.label())}
        rules={[
          {
            required: true,
            message: t(VehicleTranslations.address.emptyError()),
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
          {t(VehicleTranslations.submit())}
        </Button>
      </Form.Item>
    </Form>
  );
}
