import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'


interface Props {
    location: any
}

export default class Header extends React.PureComponent<Props, any> {
    render() {
        const pathname = this.props.location.pathname
        const isAdmin = /admin/.test(pathname)
        const isLogin = /login/.test(pathname)
        return (
            <header className={isAdmin && !isLogin ? 'lt-header lt-header-admin' : 'lt-header'}>
                <div className='main'>
                    <Link className='logo' to='/' />
                    {
                        isAdmin && !isLogin
                            ?
                            <div className='navBar'>
                                <a href='/admin/logout'><span>退出</span></a>
                            </div>
                            :
                            <div className='navBar'>
                                <Link to='/about'><span>关于</span></Link>
                                <a href='http://github.com/zkeyword'><span>github</span></a>
                            </div>
                    }
                </div>
            </header>
        )
    }
}
