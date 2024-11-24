import React, { useState } from 'react'
import { Table, Modal } from 'antd'
import AddCustomerButton from './AddCustomerButton'
import { getCustomerById } from '../apis/userApi'

const CustomerTable = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const columns = [
    { title: 'Mã khách hàng', dataIndex: 'customer_code', key: 'customer_code' },
    { title: 'Họ tên', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Số điện thoại', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
    { title: 'Nguồn', dataIndex: 'source', key: 'source' },
    { title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
    { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at' },
  ]

  const dataSource = data.map((item, index) => ({
    key: index + 1,
    id: item.id,
    customer_code: item.customer_code,
    full_name: item.full_name,
    phone_number: item.phone_number,
    email: item.email,
    service: item.service.map(service => service.title).join(', '),
    source: item.source?.title,
    notes: item.notes,
    created_at: item.created_at,
  }))

  const handleRowClick = async (record) => {
    console.log(record)
    debugger;
    const data = await getCustomerById(record.id)
    console.log(data)
    setSelectedCustomer(data)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setSelectedCustomer(null)
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <Modal
        title="Chi tiết khách hàng"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <AddCustomerButton
          customer={selectedCustomer}
          onCustomerAdded={handleModalClose}
        />
      </Modal>
    </div>
  )
}

export default CustomerTable