import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const FormItem = Form.Item

interface HomeProps {
    form: any,
    adminStore: any,
    appStore: any
}

@inject('adminStore')
@inject('appStore')
@observer
class PostEdit extends React.Component<HomeProps, any> {
    codeMirror: any

    constructor(props) {
        super(props)
        this.codeMirror = ''
        const id = this.props.adminStore.id
        if (id) {
            this.props.adminStore.getPostByID(id)
        }
    }

    state = {
        value: ''
    }

    componentDidMount() {
        require('codemirror/mode/markdown/markdown') // ssr 无navigator对象
    }

    save = () => {
        // this.setState({
        //     i: this.state.i
        // })
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


    handleSubmit = () => {
        const id = this.props.adminStore.id
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            if (!this.state.value) return
            values.content = this.state.value
            if (id) {
                this.props.adminStore.postModifyByID(id, values)
            } else {
                this.props.adminStore.postAdd(values)
            }
        })

    }

    render() {
        const { getFieldDecorator } = this.props.form
        const options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: false,
            mode: 'markdown',
            theme: 'material'
        }
        const { postData } = this.props.adminStore
        return (
            <div className='postEdit'>
                <FormItem hasFeedback>
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: '请输入文章标题'
                            }
                        ],
                        initialValue: postData ? postData.post_title : ''
                    })(<Input size='large' placeholder='请输入文章标题' />)}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('slug', {
                        rules: [
                            {
                                required: true,
                                message: '请输入文章别名'
                            }
                        ],
                        initialValue: postData ? postData.post_name : ''
                    })(<Input size='large' placeholder='请输入文章别名' />)}
                </FormItem>
                <div onClick={this.setCodeMirrorFocus}>
                    <CodeMirror
                        ref={(cm) => { this.codeMirror = cm }}
                        value={postData ? postData.post_content : ''}
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
                <Button type='primary' className='login-button' onClick={this.handleSubmit}>
                    提交
                </Button>
            </div>
        )
    }
}

export default Form.create()(PostEdit)