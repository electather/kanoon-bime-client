import { SearchOutlined } from '@ant-design/icons';
import { Button, Descriptions, Drawer, Input, Select, Table } from 'antd';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { Key, SorterResult } from 'antd/lib/table/interface';
import { translations } from 'locales/i18n';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from 'userResponse';

import { actions, selectDrawerData, selectListState } from './redux/slice';

export function List() {
  const { t } = useTranslation();
  const { table, findOne } = translations.pages.users.dataTab;
  const { list, paginationData, loading } = useSelector(selectListState);
  const selectedUser = useSelector(selectDrawerData);
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
        melliCode: filters.melliCode?.[0].toString(),
      }),
    );
    console.log(pagination, filters, sorter);
  };

  return (
    <React.Fragment>
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
          title={t(table.headers.avatar())}
          dataIndex="avatar"
          width="10%"
          // render={(text, record) => (
          //   <span key={record.to?.id}>{record.to?.name}</span>
          // )}
        />
        <Table.Column
          title={t(table.headers.fullName())}
          dataIndex="fullName"
          width="30%"
          // {...getColumnSearchProps(orgOpts)}
          render={(text, record: UserData) => (
            <span>
              {record.firstName} {record.lastName}
            </span>
          )}
        />
        <Table.Column
          title={t(table.headers.melliCode())}
          dataIndex="melliCode"
          width="20%"
          {...getColumnSearchProps()}
          // {...getColumnSearchProps(orgOpts)}
          // render={(text, record) => (
          //   <span key={record.to?.id}>{record.to?.name}</span>
          // )}
        />
        <Table.Column
          title={t(table.headers.role())}
          dataIndex="role"
          width="15%"
          // {...getColumnSearchProps(orgOpts)}
          // render={(text, record) => (
          //   <span key={record.to?.id}>{record.to?.name}</span>
          // )}
        />
        <Table.Column
          title={t(table.headers.actions())}
          width="25%"
          render={(text, record: UserData) => (
            <span>
              <Button onClick={() => dispatch(actions.fetchById(record.id))}>
                نمایش جزئیات
              </Button>
            </span>
          )}
        />
      </Table>
      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={() => dispatch(actions.clearSelectedUser())}
        visible={!!selectedUser}
      >
        <Descriptions title={t(findOne.title())} bordered column={2}>
          <Descriptions.Item label={t(findOne.elements.avatar())} span={2}>
            img
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.firstName())}>
            {selectedUser?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.firstName())}>
            {selectedUser?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.role())}>
            {selectedUser?.role}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.phone())}>
            +98{selectedUser?.phone}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.melliCode())}>
            {selectedUser?.info?.melliCode}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.address())}>
            {selectedUser?.info?.address}
          </Descriptions.Item>
          <Descriptions.Item
            label={t(findOne.elements.melliCardScanFront())}
            span={2}
          >
            img
          </Descriptions.Item>
          <Descriptions.Item
            label={t(findOne.elements.melliCardScanBack())}
            span={2}
          >
            img
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.payrollScan())} span={2}>
            img
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </React.Fragment>
  );
}
