import { observable, action } from 'mobx'
import axios from 'axios'
import { url } from '../../../server/utils/config'

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

    @action
    async login(data) {
        await axios(`${url}/api/login`, {
            method: 'POST',
            data
        })
    }
}

const loginStore = new LoginStore()

export default loginStore
export { LoginStore }

