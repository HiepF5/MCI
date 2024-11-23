import { Table } from 'antd'

const CustomerTable = ({ data }) => {
  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Mã KH', dataIndex: 'customer_code', key: 'customer_code' },
    { title: 'Họ và tên', dataIndex: 'full_name', key: 'full_name' },
    { title: 'SĐT', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Người tiếp thị', dataIndex: 'service', key: 'service' },
    { title: 'Nguồn', dataIndex: 'source', key: 'source' },
    { title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
    { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at' },
  ]
  console.log(data)

  const dataSource = data.map((item, index) => ({
    key: index,
    id: index + 1,
    customer_code: item.customer_code,
    full_name: item.full_name,
    phone_number: item.phone_number,
    email: item.email,
    service: item.service.map(service => service.title).join(', '),
    source: item.source?.title,
    notes: item.notes,
    created_at: item.created_at,
  }))

  return <Table columns={columns} dataSource={dataSource} pagination={false} />
}

export default CustomerTable