import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Table, Pagination, Modal, message } from 'antd'

interface HomeProps {
    adminStore: any,
    appStore: any
    form: any
}

@inject('adminStore')
@inject('appStore')
@observer
class PostList extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
        this.props.appStore.getPosts()
        this.forceUpdate(function () {
            console.log(1212)
        })
    }

    state = {
        current: 1,
        visible: false,
        id: null
    }

    columns = [
        {
            title: '标题',
            dataIndex: 'post_title',
            key: 'post_title'
        }, {
            title: '别名',
            dataIndex: 'post_name',
            key: 'post_name'
        }, {
            title: '操作',
            render: (data) => {
                return (
                    <div key={data.ID}>
                        <span onClick={() => this.handleChangeMenu(data.ID)}>
                            编辑
                        </span>
                        <span onClick={() => this.handleDeletePost(data.ID)}>
                            删除
                        </span>
                    </div>
                )
            }
        }
    ]

    handleChangeMenu = id => {
        this.props.adminStore.changMenuKey('postEdit', id)
    }

    handleDeletePost = id => {
        this.setState({
            visible: true,
            id
        })
    }

    pageChangeHandler = i => {
        this.setState({
            current: i
        }, () => {
            this.props.appStore.getPosts(i)
            this.props.adminStore.changePageIndex(i)
        })
    }

    hideModal = async (type?: number) => {
        if (type) {
            const data = await this.props.adminStore.postDeleteByID(this.state.id)
            if (data && data.data) {
                message.success('操作成功!')
                this.props.appStore.getPosts(this.props.adminStore.pageIndex)
            }
        }
        this.setState({
            visible: false
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { ServerData } = this.props.appStore
        const dataSource = ServerData.homeData ? ServerData.homeData.list : []
        const total = ServerData.homeData ? ServerData.homeData.total : []
        return (
            <div className='postList'>
                <Table dataSource={dataSource} columns={this.columns} pagination={false} rowKey={record => record['ID']} />
                <Pagination
                    className='ant-table-pagination'
                    total={total}
                    current={this.state.current}
                    pageSize={10}
                    onChange={this.pageChangeHandler}
                />
                <Modal
                    title='提示'
                    visible={this.state.visible}
                    onOk={() => this.hideModal(1)}
                    onCancel={() => this.hideModal()}
                    okText='确认'
                    cancelText='取消'
                >
                    <p>你确定删除该篇文章，删除后就不能恢复了！</p>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(PostList)