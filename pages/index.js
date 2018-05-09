import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import '../styles/style.styl'
import '../styles/test.styl'

const Index = (props) => (
    <div className='example'>
        <h1>list Shows</h1>
        <div>
            {
                props.list && props.list.map((item, index) => {
                    return (
                        <div key={item.ID}>
                            <Link prefetch href={`/posts/${item.post_name}`}><a>{item.post_title}</a></Link>
                        </div>
                    )
                })
            }
        </div>
    </div>
)

Index.getInitialProps = async function () {
    const data = await fetch('http://127.0.0.1:4000/posts')
    const list = await data.json()
    return {
        list
    }
}

export default Index