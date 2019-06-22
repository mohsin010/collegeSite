import React, { Component } from 'react';
import UploadDocument from './uploaddocument';



class Document extends Component {
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

        this.deleteComponent = this.deleteComponent.bind(this);

    }
    createComponents = (ob, i) => {
        this.setState({
            components: this.state.components.concat(<UploadDocument deleteComponent={this.deleteComponent} component={this.state.components} linkadress={this.state.linkadress} 
                time={this.state.time}
                />)
        })
    }

    linkAdress(evt) {
        this.setState({
            linkadress: evt.target.value
        })
    }

    checkComponent(item) {
        return  item !== item;
    }
    deleteComponent(e) {
        console.log("Im e",e);
        const component = this.state.components.filter((e) => e !== e)

        this.setState({ components: component })
    }



    render() {
        return (
            // <p>{this.state.components.map(item => <h1>{item}</h1>)}</p>
            <div id='main-c'>
                <div className='pcontainer' align='left' ><span  className='ptitle'>Important Documents</span></div>
                <div id='upload' >
                    <form  id='form-inline' action=''>

                    <label for=''>Document Title:</label>
                    <input id='fa' required='required' type='text' name='title' value={this.state.linkadress} onChange={this.linkAdress.bind(this)} />

                    <label for=''>Upload Document:</label>
                    <input id='fb' type='file' name='uploadfile' value='' />
                    <input type='submit' className='btnn' onClick={this.createComponents} value={'Upload Document'} />

                    {/* <button id='fc' name='Submit' onClick={this.genNDiv} > Click </button> */}

                    </form> 



                </div>

                <div >
                    <table rules='' width='100%'>
                        {/* <tbody id={"container"}> */}
                        {this.state.components.map((item, index) => <tr key={index}><td>{item}</td></tr>)}


                        {/* <hr></hr> */}

                        {/* </tbody>/ */}
                    </table>
                </div>
            </div>

        )
    }
};



export default Document;