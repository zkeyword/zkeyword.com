import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Menu, Icon, Button } from 'antd'

const FormItem = Form.Item
const SubMenu = Menu.SubMenu

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
            <div className='page-admin'>
                <div className='left'>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode='inline'
                    >
                        <SubMenu key='sub2' title={<span><Icon type='appstore' /><span>Navigation Two</span></span>}>
                            <Menu.Item key='5'>Option 5</Menu.Item>
                            <Menu.Item key='6'>Option 6</Menu.Item>
                            <SubMenu key='sub3' title='Submenu'>
                                <Menu.Item key='7'>Option 7</Menu.Item>
                                <Menu.Item key='8'>Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key='sub4' title={<span><Icon type='setting' /><span>Navigation Three</span></span>}>
                            <Menu.Item key='9'>Option 9</Menu.Item>
                            <Menu.Item key='10'>Option 10</Menu.Item>
                            <Menu.Item key='11'>Option 11</Menu.Item>
                            <Menu.Item key='12'>Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='right'>right</div>
            </div>
        )
    }
}

export default Form.create()(Admin)