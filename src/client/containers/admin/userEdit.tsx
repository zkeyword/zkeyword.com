import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Icon, Button, Input } from 'antd'

const FormItem = Form.Item

interface HomeProps {
    form: any,
    loginStore: any
}

@inject('loginStore')
@observer
class UserEdit extends React.Component<HomeProps, any> {
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

    handleOk = (e) => {
        e.preventDefault()
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        return (
            <form onSubmit={this.handleSubmit} className='userEdit'>
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
                                message: '原密码不能为空'
                            }
                        ]
                    })(<Input prefix={<Icon type='lock' style={{ fontSize: 20, color: '#c8c8c8' }} />} size='large' type='password' onPressEnter={this.handleSubmit} placeholder='请输入原密码密码' />)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newPassword', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空'
                            }, {
                                max: 12,
                                message: '密码不许超过12个字符'
                            }, {
                                min: 6,
                                message: '密码至少6个字符'
                            }, {
                                validator: (rules, value, callback) => {
                                    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value && value.length >= 6) {
                                        callback('不能全为数字和字母')
                                    } else {
                                        callback()
                                    }
                                }
                            }
                        ]
                    })(<Input size='large' type='password' onPressEnter={this.handleOk} placeholder='请输入新密码' />)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('checkP', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空'
                            }, {
                                max: 12,
                                message: '密码不许超过12个字符'
                            }, {
                                min: 6,
                                message: '用户名至少6个字符'
                            }, {
                                validator: (rules, value, callback) => {
                                    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value && value.length >= 6) {
                                        callback('不能全为数字和字母')
                                    } else {
                                        callback()
                                    }
                                }
                            }, {
                                validator: (rules, value, callback) => {
                                    const newP = getFieldValue('newPassword')
                                    const checkP = getFieldValue('checkP')
                                    if (newP !== checkP && value.length > 6) {
                                        callback('两次输入密码不一致')
                                    } else {
                                        callback()
                                    }
                                }
                            }
                        ]
                    })(<Input size='large' type='password' onPressEnter={this.handleOk} placeholder='请确认新密码' />)}
                </FormItem>
                <Button type='primary' htmlType='submit' className='login-button'>
                    修改密码
                </Button>
            </form>
        )
    }
}

export default Form.create()(UserEdit)