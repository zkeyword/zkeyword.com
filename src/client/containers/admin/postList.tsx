import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Table, Pagination } from 'antd'

interface HomeProps {
    match: any
    form: any,
    appStore: any
}

@inject('loginStore')
@inject('appStore')
@observer
class PostList extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
        this.props.appStore.getPosts()
    }

    state = {
        current: 1
    }

    columns = [{
        title: '标题',
        dataIndex: 'post_title',
        key: 'post_title',
    }, {
        title: '别名',
        dataIndex: 'post_name',
        key: 'post_name',
    }]

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
        })
    }

    pageChangeHandler = i => {
        this.setState({
            current: i
        }, () => {
            this.props.appStore.getPosts(i)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { ServerData } = this.props.appStore
        const dataSource = ServerData.homeData ? ServerData.homeData.list : []
        const total = ServerData.homeData ? ServerData.homeData.total : []
        console.log(this.state.current)
        return (
            <div className='postList'>
                <Table dataSource={dataSource} columns={this.columns} pagination={false} rowKey={record => record.ID} />
                <Pagination
                    className='ant-table-pagination'
                    total={total}
                    current={this.state.current}
                    pageSize={10}
                    onChange={this.pageChangeHandler}
                />
            </div>
        )
    }
}

export default Form.create()(PostList)