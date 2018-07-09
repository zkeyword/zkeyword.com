import { observable, action } from 'mobx'
import axios from 'axios'
// import { url } from '../../../../config'

class HomeStore {
    @observable data: any = null

    @action
    async getPosts() {
        const { data } = await axios('http://127.0.0.1:3001/api/posts')
        this.data = data
    }

    @action
    cleanServerData() {
        this.data = null
    }
}

const homeStore = new HomeStore()

export default homeStore
export { HomeStore }
