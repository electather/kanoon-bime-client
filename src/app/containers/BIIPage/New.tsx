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
import { debounce } from 'debounce';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBearerToken } from 'utils';

import {
  actions as usersActions,
  selectListState as usersList,
} from '../Users/redux/slice';
import {
  actions as vehicleActions,
  selectListState as vehicleList,
} from '../VehiclePage/redux/slice';
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
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export function NewInsuranceRequest() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { list: usersListData, loading: usersListLoading } = useSelector(
    usersList,
  );
  const { list: vehicleListData, loading: vehicleListLoading } = useSelector(
    vehicleList,
  );

  const onFinish = values => {
    console.log('Received values of form: ', values);

    const { attachment, insurer, vehicle, isCash, ...rest } = values;

    const payload = {
      ...rest,
      attachmentId: attachment[attachment.length - 1].response.id,
      insurerId: insurer,
      vehicleId: vehicle,
      isCash: isCash === 'Cash',
    };

    console.log('payload: ', payload);
    dispatch(actions.create({ data: payload, clearFn: form.resetFields }));
  };

  const handleUserSearch = (melliCode: string) => {
    if (melliCode) {
      dispatch(usersActions.fetchList({ melliCode, page: 1 }));
    }
  };

  const handleVehicleSearch = (chassisNumber: string) => {
    if (chassisNumber) {
      dispatch(vehicleActions.fetchList({ chassisNumber, page: 1 }));
    }
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
      form={form}
    >
      <Form.Item
        name="insurance"
        label={t(FormTranslations.issuer.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.issuer.emptyError()),
          },
        ]}
      >
        <Select>
          <Select.Option value="IRAN_INSURANCE">بیمه ایران</Select.Option>
          <Select.Option value="KOSAR_INSURANCE">بیمه کوثر</Select.Option>
        </Select>
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
        name="insurer"
        label={t(FormTranslations.insurerId.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.insurerId.emptyError()),
          },
        ]}
      >
        <Select
          showSearch
          showArrow={false}
          onSearch={debounce(handleUserSearch, 500)}
          loading={usersListLoading}
        >
          {usersListData?.map(val => (
            <Select.Option key={val.id} value={val.id}>
              کد ملی : {val.melliCode} - {val.firstName} {val.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="vehicle"
        label={t(FormTranslations.vehicleId.label())}
        rules={[
          {
            required: true,
            message: t(FormTranslations.vehicleId.emptyError()),
          },
        ]}
      >
        <Select
          showSearch
          showArrow={false}
          onSearch={debounce(handleVehicleSearch, 500)}
          loading={vehicleListLoading}
        >
          {vehicleListData?.map(val => (
            <Select.Option key={val.id} value={val.id}>
              شماره شاسی : {val.chassisNumber}- به نام : {val.ownerName}{' '}
              {val.ownerLastName}
            </Select.Option>
          ))}
        </Select>
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
            name="file"
            headers={{ Authorization: getBearerToken() }}
            action={process.env.REACT_APP_BASE_URL + 'file'}
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
