import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import * as dayjs from 'dayjs'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const endTime = dayjs(new Date()).format('YYYY')
        return (
            <footer>
                <div>Copyright &copy; 2010 - {endTime} zkeyword.com. All Rights Reserved. <a href='http://www.miitbeian.gov.cn/' rel='nofollow'>闽ICP备15004044号-1</a></div>
                <div>Powered by koa2 + React16 </div>
            </footer>
        )
    }
}
