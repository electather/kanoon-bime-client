import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBearerToken } from 'utils';
import { melliCodeValidator } from 'utils/validation';

import { selectFormData } from './redux/slice';
import { actions } from './redux/slice';

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
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export function NewInsuranceRequest() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(selectFormData);

  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Received values of form: ', values);
    const {
      avatar,
      melliCardScanBack,
      melliCardScanFront,
      payrollScan,
      ...rest
    } = values;

    const payload = {
      ...rest,
      avatarId: avatar ? avatar[avatar.length - 1].response.id : undefined,
      melliCardScanFrontId: melliCardScanFront
        ? melliCardScanFront[melliCardScanFront.length - 1].response.id
        : undefined,
      melliCardScanBackId: melliCardScanBack
        ? melliCardScanBack[melliCardScanBack.length - 1].response.id
        : undefined,
      payrollScanId: payrollScan
        ? payrollScan[payrollScan.length - 1].response.id
        : undefined,
    };

    console.log('payload: ', payload);
    dispatch(actions.create({ data: payload, clearFn: form.resetFields }));
  };

  const { form: UsersTranslations } = translations.pages.users.newTab;
  return (
    <Form
      {...formItemLayout}
      name="newUser"
      form={form}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item label={t(UsersTranslations.fullName.label())}>
        <Input.Group compact>
          <Form.Item
            name="firstName"
            noStyle
            rules={[
              {
                required: true,
                whitespace: true,
                message: t(UsersTranslations.fullName.emptyError()),
              },
              {
                pattern: /^[\u0600-\u06FF\s]+$/,
                message: t(UsersTranslations.fullName.invalidError()),
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
                whitespace: true,
                message: t(UsersTranslations.fullName.emptyError()),
              },
              {
                pattern: /^[\u0600-\u06FF\s]+$/,
                message: t(UsersTranslations.fullName.invalidError()),
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
          {
            validator: (_, value) =>
              melliCodeValidator(value)
                ? Promise.resolve()
                : Promise.reject(t(UsersTranslations.melliCode.invalidError())),
          },
        ]}
      >
        <Input maxLength={10} />
      </Form.Item>
      <Form.Item
        name="phone"
        label={t(UsersTranslations.phone.label())}
        rules={[
          {
            required: true,
            message: t(UsersTranslations.phone.emptyError()),
          },
          {
            pattern: /^9[0|1|2|3][0-9]{8}$/,
            message: t(UsersTranslations.phone.invalidError()),
          },
        ]}
      >
        <Input addonAfter="+98" maxLength={10} />
      </Form.Item>
      <Form.Item name="address" label={t(UsersTranslations.address.label())}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label={t(UsersTranslations.melliCardScanFront.label())}>
        <Form.Item
          name="melliCardScanFront"
          valuePropName="melliCardScanFront"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="file"
            headers={{ Authorization: getBearerToken() }}
            action={process.env.REACT_APP_BASE_URL + 'file'}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t(UsersTranslations.melliCardScanFront.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(UsersTranslations.melliCardScanFront.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item label={t(UsersTranslations.melliCardScanBack.label())}>
        <Form.Item
          name="melliCardScanBack"
          valuePropName="melliCardScanBack"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="file"
            headers={{ Authorization: getBearerToken() }}
            action={process.env.REACT_APP_BASE_URL + 'file'}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t(UsersTranslations.melliCardScanBack.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(UsersTranslations.melliCardScanBack.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item label={t(UsersTranslations.payrollScan.label())}>
        <Form.Item
          name="payrollScan"
          valuePropName="attachment"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="file"
            headers={{ Authorization: getBearerToken() }}
            action={process.env.REACT_APP_BASE_URL + 'file'}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t(UsersTranslations.payrollScan.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(UsersTranslations.payrollScan.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item label={t(UsersTranslations.avatar.label())}>
        <Form.Item
          name="avatar"
          valuePropName="attachment"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="file"
            headers={{ Authorization: getBearerToken() }}
            action={process.env.REACT_APP_BASE_URL + 'file'}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t(UsersTranslations.avatar.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(UsersTranslations.avatar.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={<CheckCircleOutlined />}
          loading={loading}
        >
          {t(UsersTranslations.submit())}
        </Button>
      </Form.Item>
    </Form>
  );
}
