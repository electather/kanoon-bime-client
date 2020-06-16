import { Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { UserData } from 'userResponse';

type RenewalListData = {
  id: string;
  bimeNumber: string;
  endDate: Date;
  insurer: UserData;
};
export const RenewalList: React.FC<{
  data: RenewalListData[];
  loading: boolean;
}> = ({ data, loading }) => (
  <Table rowKey={record => record.id} dataSource={data} loading={loading}>
    <Table.Column
      title="شماره بیمه"
      dataIndex="bimeNumber"
      width="30%"
      // render={(text, record) => (
      //   <span key={record.to?.id}>{record.to?.name}</span>
      // )}
    />
    <Table.Column
      title="نام بیمه گذار"
      width="30%"
      render={(text, record: RenewalListData) => (
        <span>
          {record.insurer.firstName} {record.insurer.lastName}
        </span>
      )}
    />
    <Table.Column
      title="تلفن همراه"
      width="30%"
      render={(text, record: RenewalListData) => (
        <a href={`tel:+98${record.insurer.phone}`}>+98{record.insurer.phone}</a>
      )}
    />
    <Table.Column
      title="سر رسید"
      width="10%"
      render={(text, record: RenewalListData) => (
        <span>
          {moment.duration(moment(record.endDate).diff(moment())).asDays()}
        </span>
      )}
    />
  </Table>
);
