import React from 'react'
import { Table, DatePicker, Input, Select, Button } from 'antd'

const { Option } = Select

const CustomerCareTable = ({ comments, setComments, status }) => {
  const handleAddRow = () => {
    const newComments = [
      ...comments,
      { key: comments.length + 1, time: null, title: '', status_id: '' }
    ]
    setComments(newComments)
  }

  const handleInputChange = (key, field, value) => {
    const newComments = comments.map((item, index) =>
      index + 1 === key ? { ...item, [field]: value } : item
    )
    setComments(newComments)
    console.log(comments)
  }

  const columns = [
    {
      title: 'Lần',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => <div style={{ textAlign: 'center' }}>{index + 1}</div>
    },
    {
      title: 'Ngày',
      dataIndex: 'time',
      key: 'time',
      render: (_, record, index) => (
        <DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
      )
    },
    {
      title: 'Kết quả chăm sóc',
      dataIndex: 'title',
      key: 'title',
      render: (_, record, index) => (
        <Input
          placeholder="Kết quả chăm sóc"
          value={record.title}
          onChange={(e) =>
            handleInputChange(index + 1, 'title', e.target.value)
          }
        />
      )
    },
    {
      title: 'Cập nhật trạng thái',
      dataIndex: 'status_id',
      key: 'status_id',
      render: (_, record, index) => (
        <Select
          placeholder="Cập nhật trạng thái"
          value={record.status_id}
          style={{ width: '100%' }}
          onChange={(value) => handleInputChange(index + 1, 'status_id', value)}
        >
          {status.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      )
    }
  ]

  return (
    <div>
      <Table
        dataSource={comments.map((comment, index) => ({ ...comment, key: index + 1 }))}
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
  )
}

export default CustomerCareTable