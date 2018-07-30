import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Menu } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'

interface HomeProps {
    form: any,
    loginStore: any
}

@inject('loginStore')
@observer
class PostEdit extends React.Component<HomeProps, any> {
    codeMirror: any

    constructor(props) {
        super(props)
        this.codeMirror = ''
    }

    componentDidMount() {
        require('codemirror/mode/markdown/markdown') // ssr 无navigator对象
    }

    save = () => {
        this.setState({
            i: this.state.i
        })
    }

    onKeyDown = (editor, event) => {
        if (event.ctrlKey === true && event.keyCode === 83) {
            event.returnValue = false
            this.save()
        }
        return false
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const content = ''
        const options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            mode: 'markdown',
            theme: 'material'
        }
        return (
            <div className='postEdit'>
                <CodeMirror
                    ref={(cm) => { this.codeMirror = cm }}
                    value={content}
                    options={options}
                    autoCursor={false}
                    onChange={(editor, data, value) => {
                        this.setState({ value })
                    }}
                    onKeyDown={(editor, event) => {
                        this.onKeyDown(editor, event)
                    }}
                />
            </div>
        )
    }
}

export default Form.create()(PostEdit)