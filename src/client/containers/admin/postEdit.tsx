import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const FormItem = Form.Item

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

    setCodeMirrorFocus = () => {
        this.codeMirror.editor.focus()
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const content = ''
        const options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: false,
            mode: 'markdown',
            theme: 'material'
        }
        return (
            <div className='postEdit' onClick={this.setCodeMirrorFocus}>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入文章标题'
                            }
                        ]
                    })(<Input size='large' type='password' placeholder='请输入文章标题' />)}
                </FormItem>
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