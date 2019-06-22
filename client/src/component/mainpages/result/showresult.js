import React, { Component } from 'react';
// import './result.css';
import Result from './result';



class UploadResult extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     showComponent: false,
        // };
        this.state = {
            components: [

            ],
            linkadress: '',
            time: new Date().toLocaleString()
        };

    }



    render() {
        return (
            <div id='main-c'>
                <form>
                    <table className={'tbl-result'} >
                        <tbody>
                            <tr><p id={'user-type'} className={'p-r'}><b>Upload Result</b></p></tr>
                            <tr>
                                <th>Name</th>
                                <td className={'r-td'}><input type='text' name='name' placeholder='Student Name' /></td>
                                <th>Roll No</th>
                                <td className={'r-td'}><input type='numeric' name='name' placeholder='Roll no' /></td>
                            </tr>
                            <tr>
                                <th>Father Name</th>
                                <td className={'r-td'}><input type='text' name='name' placeholder='Father Name ' /></td>
                                <th>Group ID</th>
                                <td className={'r-td'}><input type='text' name='name' placeholder='Group ID' /></td>
                                {/* <td className={'p-pic'}></td> */}

                            </tr>
                            <tr>
                                <td >
                                    <input type='submit' className={'r-btn'} value='Save' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className='pcontainer' align='left' ><span  className='ptitle'>Results</span></div>
                <div id='upload' >
                    <form  id='form-inline' action=''>

                    <label for=''>Result Title:</label>
                    <input id='fa' required='required' type='text' name='title' value={this.state.linkadress} onChange={this.linkAdress.bind(this)} />

                    <label for=''>Upload Result:</label>
                    <input id='fb' type='file' name='uploadfile' value='' />
                    <input type='submit' className='btnn' onClick={this.createComponents} value={'Upload Result'} /> */}

                    {/* <button id='fc' name='Submit' onClick={this.genNDiv} > Click </button> */}

                </form>



            </div>

        )
    }
};



export default UploadResult;