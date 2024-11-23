import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Tag,
  Row,
  Col,
  Typography,
  TimePicker,
  Space
} from 'antd'
import {
  createCustomer,
  createSocialMedia,
  createSources,
  createStatus,
  getServices,
  getSocialMedia,
  getSources,
  getStatus
} from '../apis/userApi'
import CustomerCareTable from './CustomerCareTable'
import CustomDropdown from './CustomDropdown'

const { Title } = Typography
const { TextArea } = Input

const AddCustomerButton = ({ onCustomerAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [services, setServices] = useState([])
  const [sources, setSources] = useState([])
  const [socialMedia, setSocialMedia] = useState([])
  const [status, setStatus] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceData, sourceData, socialMediaData, statusData] = await Promise.all([
          getServices(),
          getSources(),
          getSocialMedia(),
          getStatus()
        ])
        setServices(serviceData.results)
        setSources(sourceData.results)
        setSocialMedia(socialMediaData.results)
        setStatus(statusData.results)
      } catch (error) {
        console.error('Failed to fetch customer data:', error)
      }
    }
    fetchData()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async (values) => {
    try {
      const customerData = {
        status: values.status,
        source: values.source,
        social_media: values.socialMedia,
        service: values.service,
        full_name: values.customerName,
        gender: values.gender,
        date_of_birth: values.dob ? values.dob.format('YYYY-MM-DDTHH:mm:ss') : null,
        phone_number: values.phone,
        follow_up_date: values.followUpDate ? values.followUpDate.format('YYYY-MM-DDTHH:mm:ss') : null,
        follow_down_date: values.followDownDate ? values.followDownDate.format('YYYY-MM-DDTHH:mm:ss') : null,
        address: values.address,
        city: values.city,
        district: values.district,
        ward: values.ward,
        detailed_info: values.detailedInfo,
        notes: values.notes,
        comments: values.comments
          ? values.comments.map((comment) => ({
              title: comment.title,
              time: comment.time ? comment.time.format('YYYY-MM-DDTHH:mm:ss') : null,
              status_id: comment.statusId
            }))
          : []
      }
      console.log(customerData)
      const response = await createCustomer(customerData)
      console.log('Customer created successfully:', response)
      if (onCustomerAdded) {
        onCustomerAdded()
      }
      setIsModalVisible(false)
    } catch (error) {
      console.error('Failed to create customer:', error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleAddSource = async (newSource) => {
    debugger;
    const newId = (sources.length + 1).toString()
    setSources([...sources, { id: newId, title: newSource }])
    const newData = { title: newSource }
    await createSources(newData)
  }
  const handleAddStatus = async (newSource) => {
    debugger;
    const newId = (sources.length + 1).toString()
    setStatus([...status, { id: newId, title: newSource }])
    const newData = { title: newSource }
    await createStatus(newData)
  }
  const handleAddSocialMedia = async (newSource) => {
    const newId = (sources.length + 1).toString()
    setSocialMedia([...socialMedia, { id: newId, title: newSource }])
    const newData = { title: newSource }
    await createSocialMedia(newData)
  }

  return (
    <div>
      <Button type='primary' onClick={showModal} style={{ float: 'right' }}>
        Thêm khách hàng
      </Button>

      <Modal
        title='Tạo khách hàng'
        open={isModalVisible}
        onCancel={handleCancel}
        okText='Xác nhận'
        cancelText='Hủy'
        width={1000}
        footer={null}
      >
        <Form layout='vertical' onFinish={handleOk}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label='Họ tên khách hàng'
                name='customerName'
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input placeholder='Nhập họ tên khách hàng' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Giới tính' name='gender'>
                <Radio.Group>
                  <Radio value='Nam'>Nam</Radio>
                  <Radio value='Nữ'>Nữ</Radio>
                  <Radio value='Khác'>Khác</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Ngày sinh' name='dob' rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
                <DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label='Nguồn khách hàng' name='source'>
                <CustomDropdown placeholder='Chọn nguồn khách hàng' data={sources} onAdd={handleAddSource} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Trạng thái' name='status'>
                <CustomDropdown placeholder='Chọn trạng thái' data={status} onAdd={handleAddStatus} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Title level={4}>Thông tin liên hệ</Title>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Số điện thoại'
                name='phone'
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input placeholder='Nhập số điện thoại' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}>
                <Input placeholder='Nhập email' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label='Mạng xã hội' name='socialMedia'>
                    <CustomDropdown placeholder='Chọn mạng xã hội' data={socialMedia} onAdd={handleAddSocialMedia} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label='URL' name='socialMediaUrl'>
                    <Input placeholder='Nhập URL mạng xã hội' />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Additional Details */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label='Sản phẩm quan tâm'>
                <Row gutter={16}>
                  <Col span={16}>
                    <Input placeholder='Thêm sản phẩm' />
                  </Col>
                  <Col span={8}>
                    <Button type='primary'>Thêm</Button>
                  </Col>
                </Row>
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: '#f6ffed',
                    border: '1px solid #b7eb8f',
                    borderRadius: '4px'
                  }}
                >
                  {services.map((product) => (
                    <Tag
                      key={product.id}
                      closable
                      style={{
                        backgroundColor: '#d48806',
                        color: '#fff',
                        border: 'none',
                        margin: '4px'
                      }}
                    >
                      {product.title}
                    </Tag>
                  ))}
                </div>
              </Form.Item>
              <Form.Item label='Ghi chú' name='notes'>
                <TextArea placeholder='Nhập ghi chú' rows={3} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Địa chỉ'>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name='city'>
                      <Input placeholder='Thành phố' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='district'>
                      <Input placeholder='Quận' />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name='ward'>
                      <Input placeholder='Phường' />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '8px' }}>
                  <Col span={24}>
                    <Form.Item name='houseNumber'>
                      <Input placeholder='Số nhà' />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Địa chỉ chi tiết' name='detailedInfo'>
                <TimePicker.RangePicker format='HH:mm' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <CustomerCareTable />
            </Col>
          </Row>

          <Row justify='end'>
            <Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>
              Xác nhận
            </Button>
            <Button onClick={handleCancel}>Hủy</Button>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default AddCustomerButton
