import React, { useState } from 'react';
import { Table, DatePicker, Input, Select, Button } from 'antd';

const { Option } = Select;

const CustomerCareTable = () => {
  const [dataSource, setDataSource] = useState([
    { key: 1, date: null, result: '', status: '' },
  ]);

  const handleAddRow = () => {
    setDataSource([
      ...dataSource,
      { key: dataSource.length + 1, date: null, result: '', status: '' },
    ]);
  };

  const handleInputChange = (key, field, value) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, [field]: value } : item
    );
    setDataSource(newData);
  };

  const columns = [
    {
      title: 'Lần',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => (
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          onChange={(date, dateString) =>
            handleInputChange(record.key, 'date', dateString)
          }
        />
      ),
    },
    {
      title: 'Kết quả chăm sóc',
      dataIndex: 'result',
      key: 'result',
      render: (_, record) => (
        <Input
          placeholder="Kết quả chăm sóc"
          value={record.result}
          onChange={(e) =>
            handleInputChange(record.key, 'result', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Cập nhật trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Select
          placeholder="Cập nhật trạng thái"
          value={record.status}
          style={{ width: '100%' }}
          onChange={(value) => handleInputChange(record.key, 'status', value)}
        >
          <Option value="follow-up">Gọi lại lần sau</Option>
          <Option value="trial-request">Yêu cầu trải nghiệm</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        summary={() => (
          <tr>
            <td colSpan={4}>
              <Button type="dashed" block onClick={handleAddRow}>
                + Thêm
              </Button>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default CustomerCareTable;
