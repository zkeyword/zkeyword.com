import { observable, action, runInAction } from 'mobx'
import { request } from '../../../server/utils/request'

class TestStore {
    @observable loginInfo: any = null

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

export default new TestStore()
export { TestStore }

