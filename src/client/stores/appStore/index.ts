import { observable, action } from 'mobx'
import axios from 'axios'

export class AppStore {
    @observable ServerData: any = {}

    constructor( ServerData ) {
        this.ServerData = ServerData
    }

    @action
    async fetchData(pathname, id) {
        if (!this.ServerData.data) {
            const { data } = await axios('http://127.0.0.1:3001/api/posts')
            this.ServerData.data = data
        }
        // data.length > 0 ? this.setData(data) : this.setSingle(data);
    }

    @action
    setSingle(data) {
    }
}

// const appStore = new AppStore()

// export default appStore
// export { AppStore }

