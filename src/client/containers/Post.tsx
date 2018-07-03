import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <>
                <NavLink to='/'><span>homehomehomehomehome</span></NavLink>
                <div>post</div>
            </>
        )
    }
}
