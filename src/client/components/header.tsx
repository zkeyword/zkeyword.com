import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class Header extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header className='lt-header'>
                <Link className='logo' to='/' />
                <div className='navBar'>
                    <Link to='/about'><span>关于</span></Link>
                    <a href='http://github.com/zkeyword'><span>github</span></a>
                </div>
            </header>
        )
    }
}
