import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
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

export function NewInsuranceRequest() {
  const { t } = useTranslation();
  const onFinish = values => {
    console.log('Received values of form: ', values);
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
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
          {t(FormTranslations.submit())}
        </Button>
      </Form.Item>
    </Form>
  );
}
