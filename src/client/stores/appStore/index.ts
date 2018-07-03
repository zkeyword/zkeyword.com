import { observable, action } from 'mobx'

class AppStore {
    @observable timer = 0

    constructor() {
        setInterval(() => {
            this.timer += 1
        }, 1000)
    }

    @action resetTimer = () => {
        this.timer = 0
    }
}

const appStore = new AppStore()

export default appStore
export { AppStore }

