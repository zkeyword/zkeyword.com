import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import * as dayjs from 'dayjs'
import Loading from '../components/loading'

interface PostProps {
    appStore: any,
    match: any
}

@inject('appStore')
@observer
export default class Home extends React.Component<PostProps, any> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { appStore, match } = this.props
        appStore.getPost(match.params.name)
    }

    componentWillUnmount() {
        this.props.appStore.cleanServerData('postData')
    }

    render() {
        const postData = this.props.appStore.ServerData.postData
        return (
            <section className='lt-main page-post' >
                {
                    postData ? (
                        <>
                            <h2>{postData.post_title}</h2>
                            <div className='time'>{dayjs(postData.post_modified_gmt).format('YYYY-MM-DD')}</div>
                            <div className='articleMain' dangerouslySetInnerHTML={{ __html: postData.post_content }} />
                        </>
                    ) : <Loading />
                }
            </section>
        )
    }
}
