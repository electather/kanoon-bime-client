import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from 'antd';
import { debounce } from 'debounce';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBearerToken } from 'utils';

import { actions as usersActions, selectListState } from '../Users/redux/slice';
import { alphabet } from './constants/alphabet';
import { actions, selectFormData } from './redux/slice';

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
  const { list: usersList, loading: usersListLoading } = useSelector(
    selectListState,
  );
  const [form] = Form.useForm();
  const { loading, error } = useSelector(selectFormData);

  React.useEffect(() => {
    if (error) {
      if (typeof error.message === 'string') {
        message.error({
          content: t(error.message),
          duration: 7,
        });
      } else {
        for (const errorMessage in error.message) {
          message.error({
            content: t(errorMessage),
            duration: 7,
          });
        }
      }
    }
  }, [error, t]);

  const onFinish = values => {
    const { attachment, insurer, ...rest } = values;

    const payload = {
      ...rest,
      attachmentId: attachment
        ? attachment[attachment.length - 1].response.id
        : undefined,
      issuerId: insurer,
    };
    dispatch(actions.create({ data: payload, clearFn: form.resetFields }));
  };

  const onUserSelect = (value: string | number, option: any) => {
    const { firstName, lastName } = option;
    form.setFieldsValue({ ownerName: firstName, ownerLastName: lastName });
  };
  const handleUserSearch = (melliCode: string) => {
    if (melliCode) {
      dispatch(usersActions.fetchList({ melliCode, page: 1 }));
    }
  };

  const { form: VehicleTranslations } = translations.pages.vehicle.newTab;
  return (
    <Form
      {...formItemLayout}
      form={form}
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
        <Select
          showSearch
          showArrow={false}
          onSearch={debounce(handleUserSearch, 500)}
          loading={usersListLoading}
          onSelect={onUserSelect}
        >
          {usersList?.map(val => (
            <Select.Option
              key={val.id}
              value={val.id}
              firstName={val.firstName}
              lastName={val.lastName}
            >
              کد ملی : {val.melliCode} - {val.firstName} {val.lastName}
            </Select.Option>
          ))}
        </Select>
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
      >
        <Input />
      </Form.Item>

      <Form.Item label={t(VehicleTranslations.plateNumber.label())}>
        <Input.Group compact>
          <Form.Item name="plateFirstTwoNumbers" noStyle>
            <InputNumber
              style={{ width: '20%' }}
              placeholder={t(VehicleTranslations.plateNumber.firstTwo())}
              min={10}
              max={99}
            />
          </Form.Item>
          <Form.Item name="plateLetter" noStyle>
            <Select
              style={{ width: '25%' }}
              showSearch
              placeholder={t(VehicleTranslations.plateNumber.letter())}
              filterOption={(input, option) =>
                option?.children.indexOf(input) >= 0
              }
            >
              {Object.keys(alphabet).map(key => (
                <Select.Option key={key} value={key}>
                  {alphabet[key]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="plateLastThreeNumbers" noStyle>
            <InputNumber
              style={{ width: '30%' }}
              placeholder={t(VehicleTranslations.plateNumber.lastThree())}
              min={100}
              max={999}
            />
          </Form.Item>
          <Form.Item name="plateIRNumber" noStyle>
            <InputNumber
              style={{ width: '25%' }}
              placeholder={t(VehicleTranslations.plateNumber.irNum())}
              min={10}
              max={99}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item name="address" label={t(VehicleTranslations.address.label())}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label={t(VehicleTranslations.attachment.label())}>
        <Form.Item
          name="attachment"
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
              {t(VehicleTranslations.attachment.guide())}
            </p>
            <p className="ant-upload-hint">
              {t(VehicleTranslations.attachment.help())}
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          icon={<CheckCircleOutlined />}
        >
          {t(VehicleTranslations.submit())}
        </Button>
      </Form.Item>
    </Form>
  );
}
