import { observable, action } from 'mobx'
import axios from 'axios'
// import { url } from '../../../../config'

class PostStore {
    @observable data: any = null

    @action
    async getPost(name) {
        const { data } = await axios(`http://127.0.0.1:3001/api/posts/${name}`)
        this.data = data
    }

    @action
    cleanServerData() {
        this.data = null
    }
}

const postStore = new PostStore()

export default postStore
export { PostStore }
