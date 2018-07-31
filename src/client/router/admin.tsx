import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import * as Loadable from 'react-loadable'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import NotFound from '../containers/admin/NotFound'
import Header from '../components/header'
import Footer from '../components/footer'

interface RouterProps {
    location: any
}

const Loading = props => {
    return <div>Loading...</div>
}

const Home = Loadable({
    loader: () => import('../containers/admin/Admin'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('../containers/admin/Login'),
    loading: Loading
})

const isServer = typeof require.ensure !== 'function' // require.ensure webpack 提供

class Routes extends React.Component<RouterProps, any> {
    constructor(props) {
        super(props)
    }

    routerWillLeave() {
        console.log(121212)
    }

    render() {
        const { location } = this.props
        const currentKey = location.pathname.split('/')[1] || '/'
        const timeout = { enter: 400, exit: 350 }
        return (
            <>
                <Header location={location} />
                <TransitionGroup component='main' className='lt-main-admin'>
                    <CSSTransition key={currentKey === 'page' ? '/' : currentKey} timeout={timeout} classNames='slide' appear>
                        <Switch location={location}>
                            <Route exact path='/admin/' component={isServer ? require('../containers/admin/Admin').default : Home} />
                            <Route exact path='/admin/login' component={isServer ? require('../containers/admin/Login').default : Login} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
                {/* <Prompt message='确认离开当前页面？' /> */}
            </>
        )
    }
}

export default withRouter(Routes)