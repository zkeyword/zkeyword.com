import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <NavLink to='/ssr/html'><span>home</span></NavLink>
                <div>home</div>
            </div>
        )
    }
}
