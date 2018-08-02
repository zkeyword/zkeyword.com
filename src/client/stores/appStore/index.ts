import { observable, action } from 'mobx'
import { request } from '../../../server/utils/request'

export class AppStore {
    @observable ServerData: any = {}
    @observable pageIndex: number = 1

    constructor(ServerData) {
        this.ServerData = ServerData
    }

    @action
    async getPosts(pageIndex = 1) {
        const { data } = await request(`/api/posts/page/${pageIndex}`)
        this.ServerData.homeData = data
    }

    @action
    async getPost(name) {
        const { data } = await request(`/api/posts/${name}`)
        this.ServerData.postData = data
    }

    @action
    cleanServerData(type) {
        if (!this.ServerData[type]) return
        this.ServerData[type] = null
    }

    @action
    changePageIndex(pageIndex) {
        this.pageIndex = pageIndex
    }
}
