import * as React  from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from '../containers/HomePage'
import HomePage2 from '../containers/HomePage2'
import NotFoundPage from '../containers/NotFoundPage'

interface HtmlProps extends React.Props<any> {
    InitData: Object
}

export default class Routes extends React.Component<HtmlProps, any> {
    constructor (props: HtmlProps) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route exact path='/ssr/html' component={HomePage} />
                <Route exact path='/ssr/html2' component={HomePage2} />
                <Route component={NotFoundPage} />
            </Switch>
        )
    }
}
