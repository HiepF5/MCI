import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { loginUser } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    debugger;
    try {
      const response = await loginUser(values)
      console.log('Login successful:', response)
      const token = response.access_token
      if (token) {
        localStorage.setItem('token', token)
     
      }
      if(response.user){
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      navigate('/table')
      
    } catch (error) {
      console.error('Failed to log in:', error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name='login'
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

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login