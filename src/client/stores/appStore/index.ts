import { observable, action } from 'mobx'
import axios from 'axios'
// import { url } from '../../../../config'

export class AppStore {
    @observable ServerData: any = {}

    constructor(ServerData) {
        this.ServerData = ServerData
    }

    @action
    async getPosts(pageIndex = 1) {
        const { data } = await axios(`http://127.0.0.1:3001/api/posts/page/${pageIndex}`)
        this.ServerData.homeData = data
    }

    @action
    async getPost(name) {
        if (!this.ServerData.postData) {
            const { data } = await axios(`http://127.0.0.1:3001/api/posts/${name}`)
            this.ServerData.postData = data
        }
    }

    @action
    cleanServerData(type) {
        if (!this.ServerData[type]) return
        this.ServerData[type] = null
    }
}
