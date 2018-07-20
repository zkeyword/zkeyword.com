import { observable, action } from 'mobx'
import axios from 'axios'
import { url } from '../../../server/utils/config'

export class AppStore {
    @observable ServerData: any = {}

    constructor(ServerData) {
        this.ServerData = ServerData
    }

    @action
    async getPosts(pageIndex = 1) {
        const { data } = await axios(`${url}/api/posts/page/${pageIndex}`)
        this.ServerData.homeData = data
    }

    @action
    async getPost(name) {
        const { data } = await axios(`${url}/api/posts/${name}`)
        this.ServerData.postData = data
    }

    @action
    cleanServerData(type) {
        if (!this.ServerData[type]) return
        this.ServerData[type] = null
    }
}
