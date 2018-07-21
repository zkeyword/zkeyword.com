import * as React from 'react'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from '../../client/router'
import AdminApp from '../../client/router/admin'
import * as stores from '../../client/stores'
import { AppStore } from '../../client/stores/appStore'

export function render(ServerData: object, location: string, type?: string) {
    const appStore = new AppStore(ServerData)
    return renderToString(
        <Provider {...stores} appStore={appStore}>
            <Router context={{}} location={location}>
                {type === 'admin' ? <AdminApp /> : <App />}
            </Router>
        </Provider>
    )
}
