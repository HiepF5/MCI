import React from 'react'
import { Form, Input, Button } from 'antd'
import { createUserAccount } from '../apis/userApi'

const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = await createUserAccount(values)
      console.log('User account created successfully:', response)
      const token = response.token
      if (token) {
        localStorage.setItem('token', token)
      }
    } catch (error) {
      console.error('Failed to create user account:', error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name='register'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        style={{ width: 400 }}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register