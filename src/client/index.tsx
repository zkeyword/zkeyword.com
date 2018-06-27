// require('../common/assets/styles/main.scss')
import * as React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { AppContainer } from 'react-hot-loader'
// import Routes from '../common/routes'
// import Stores from '../common/stores'
import App from './router'

// declare var window: {
//     __INITIAL_STATE__?: Stores;
//     location: {
//         pathname: string;
//     };
// }

// const stores = new Stores(window.__INITIAL_STATE__)
const container = document.getElementById('app')
const renderApp = (component: typeof App) =>
    render(
        // <AppContainer>
        //     <Provider stores={stores}>
                <Router>
                    <App InitData={window._SERVER_DATA} />
                </Router>
        //     </Provider>
        // </AppContainer>
        ,
        container
    )

renderApp(App)

// if (module.hot) {
//     module.hot.accept(() => renderApp(Routes))
// }
