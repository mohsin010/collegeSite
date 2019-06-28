import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './draft.css';
import './noticeboard.css'
class Editor_announce extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            time: new Date().toDateString(),
            titleerr: false,
            bodyerr: false

        }

    }

    editor = null;

    changeHandler = (evt, arg) => {
        let titl = evt.target.value
        this.setState({
            [arg || "title"]: evt.target.value,

        })
        if ([evt.target.name] == 'title') {

            this.setState({
                titleerr: false,

            })
        } else {
            this.setState({
                bodyerr: false,

            })

        }

        // console.log(this.editor.getData());
        console.log(this.state);

    }




    submitData = (e) => {
        e.preventDefault();
        if (this.state.title == '' && this.state.body == '') {
            this.setState({
                titleerr: true,
                bodyerr: true
            })
            alert("Please Fill Red Border Fields")
        } else if (this.state.title == '') {
            this.setState({
                titleerr: true
            })
            alert("Please Fill Title Field")
        } else if (this.state.body == '') {
            this.setState({

                bodyerr: true
            })
            alert("Please Fill Body Field")

        } else {

            fetch('/announcement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(this.state),
            }).then((resp) => resp.json()).then((resp) => {

                if (resp._id) {

                    this.setState({
                        title: '',
                        body: ''

                    })


                    alert('Announcement Successfully Published ');

                } else {
                    this.setState({
                        title: '',
                        body: ''

                    })
                    alert('Announcement Already Uploaded');
                }
            })
        }
    }



    render() {
        return (
            <div className="App">
                <div id='main-c'>
                    <div id='pcontainer'  ><span id='ntitle' className='pcontainer_ral'>Upload Announcement</span></div>
                    <div id='label'><label>Title</label><input style={{ borderColor: this.state.titleerr ? 'red' : 'inherit' }} type='text' name='title' required='required' value={this.state.title} onChange={this.changeHandler} /></div>
                    {/* <h2>Using CKEditor 5 build in React</h2> */}
                    <div id='ckeditor-parent'>
                        <div id='ckeditor-child-title'>
                            <label>Body</label>
                        </div>
                        <div id='ckeditor-child-editor' className='ckedit' style={{ borderColor: this.state.bodyerr ? 'red' : 'inherit' }}>
                            <CKEditor
                                data={this.state.body}
                                editor={ClassicEditor}
                                // data="<p>Hello from CKEditor 5!</p>"
                                onInit={editor => {
                                    this.editor = editor;
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log(data);
                                    this.changeHandler({
                                        target: {
                                            value: data
                                        }
                                    }, "body")
                                    // { event, editor,
                                }}
                                onBlur={editor => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={editor => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>
                    </div>
                    <button id='btn_n_editor' onClick={this.submitData}>Publish Announcement</button>
                </div>

            </div>

        );
    }
}

export default Editor_announce;