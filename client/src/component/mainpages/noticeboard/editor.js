import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './draft.css';
import './noticeboard.css'
class Editor extends Component {
    editor = null;
    saveData = (evt) => {

        console.log(this.editor.getData());

    }
    render() {
        return (
            <div className="App">
                   <div id='main-c'>
                <div id='pcontainer' ><span id='ntitle'>Upload Notice</span></div>
                <div id='label'><label>Title</label><input type='text' name='title' /></div>
                <button onClick={this.saveData}>Save Data</button>
                {/* <h2>Using CKEditor 5 build in React</h2> */}
                <div id='ckeditor-parent'>
                <div id='ckeditor-child-title'>
                <label>Body</label>
                </div>
                    <div id='ckeditor-child-editor'>
                        <CKEditor
                            editor={ClassicEditor}
                            // data="<p>Hello from CKEditor 5!</p>"
                            onInit={editor => {
                                this.editor = editor;
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
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
            </div>
            </div>
            
        );
    }
}

export default Editor;