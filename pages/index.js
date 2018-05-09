import fetch from 'isomorphic-unfetch'
import '../styles/style.styl'
import '../styles/test.styl'

const Index = (props) => (
    <div className='example'>
        <h1>list Shows</h1>
        <div>
            {
                props.shows && props.shows.map((item, index)=>{
                    return <div key={item.ID}>{item.post_title}</div>
                })
            }
        </div>
    </div>
)

Index.getInitialProps = async function() {
    const data = await fetch('http://127.0.0.1:4000/posts')
    const data2 = await data.json()
    return {
        shows: data2
    }
}

export default Index