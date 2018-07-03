import { observable, action, computed, runInAction } from 'mobx'
import axios from 'axios'

class AppState {

    @observable ServerData

    constructor(ServerData) {
        this.ServerData = ServerData
    }

    async fetchData(pathname, id) {
        const { data } = await axios('http://127.0.0.1/api/posts')
        console.log(data)
        // data.length > 0 ? this.setData(data) : this.setSingle(data);
    }
}

export default AppState