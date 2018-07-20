import * as React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Pagination } from 'antd'
import * as dayjs from 'dayjs'
import Loading from '../components/loading'

interface HomeProps {
    appStore: any,
    match: any
}

@inject('appStore')
@observer
export default class Home extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.appStore.getPosts(this.props.match.params.page)
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
        return (
            <section className='lt-main page-home'>
                {
                    homeData ?
                        <>
                            {
                                homeData.list.map((item, index) => {
                                    return (
                                        <div className='item' key={item.ID}>
                                            <h2><Link to={`/post/${item.post_name}`}>{item.post_title}</Link></h2>
                                            <div className='time'><span>作者：沙师弟</span><span>时间：{dayjs(item.post_modified_gmt).format('YYYY-MM-DD')}</span></div>
                                            {
                                                item.post_excerpt ?
                                                    <div dangerouslySetInnerHTML={{ __html: item.post_excerpt }} /> :
                                                    <div dangerouslySetInnerHTML={{ __html: item.post_content }} />
                                            }
                                        </div>
                                    )
                                })
                            }
                            <div className='pagination'>
                                <Pagination
                                    size='small'
                                    total={homeData.total}
                                    current={homeData.pageIndex}
                                    defaultPageSize={10}
                                    onChange={this.changePage}
                                    itemRender={this.renderPaginationItem}
                                />
                            </div>
                        </>
                        :
                        <Loading />
                }
            </section>
        )
    }
}
