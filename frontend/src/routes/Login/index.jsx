import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';

@inject('globalStore')
@observer
class Login extends Component {
  login = () => {
    this.props.globalStore.login()
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <Button onClick={this.login}>Login</Button>
      </div>
    );
  }
}

export default Login;
