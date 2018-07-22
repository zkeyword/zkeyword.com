import * as React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Pagination } from 'antd'
import * as dayjs from 'dayjs'
import Loading from '../../components/loading'
import { Form, Input } from 'antd'

const FormItem = Form.Item

interface HomeProps {
    appStore: any,
    match: any,
    form: any
}

@inject('appStore')
@observer
class Admin extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.match.params.page) {
            this.props.appStore.getPosts()
        }
    }

    componentDidMount() {
        if (!this.props.appStore.ServerData.homeData) {
            this.props.appStore.getPosts(this.props.match.params.page)
        }
    }

    componentWillUnmount() {
        this.props.appStore.cleanServerData('homeData')
    }

    changePage = page => {
        this.props.appStore.getPosts(page)
    }

    renderPaginationItem = (page, type) => {
        if (type === 'page') return <Link to={`/page/${page}`}>{page}</Link>
        return <Link className='ant-pagination-item-link' to={`/page/${page}`}></Link>
    }

    render() {
        const homeData = this.props.appStore.ServerData.homeData
        const { getFieldDecorator } = this.props.form
        return <Form className='account-form'>
            <FormItem className='account-signup__phone'>
                {getFieldDecorator('phone', {
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '必填' }, { pattern: /^1[345789]\d{9}$/, message: '手机格式不正确' }]
                })(
                    <Input placeholder='请输入手机号' />
                    )}
            </FormItem>
        </Form>
    }
}

export default Form.create()(Admin)