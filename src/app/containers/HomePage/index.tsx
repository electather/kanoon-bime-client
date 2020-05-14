import { StarFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { LineChartWidget } from 'app/components/Widgets/Charts/LineChart';
import { Sticker } from 'app/components/Widgets/Sticker';
import React from 'react';
import chartData from 'utils/mock/chartData.json';
export function Home() {
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#1abc9c"
            fontColor="#fff"
            description="someDesc"
            value={3}
            icon={<StarFilled />}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#8e44ad"
            fontColor="#fff"
            description="someDesc"
            value={3}
            icon={<StarFilled />}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Sticker
            backgroundColor="#2c3e50"
            fontColor="#fff"
            description="someDesc"
            value={3}
            icon={<StarFilled />}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LineChartWidget
            height={500}
            data={chartData.homepage}
            title="چارت شماره 1"
          />
        </Col>{' '}
        <Col lg={12}>
          <LineChartWidget height={500} data={chartData.homepage} />
        </Col>
      </Row>
    </PageContainer>
  );
}
