import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('appStore')
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        // console.log(11, props.appStore.ServerData.data)
    }
    render() {
        return (
            <div>
                {/* <NavLink to='/ssr/html2'><span>home2</span></NavLink> */}
                <div>home</div>
            </div>
        )
    }
}
