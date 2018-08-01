import { observable, action, runInAction } from 'mobx'
import { request } from '../../../server/utils/request'

class AdminStore {
    @observable menuKey: string = 'postList'
    @observable id: number
    @observable postData: any
    @observable pageIndex: number = 1

    @action
    changePageIndex = pageIndex => {
        this.pageIndex = pageIndex
    }

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

    @action
    async postAdd(data) {
        await request(`/api/posts/`, {
            method: 'POST',
            data
        })
    }

    @action
    async postDeleteByID(id) {
        return await request(`/api/posts/id/${id}`, {
            method: 'DELETE'
        })
    }

    @action
    async postModifyByID(id, data) {
        return await request(`/api/posts/id/${id}`, {
            method: 'POST',
            data
        })
    }
}

export default new AdminStore()
export { AdminStore }

