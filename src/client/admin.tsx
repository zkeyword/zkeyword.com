import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { AppContainer } from 'react-hot-loader'
import * as stores from './stores'
import { AppStore } from './stores/appStore'
import App from './router/admin'
import './assets/stylus/admin.styl'

const appStore = new AppStore(window.ServerData)
const renderApp = (component: typeof App) =>
    hydrate(
        // <AppContainer>
        <Provider {...stores} appStore={appStore}>
            <Router>
                <App />
            </Router>
        </Provider>
        // </AppContainer>
        ,
        document.getElementById('app')
    )

renderApp(App)

// if (module.hot) {
//     module.hot.accept(() => renderApp(App))
// }
