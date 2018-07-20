import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import * as Loadable from 'react-loadable'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import NotFound from '../containers/NotFound'
import Header from '../components/header'
import Footer from '../components/footer'

interface RouterProps {
    location: any
}

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

class Routes extends React.Component<RouterProps, any> {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.location.pathname !== prevProps.location.pathname)) {
            window.scrollTo(0, 0)
        }

        // const titleMap = {
        // }

        // document.title = titleMap[this.props.location.pathname]

        if (process.env.NODE_ENV == 'production') {
            // Axios.post('/api/pushToBaidu', {
            //     url: window.location.href
            // })
        }
    }

    render() {
        const { location } = this.props
        const currentKey = location.pathname.split('/')[1] || '/'
        const timeout = { enter: 400, exit: 350 }
        return (
            <>
                <Header />
                <TransitionGroup component='main' class='lt-mian'>
                    <CSSTransition key={currentKey} timeout={timeout} classNames='slide' appear>
                        <Switch location={location}>
                            <Route exact path='/' component={isServer ? require('../containers/Home').default : Home} />
                            <Route exact path='/page/:page' component={isServer ? require('../containers/Home').default : Home} />
                            <Route exact path='/post/:name' component={isServer ? require('../containers/Post').default : Post} />
                            <Route exact path='/tag/:name' component={isServer ? require('../containers/Tag').default : Tag} />
                            <Route exact path='/about' component={isServer ? require('../containers/About').default : About} />
                            <Route component={NotFound} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </>
        )
    }
}

export default withRouter(Routes)