import { observable, action, runInAction } from 'mobx'
import { request } from '../../../server/utils/request'

class LoginStore {
    // @observable username
    // @observable password
    @observable loginInfo: any = null

    // @action changeUsername = (value) => {
    //     this.username = value
    // }

    // @action changePassword = (value) => {
    //     this.password = value
    // }

    @action
    async login(data) {
        const loginInfo = await request(`/api/login`, {
            method: 'POST',
            data
        })
        runInAction(() => {
            this.loginInfo = loginInfo.data
        })
    }
}

const loginStore = new LoginStore()

export default loginStore
export { LoginStore }

