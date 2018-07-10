import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import * as dayjs from 'dayjs'

interface PostProps {
    appStore: any
}

@inject('appStore')
@observer
export default class Home extends React.Component<PostProps, any> {
    constructor(props) {
        super(props)
        props.appStore.getPost(props.match.params.name)
    }

    componentWillUnmount() {
        this.props.appStore.cleanServerData('postData')
    }

    render() {
        const postData = this.props.appStore.ServerData.postData
        return postData ? (
            <div>
                {/* <NavLink to='/ssr/html2'><span>home2</span></NavLink> */}
                <div>{postData.post_title}</div>
                <div>{dayjs(postData.post_modified_gmt).format('YYYY-MM-DD')}</div>
                <div dangerouslySetInnerHTML={{ __html: postData.post_content }} />
            </div>
        ) : null
    }
}
