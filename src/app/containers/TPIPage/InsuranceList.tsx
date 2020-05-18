import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Table } from 'antd';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { Key, SorterResult } from 'antd/lib/table/interface';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function InsuranceList() {
  const { t } = useTranslation();
  const { table } = translations.pages.thirdPartyInsurance.dataTab;

  let searchInput: Input | null = null;
  const getColumnSearchProps = (options: object[] = []) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        {options?.length > 0 ? (
          <Select
            loading={options.length === 0}
            showSearch
            size="small"
            placeholder="جست و جو"
            defaultActiveFirstOption={false}
            showArrow={false}
            allowClear={true}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            filterOption={false}
            notFoundContent={null}
            onChange={value => {
              setSelectedKeys(value ? [value] : []);
              confirm();
            }}
          >
            {options.map((d: any) => (
              <Select.Option key={d.id} value={d.id}>
                {d.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder="جست و جو"
            value={selectedKeys[0]}
            onPressEnter={() => confirm()}
            onChange={e => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
        )}
        {options?.length === 0 && (
          <React.Fragment>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon="search"
              size="small"
              style={{ width: 90, marginLeft: 8 }}
            >
              بگرد
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              ریست
            </Button>
          </React.Fragment>
        )}
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        type="search"
        style={{ color: filtered ? '#1890ff' : undefined }}
      />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible && options?.length === 0) {
        setTimeout(() => searchInput?.select());
      }
    },
  });

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    console.log(pagination, filters, sorter);
  };

  return (
    <Table
      rowKey={record => record.id}
      onChange={handleTableChange}
      dataSource={[{ id: '1' }]}
      pagination={{
        defaultCurrent: 1,
        total: 5,
        showSizeChanger: true,
        hideOnSinglePage: false,
        showTotal: total => t(table.general.found(), { items: total }),
      }}
    >
      <Table.Column
        title={t(table.headers.bimeNumber())}
        dataIndex="bimeNumber"
        width="10%"
        {...getColumnSearchProps()}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.Insurer())}
        dataIndex="age"
        width="25%"
        // {...getColumnSearchProps(orgOpts)}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.startDate())}
        dataIndex="age"
        width="15%"
        // {...getColumnSearchProps(orgOpts)}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.endDate())}
        dataIndex="age"
        width="15%"
        // {...getColumnSearchProps(orgOpts)}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.price())}
        dataIndex="age"
        width="10%"
        {...getColumnSearchProps()}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.actions())}
        width="30%"
        render={() => (
          <span>
            <Button>نمایش جزئیات</Button>
          </span>
        )}
      />
    </Table>
  );
}
