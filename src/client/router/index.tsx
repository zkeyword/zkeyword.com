import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// import * as Loadable from 'react-loadable'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Home from '../containers/blog/Home'
import Tag from '../containers/blog/Tag'
import Post from '../containers/blog/Post'
import About from '../containers/blog/About'
import NotFound from '../containers/blog/NotFound'
import Header from '../components/header'
import Footer from '../components/footer'

interface RouterProps {
    location: any
}

// const Loading = props => {
//     return <div>Loading...</div>
// }

// const Home = Loadable({
//     loader: () => import('../containers/blog/Home'),
//     loading: Loading
// })

// const Post = Loadable({
//     loader: () => import('../containers/blog/Post'),
//     loading: Loading
// })

// const Tag = Loadable({
//     loader: () => import('../containers/blog/Tag'),
//     loading: Loading
// })

// const About = Loadable({
//     loader: () => import('../containers/blog/About'),
//     loading: Loading
// })

// const isServer = typeof require.ensure !== 'function' // require.ensure webpack 提供

class Routes extends React.Component<RouterProps, any> {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
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
                <Header location={location} />
                <TransitionGroup component='main' className='lt-main'>
                    <CSSTransition
                        key={currentKey === 'page' ? '/' : currentKey}
                        timeout={timeout}
                        classNames='slide'
                        appear
                    >
                        <Switch location={location}>
                            <Route exact path='/' component={Home} />
                            <Route path='/page/:page' component={Home} />
                            <Route path='/post/:name' component={Post} />
                            <Route path='/tag/:name' component={Tag} />
                            <Route path='/about' component={About} />
                            <Route component={NotFound} />
                            {/*
                            <Route exact path='/' component={isServer ? require('../containers/blog/Home').default : Home} />
                            <Route path='/page/:page' component={isServer ? require('../containers/blog/Home').default : Home} />
                            <Route path='/post/:name' component={isServer ? require('../containers/blog/Post').default : Post} />
                            <Route path='/tag/:name' component={isServer ? require('../containers/blog/Tag').default : Tag} />
                            <Route path='/about' component={isServer ? require('../containers/blog/About').default : About} /> */}
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </>
        )
    }
}

export default withRouter(Routes)
