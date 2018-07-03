import * as React from 'react'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import {  StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from '../../client/router'
import * as stores from '../../client/stores'

export function render(ServerData: object, location: string) {
    return renderToString(
        <Provider {...stores}>
            <Router location={location}>
                <App InitData={ServerData} />
            </Router>
        </Provider>
    )
}
