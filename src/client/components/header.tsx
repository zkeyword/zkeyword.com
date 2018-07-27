import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'


interface Props {
    location: any
}

export default class Header extends React.PureComponent<Props, any> {
    renderNavBar = () => {
        const pathname = this.props.location.pathname
        const isAdmin = /admin/.test(pathname)
        const isLogin = /login/.test(pathname)
        if (isAdmin && !isLogin) {
            return (
                <div className='navBar'>
                    <a href='/admin/logout'><span>退出</span></a>
                </div>
            )
        }
        return (
            <div className='navBar'>
                <Link to='/about'><span>关于</span></Link>
                <a href='http://github.com/zkeyword'><span>github</span></a>
            </div>
        )
    }

    render() {
        console.log()
        return (
            <header className='lt-header'>
                <div className='main'>
                    <Link className='logo' to='/' />
                    {this.renderNavBar()}
                </div>
            </header>
        )
    }
}
