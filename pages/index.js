import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { Pagination } from 'antd'
import '../styles/style.styl'
import '../styles/test.styl'

class Index extends Component {
    static async getInitialProps({ query: { search, page = 0, isPage } }) {
        let url = 'http://127.0.0.1:4000'
        if (search) {
            const data = await fetch(`${url}/search/${search}`)
            const list = await data.json()
            return {
                list,
                page: 'search',
                pageIndex: page + 1
            }
        }

        if (isPage) {
            const data = await fetch(`${url}/posts/page/${page}`)
            const list = await data.json()
            return {
                list,
                page: 'page',
                pageIndex: page + 1
            }
        }

        const data = await fetch(`${url}/posts`)
        const list = await data.json()
        return {
            list,
            page: 'home',
            pageIndex: page + 1
        }
    }

    onChange = async (page) => {
        let data = await fetch(`http://127.0.0.1:4000/posts/page/${page}`)
        const list = await data.json()
        console.log(list)
    }

    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Link prefetch href={`/page/${Number(current - 1)}`}><a>上一页</a></Link>
        } else if (type === 'next') {
            return <Link prefetch href={`/page/${Number(current + 1)}`}><a>下一页</a></Link>
        }
        console.log(current, type, originalElement)
        return originalElement
        // return <Link prefetch href={`/page/${current}`}><a>{current}</a></Link>
    }

    renderHome = () => {
        return (
            <div>
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
                <Pagination
                    defaultCurrent={Number(this.props.pageIndex)}
                    total={150}
                    itemRender={this.itemRender}
                    onChange={this.onChange}
                />
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
