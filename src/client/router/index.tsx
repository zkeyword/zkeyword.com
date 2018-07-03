import * as React  from 'react'
import { Route, Switch } from 'react-router-dom'
import * as Loadable from 'react-loadable'
import NotFound from '../containers/NotFound'

// interface HtmlProps extends React.Props<any> {
//     InitData: Object
// }

const Loading = props => {
    return <div>Loading...</div>
}

const Home = Loadable({
    loader: () => import('../containers/Home'),
    loading: Loading
})

const Post = Loadable({
    loader: () => import('../containers/Post'),
    loading: Loading
})

const Tag = Loadable({
    loader: () => import('../containers/Tag'),
    loading: Loading
})

const About = Loadable({
    loader: () => import('../containers/About'),
    loading: Loading
})

const isServer = typeof require.ensure !== 'function' // require.ensure webpack 提供

export default class Routes extends React.Component {
    // constructor (props: HtmlProps) {
    //     super(props)
    //     // console.log(props)
    // }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={isServer ? require('../containers/Home').default : Home} />
                <Route exact path='/page/:page' component={isServer ? require('../containers/Home').default : Home} />
                <Route exact path='/post/:name' component={isServer ? require('../containers/Post').default : Post} />
                <Route exact path='/tag/:name' component={isServer ? require('../containers/Tag').default : Tag} />
                <Route exact path='/about' component={isServer ? require('../containers/About').default : About} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}
