import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Icon, Input, Button } from 'antd'
import './index.less'

const FormItem = Form.Item

@inject('globalStore')
@Form.create()
@observer
class Login extends Component {
  login = () => {
    this.props.globalStore.login()
    this.props.history.push('/')
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.globalStore.login(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form' autoComplete='off'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form>
    )
  }
}

export default Login
