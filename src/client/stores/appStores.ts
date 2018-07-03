import { observable, action, computed, runInAction } from 'mobx'

class AppState {

    @observable ServerData

    constructor(ServerData) {
        this.ServerData = ServerData
    }
}

export default AppState