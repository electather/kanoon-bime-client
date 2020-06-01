import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBearerToken } from 'utils';

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

  const {
    form: FormTranslations,
  } = translations.pages.thirdPartyInsurance.newTab;
  return (
    <Form
      {...formItemLayout}
      name="newInsurance"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="issuer"
        label={t(FormTranslations.issuer.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.issuer.emptyError()),
          },
        ]}
      >
        <Select></Select>
      </Form.Item>

      <Form.Item
        name="bimeNumber"
        label={t(FormTranslations.bimeNumber.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.bimeNumber.emptyError()),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="startDate"
        label={t(FormTranslations.startDate.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.startDate.emptyError()),
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="endDate"
        label={t(FormTranslations.startDate.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.startDate.emptyError()),
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="isCash"
        label={t(FormTranslations.isCash.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.isCash.emptyError()),
          },
        ]}
      >
        <Select>
          <Select.Option value="Cash">
            {t(FormTranslations.isCash.options.cash())}
          </Select.Option>
          <Select.Option value="Installments">
            {t(FormTranslations.isCash.options.Installments())}
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="fullAmount"
        label={t(FormTranslations.fullAmount.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.fullAmount.emptyError()),
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name="insurerId"
        label={t(FormTranslations.insurerId.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.insurerId.emptyError()),
          },
        ]}
      >
        <Select></Select>
      </Form.Item>
      <Form.Item
        name="vehicleId"
        label={t(FormTranslations.vehicleId.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.vehicleId.emptyError()),
          },
        ]}
      >
        <Select></Select>
      </Form.Item>
      <Form.Item label={t(FormTranslations.attachment.label())}>
        <Form.Item
          name="attachment"
          valuePropName="attachment"
          getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: t(FormTranslations.attachment.emptyError()),
            },
          ]}
        >
          <Upload.Dragger
            fileList={fileList}
            name="file"
            headers={{ Authorization: getBearerToken() }}
            action={process.env.REACT_APP_BASE_URL + 'file'}
            onChange={handleUploadChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t(FormTranslations.attachment.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(FormTranslations.attachment.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
          {t(FormTranslations.submit())}
        </Button>
      </Form.Item>
    </Form>
  );
}
