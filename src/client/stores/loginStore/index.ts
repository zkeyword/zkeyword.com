import { observable, action } from 'mobx'

class LoginStore {
    @observable username
    @observable password

    constructor() {
        this.username = 'usernameusernameusernameusername'
        this.password = ''
    }

    @action changeUsername = (value) => {
        this.username = value
    }
    @action changePassword = (value) => {
        this.password = value
    }
}

const loginStore = new LoginStore()

export default loginStore
export { LoginStore }

