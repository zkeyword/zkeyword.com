import { observable, action, runInAction } from 'mobx'
import { request } from '../../../server/utils/request'

class AdminStore {
    @observable menuKey: string = 'postList'

    @action
    async changMenuKey(key) {
        this.menuKey = key
    }
}

export default new AdminStore()
export { AdminStore }

