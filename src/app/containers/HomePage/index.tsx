import { StarFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { LineChartWidget } from 'app/components/Widgets/Charts/LineChart';
import { Sticker } from 'app/components/Widgets/Sticker';
import { selectLoggedInUser } from 'auth/slice';
import React from 'react';
import { useSelector } from 'react-redux';
import chartData from 'utils/mock/chartData.json';
export function Home() {
  const loggedInUser = useSelector(selectLoggedInUser);
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#1abc9c"
            fontColor="#fff"
            description="سطح دسترسی"
            value={!loggedInUser ? 'در حال بارگذاری' : loggedInUser.role}
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
      <Row gutter={[16, 16]}>
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
      </Row>
    </PageContainer>
  );
}
