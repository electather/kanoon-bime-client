import { Table } from 'antd';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { Key, SorterResult } from 'antd/lib/table/interface';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function InsuranceList() {
  const { t } = useTranslation();
  const { table } = translations.pages.thirdPartyInsurance.dataTab;

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    console.log(pagination, filters, sorter);
  };

  const columns = [
    {
      title: t(table.headers.bimeNumber()),
      dataIndex: 'bimeNumber',
    },
    {
      title: t(table.headers.bimeNumber()),
      dataIndex: 'age',
    },
    {
      title: t(table.headers.startDate()),
      dataIndex: 'address',
    },
    {
      title: t(table.headers.endDate()),
      dataIndex: 'address',
    },
    {
      title: t(table.headers.price()),
      dataIndex: 'address',
    },
    {
      title: t(table.headers.actions()),
      dataIndex: 'address',
    },
  ];

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      onChange={handleTableChange}
      dataSource={[{ id: '1' }]}
      pagination={{
        defaultCurrent: 1,
        total: 5,
        showSizeChanger: true,
        hideOnSinglePage: false,
        showTotal: total => t(table.general.found(), { items: total }),
      }}
    />
  );
}
