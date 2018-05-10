import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import '../styles/style.styl'
import '../styles/test.styl'

class Index extends Component {
    static async getInitialProps ({ query: { search, page, isPage } }) {
        let url = 'http://127.0.0.1:4000'
        if ( search ) {
            const data = await fetch(`${url}/search/${search}`)
            const list = await data.json()
            return { 
                list,
                page: 'search'
            }
        }

        if ( isPage ) {
            const data = await fetch(`${url}/posts/page/${page}`)
            const list = await data.json()
            return {
                list,
                page: 'page'
            }
        }

        const data = await fetch(`${url}/posts`)
        const list = await data.json()
        return {
            list,
            page: 'home'
        }
    }

    renderHome = () => {
        return (
            <div className='example'>
                <h1>list Shows</h1>
                <div>
                    {
                        this.props.list && this.props.list.map((item, index) => {
                            return (
                                <div key={item.ID}>
                                    <Link prefetch href={`/post/${item.post_name}`}><a>{item.post_title}</a></Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    renderSearch = () => {
        return (
            <div>
                {
                    this.props.list && this.props.list.map((item, index) => {
                        return (
                            <div key={item.ID}>
                                <Link prefetch href={`/posts/${item.post_name}`}><a>{item.post_title}</a></Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            this.props.page === 'search' ? this.renderSearch() : this.renderHome()
        )
    }
}

export default Index
