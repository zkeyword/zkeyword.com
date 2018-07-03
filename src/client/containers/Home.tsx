import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

interface HomeProps {
    appStore: any
}

@inject('appStore')
@observer
export default class Home extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props)
    }
    render() {
        const { data } = this.props.appStore.ServerData
        return (
            <div>
                {/* <NavLink to='/ssr/html2'><span>home2</span></NavLink> */}
                {
                    data.map((item, index) => {
                        return <div key={item.ID}>{item.post_title}</div>
                    })
                }
            </div>
        )
    }
}
