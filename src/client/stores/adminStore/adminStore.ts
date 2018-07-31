import { observable, action, runInAction } from 'mobx'
import { request } from '../../../server/utils/request'

class AdminStore {
    @observable menuKey: string = 'postList'
    @observable id: number
    @observable postData: any

    @action
    async changMenuKey(key: string, id?: number) {
        this.menuKey = key
        if (id) {
            this.id = id
        }
    }

    @action
    async getPostByID(id) {
        const { data } = await request(`/api/posts/id/${id}`)
        this.postData = data
    }
}

export default new AdminStore()
export { AdminStore }

