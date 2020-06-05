import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Table } from 'antd';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { Key, SorterResult } from 'antd/lib/table/interface';
import { translations } from 'locales/i18n';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { VehicleResponse } from 'userResponse';

import { alphabet } from './constants/alphabet';
import { actions, selectListState } from './redux/slice';

export function InsuranceList() {
  const { t } = useTranslation();
  const { table } = translations.pages.vehicle.dataTab;
  const { list, paginationData, loading } = useSelector(selectListState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchList({ page: 1 }));
  }, [dispatch]);

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
              icon={<SearchOutlined />}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
    dispatch(
      actions.fetchList({
        page: pagination.current || 1,
        take: pagination.pageSize || 10,
      }),
    );

    console.log(pagination, filters, sorter);
  };

  return (
    <Table
      rowKey={record => record.id}
      onChange={handleTableChange}
      dataSource={list}
      loading={loading}
      pagination={{
        defaultCurrent: 1,
        total: paginationData?.itemCount,
        showSizeChanger: true,
        hideOnSinglePage: false,
        showTotal: total => t(table.general.found(), { items: total }),
      }}
    >
      <Table.Column
        title={t(table.headers.insurer())}
        dataIndex="insurer"
        width="20%"
        render={(text, record: VehicleResponse) => (
          <span key={record.insurer?.id}>
            {record.insurer?.firstName} {record.insurer?.lastName}
          </span>
        )}
      />
      <Table.Column
        title={t(table.headers.owner())}
        dataIndex="owner"
        width="20%"
        // {...getColumnSearchProps(orgOpts)}
        render={(text, record: VehicleResponse) => (
          <span key={record.id}>
            {record.ownerName} {record.ownerLastName}
          </span>
        )}
      />
      <Table.Column
        title={t(table.headers.engineNumber())}
        dataIndex="engineNumber"
        width="15%"
        {...getColumnSearchProps()}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.chassisNumber())}
        dataIndex="chassisNumber"
        width="15%"
        {...getColumnSearchProps()}
        // render={(text, record) => (
        //   <span key={record.to?.id}>{record.to?.name}</span>
        // )}
      />
      <Table.Column
        title={t(table.headers.plateNumber())}
        dataIndex="plateNumber"
        width="15%"
        render={(text, record: VehicleResponse) => (
          <span key={record.id}>
            {record.plateFirstTwoNumbers} {alphabet[record.plateLetter]}{' '}
            {record.plateLastThreeNumbers}-{record.plateIRNumber}
          </span>
        )}
      />
      <Table.Column
        title={t(table.headers.actions())}
        width="15%"
        render={(text, record: VehicleResponse) => (
          <span>
            <Button onClick={() => dispatch(actions.fetchById(record.id))}>
              نمایش جزئیات
            </Button>
          </span>
        )}
      />
    </Table>
  );
}
