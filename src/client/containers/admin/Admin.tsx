import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Icon, Button } from 'antd'

const FormItem = Form.Item

interface HomeProps {
    appStore: any,
    match: any,
    form: any,
    loginStore: any
}

@inject('loginStore')
@observer
class Admin extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            this.props.loginStore.login(values)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className='page-login'>
                <div className='header'>
                    <div className='logo' />
                </div>
                <div className='main'>
                    <div className='wrap'>
                        <div className='form'>
                            <form onSubmit={this.handleSubmit}>
                                <FormItem hasFeedback>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            }
                                        ]
                                    })(<Input prefix={<Icon type='user' style={{ fontSize: 20, color: '#c8c8c8' }} />} size='large' onPressEnter={this.handleSubmit} placeholder='请输入用户名' />)}

                                </FormItem>
                                <FormItem hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            }
                                        ]
                                    })(<Input prefix={<Icon type='lock' style={{ fontSize: 20, color: '#c8c8c8' }} />} size='large' type='password' onPressEnter={this.handleSubmit} placeholder='请输入密码' />)}
                                </FormItem>
                                <Button type='primary' htmlType='submit' className='login-button'>
                                    登 录
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Admin)