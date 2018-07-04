import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Pagination } from 'antd'

interface HomeProps {
    appStore: any
}

@inject('appStore')
@inject('loginStore')
@observer
export default class Home extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
        props.appStore.fetchData()
        console.log(this.props)
    }

    changePage = () => {

    }

    render() {
        const { data } = this.props.appStore.ServerData
        return (
            <div>
                {/* <NavLink to='/ssr/html2'><span>home2</span></NavLink> */}
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.ID}>
                                <Link to={`/post/${item.post_name}`}>{item.post_title}</Link>
                            </div>
                        )
                    })
                }
                <Pagination size='small' total={20} current={1} defaultPageSize={10} onChange={ this.changePage } />
            </div>
        )
    }
}
