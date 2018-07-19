import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import * as dayjs from 'dayjs'

export default class Footer extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const endTime = dayjs(new Date()).format('YYYY')
        return (
            <footer className='lt-footer'>
                &copy; 2010 - {endTime} <a href='http://www.miitbeian.gov.cn/' rel='nofollow'>闽ICP备15004044号-1</a>
            </footer>
        )
    }
}
