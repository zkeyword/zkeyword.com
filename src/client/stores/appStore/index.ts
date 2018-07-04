import { observable, action } from 'mobx'
import axios from 'axios'

export class AppStore {
    @observable ServerData = {}

    constructor( ServerData ) {
        this.ServerData = ServerData
    }


    @action
    async fetchData(pathname, id) {
        const { data } = await axios('http://127.0.0.1:3001/api/posts')
        console.log(data)
        // data.length > 0 ? this.setData(data) : this.setSingle(data);
    }

    @action
    setSingle(data) {
        console.log(data)
    }
}

// const appStore = new AppStore()

// export default appStore
// export { AppStore }

