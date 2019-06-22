import React, { Component } from 'react';
import UploadViva from './vivaupload';
import './viva.css';





class Viva extends Component {
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
        // this.delComponent=this.delComponent.bind(this);
 
    }
    createComponents = (ob, i) => {
        this.setState({
            components: this.state.components.concat(<UploadViva deleteComponent={this.deleteComponent} component={this.state.components} linkadress={this.state.linkadress} 
                time={this.state.time}
                />)
        })
    }

    // delComponent = (e) => {
    //     this.setState({
    //         components: this.state.components.concat(<Hell key={this.state.components.index} component={this.state.components} deleteComponent={this.deleteComponent} linkadress = {this.state.linkadress} />)
    //     })
    // }

    linkAdress(evt) {
        this.setState({
            linkadress: evt.target.value
        })
    }

    // time(){
    //     this.setState({
    //         time:  
    //     })
    // }



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
            <div id='v-main-c'>
                <div id='vcontainer' ><span id='vtitle'>Viva Schedule</span></div>
                <div id='vupload'>
                    <form className='vforminline' action='#'  >

                    <label for=''>Viva Title:</label>
                    <input id='fa' required='required' type='text' name='title' value={this.state.linkadress} onChange={this.linkAdress.bind(this)} />

                    <label for=''>Upload Viva File</label>
                    <input id='fb' type='file' name='uploadfile' value=''  />
                    <input type='submit' id='vbtnn' value={'Post '} onClick={this.createComponents} />

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



export default Viva;