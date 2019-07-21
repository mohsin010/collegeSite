import React, { Component } from 'react';
import './document.css';
import UploadDocument from './uploaddocument';



class Editor_document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkadress: '',
            file: '',
            time: new Date().toDateString()
        };
        console.log(this.state.no);

        this.handleChange = this.handleChange.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
    }
    pickFile = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,

        })
    }

    componentDidMount() {
        this.submitDocument = (e) => {

            e.preventDefault();
            let data = this.state;
            let formData = new FormData();

            formData.append('file', data.file)
            formData.append('components', data.components)
            formData.append('linkadress', data.linkadress)
            formData.append('time', data.time)


            fetch('/documents', {
                method: 'POST',
                body: formData,
            }).then((resp) => resp.json()).then((resp) => {
                if (resp) {
                    fetch('/sup_document_display', {
                        method: "POST"

                    }).then((resp) => {
                        return resp.json()
                    }).then((res) => {
                        this.refs.inputfile.value = '';

                        this.setState({
                            // component: '',
                            linkadress: '',
                            // file:''
                            // time:''
                        })

                        // store.dispatch({
                        //     type: 'assignment_uploaded',
                        //     payload: res
                        // });
                    })


                    alert('Document Successfully Published ');

                } else {
                    alert('Error is Occured');
                }
            })
        }
    }




    // createComponents = (ob, i) => {
    //     this.setState({
    //         components: this.state.components.concat(<UploadDocument deleteComponent={this.deleteComponent} component={this.state.components} linkadress={this.state.linkadress} 
    //             time={this.state.time}
    //             />)
    //     })
    // }


    checkComponent(item) {
        return item !== item;
    }
    deleteComponent(e) {
        console.log("Im e", e);
        const component = this.state.components.filter((e) => e !== e)

        this.setState({ components: component })
    }



    render() {
        return (
            // <p>{this.state.components.map(item => <h1>{item}</h1>)}</p>
            <div id='main-c_editor' className='main-c-editor'  >
                <div className='pcontainer-editor' align='left' ><span className='ptitle-editor'>Upload Documents</span></div>
                {/* <div id='' > */}
                    {/* upload-editor */}
                        <form  onSubmit={this.submitDocument} >
                    <table className='tbl_doc' cellSpacing='8'>
                            <tr>
                                <th className='th_doc'>

                                    <label for=''>Document Title:</label>
                                </th>
                                <td>

                                    <input id='fae' placeholder='Document Title' required='required' type='text' name='linkadress' value={this.state.linkadress} onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th className='th_doc'>

                                    <label for=''>Upload File:</label>
                                </th>
                                <td>

                                    <input id='fb' type='file' name='file' ref='inputfile' onChange={this.pickFile.bind(this)} />
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>

                                    <input type='submit' className='btnn-doc' value={'Upload'} />
                                </td>
                            </tr>
                    </table>
                        </form>



                    {/* <button id='fc' name='Submit' onClick={this.genNDiv} > Click </button> */}




                {/* </div> */}

                {/* <div >
                    <table rules='' width='100%'>
                        {this.state.components.map((item, index) => <tr key={index}><td>{item}</td></tr>)}


                        
                    </table>
                </div> */}
            </div>

        )
    }
};



export default Editor_document;