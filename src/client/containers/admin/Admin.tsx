import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Menu, Icon, Button, Table } from 'antd'
import PostList from './postList'
import PostEdit from './postEdit'
import UserEdit from './userEdit'

interface HomeProps {
    form: any,
    adminStore: any
}

@inject('adminStore')
@observer
class Admin extends React.Component<HomeProps, any> {

    handleClick = (e) => {
        this.props.adminStore.changMenuKey(e.key)
    }

    renderModule = () => {
        const { menuKey } = this.props.adminStore
        let menuModule
        switch (menuKey) {
            case 'postList':
                menuModule = <PostList />
                break
            case 'postEdit':
                menuModule = <PostEdit />
                break
            case 'userEdit':
                menuModule = <UserEdit />
                break
        }
        return menuModule
    }

    render() {
        return (
            <div className='page-admin'>
                <div className='left'>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['postList']}
                        defaultOpenKeys={['postList']}
                        mode='inline'
                    >
                        <Menu.Item key='postList'>文章列表</Menu.Item>
                        <Menu.Item key='postEdit'>添加文章</Menu.Item>
                        <Menu.Item key='userEdit'>修改密码</Menu.Item>
                    </Menu>
                </div>
                <div className='right'>
                    {
                        this.renderModule()
                    }
                </div>
            </div>
        )
    }
}

export default Form.create()(Admin)