import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header>
                <div className='logo'>zKeyword | web前端开发</div>
                <NavLink to='/'><span>首页</span></NavLink>
                <NavLink to='/about'><span>关于</span></NavLink>
                <a href='http://github.com/zkeyword'><span>github</span></a>
            </header>
        )
    }
}
