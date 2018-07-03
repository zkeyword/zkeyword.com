import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { AppContainer } from 'react-hot-loader'
import * as stores from './stores'
import App from './router'
import './assets/stylus/index.styl'

const renderApp = (component: typeof App) =>
    console.log(stores)
    render(
        // <AppContainer>
            <Provider {...stores}>
                <Router>
                    <App InitData={window.ServerData} />
                </Router>
            </Provider>
        // </AppContainer>
        ,
        document.getElementById('app')
    )

renderApp(App)

// if (module.hot) {
//     module.hot.accept(() => renderApp(Routes))
// }
