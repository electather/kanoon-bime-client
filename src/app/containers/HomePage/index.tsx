import { StarFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { Sticker } from 'app/components/Widgets/Sticker';
import { selectLoggedInUser } from 'auth/slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { formatAccess } from 'utils';

import { homepageSaga } from './redux/saga';
import { actions, reducer, selectRenewal, sliceKey } from './redux/slice';
import { RenewalList } from './RenewalList';
export function Home() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const { expireList, loading } = useSelector(selectRenewal);
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homepageSaga });

  const dispatch = useDispatch();

  const getList = () => {
    dispatch(actions.fetchExpiryList({ page: 1 }));
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#1abc9c"
            fontColor="#fff"
            description="سطح دسترسی"
            value={formatAccess(loggedInUser?.role)}
            icon={<StarFilled />}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#8e44ad"
            fontColor="#fff"
            description="کل بیمه های ثبت شده"
            value={3}
            icon={<StarFilled />}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#2c3e50"
            fontColor="#fff"
            description="کل خودرو های بیمه شده"
            value={3}
            icon={<StarFilled />}
          />
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#2c3e50"
            fontColor="#fff"
            description="کل افراد بیمه شده"
            value={3}
            icon={<StarFilled />}
          />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
        <Col lg={8} md={24} sm={24} xs={24}>
          <LineChartWidget
            height={500}
            data={chartData.homepage}
            title="فروش های نماینده"
          />
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <LineChartWidget
            title="بیمه های ثبت شده"
            height={500}
            data={chartData.homepage}
          />
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <LineChartWidget
            title="پورسانت بیمه گذار"
            height={500}
            data={chartData.homepage}
          />
        </Col>
      </Row> */}
      <Row gutter={[16, 16]}>
        <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
          <RenewalList
            data={expireList?.tpi}
            loading={loading}
            title="بیمه های شخص ثالث در حال انقضای شما "
          />
        </Col>
        <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
          <RenewalList
            data={expireList?.bii}
            loading={loading}
            title="بیمه های بدنه در حال انقضای شما"
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
