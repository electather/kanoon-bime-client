import { Spin, Typography } from 'antd';
import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DailyStatDto } from 'userResponse';
import { formatDate, formatMoney } from 'utils';

import { ChartsWrapper as Wrapper } from './Wrapper';

type Props = {
  data: DailyStatDto[];
  width?: number;
  height?: number;
  title?: string;
  id: string;
  loading?: boolean;
};

const CustomTooltip: any = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${formatMoney(payload[0].value)}`}</p>
        <p className="label">{`${label} : ${formatMoney(payload[1].value)}`}</p>
      </div>
    );
  }

  return null;
};

const CustomTooltipAlt: any = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const DailyChart: React.FC<Props> = React.memo(
  ({ data, width, height, title, id, loading }) => {
    const usableData = data.map(item => ({
      date: formatDate(item.date),
      totalValue: item.totalValue,
      commission: item.commission,
      avgValue: item.avgValue,
      avgCommission: item.avgCommission,
      count: item.count,
    }));
    return (
      <Wrapper hasTitle={!!title}>
        {title && <Typography.Title level={4}>{title}</Typography.Title>}
        <ResponsiveContainer width={width} height={height}>
          <LineChart
            data={usableData}
            syncId={id}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgValue"
              strokeOpacity={1}
              stroke="#2980b9"
              name="ارزش کلی"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="avgCommission"
              strokeOpacity={1}
              stroke="#27ae60"
              name="کمیسیون"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width={width} height={height}>
          <BarChart
            data={usableData}
            syncId={id}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <Tooltip content={<CustomTooltipAlt />} />
            <Bar dataKey="count" name="بیمه های ثبت شده" fill="#7f8c8d" />
          </BarChart>
        </ResponsiveContainer>
      </Wrapper>
    );
  },
);
