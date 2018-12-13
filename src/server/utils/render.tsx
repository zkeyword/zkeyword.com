import * as React from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from '../../client/router'
import AdminApp from '../../client/router/admin'
import * as stores from '../../client/stores'
import { AppStore } from '../../client/stores/appStore'

export function render(ServerData: object, location: string, type?: string) {
    const appStore = new AppStore(ServerData)
    // 需要用到 ejs，renderToNodeStream不适用
    return renderToString(
        <Provider {...stores} appStore={appStore}>
            <Router context={{}} location={location}>
                {type === 'admin' ? <AdminApp /> : <App />}
            </Router>
        </Provider>
    )
}

// export default function(ServerData: object, location: string, type?: string){
//     const html = () => new Promise((resolve, reject) => {
//         const appStore = new AppStore(ServerData)
//         const stream = renderToNodeStream(
//             <Provider {...stores} appStore={appStore}>
//                 <Router context={{}} location={location}>
//                     {type === 'admin' ? <AdminApp /> : <App />}
//                 </Router>
//             </Provider>
//         )
//         let html = ''
//         stream.on('data', chunk => {
//             html += chunk
//         })
//         stream.on('end', () => {
//             resolve(html)
//         })
//     })

//     return html()
// }
