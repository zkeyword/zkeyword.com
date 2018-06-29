import * as React from 'react'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/router'

export function render(ServerData: object, location: string) {
    return renderToString(
        <StaticRouter context={{}} location={location}>
            <App InitData={ServerData} />
        </StaticRouter>
    )
}
