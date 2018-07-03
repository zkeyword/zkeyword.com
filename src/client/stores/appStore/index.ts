import { observable, action } from 'mobx'

export class AppStore {
    @observable ServerData = {}

    constructor( ServerData ) {
        this.ServerData = ServerData
    }

    @action resetTimer = () => {
        // this.timer = 0
    }
}

// const appStore = new AppStore()

// export default appStore
// export { AppStore }

