import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import dayjs from 'dayjs'
import '../styles/style.styl'
import '../styles/test.styl'

class Index extends Component {
    static async getInitialProps ({ query: { name } }) {
        let url = 'http://127.0.0.1:4000'
        const data = await fetch(`${url}/posts/${name}`)
        const post = await data.json()
        return {
            post: post.length ? post[0] : null
        }
    }

    render() {
        return (
            this.props.post && (
                <div>
                    <div>{this.props.post.post_title}</div>
                    <div>{dayjs(this.props.post.post_modified_gmt).format('YYYY-MM-DD HH:mm')}</div>
                    <div dangerouslySetInnerHTML={{
                        __html: this.props.post.post_content
                    }} className='preview' />
                </div>
            )
        )
    }
}

export default Index
