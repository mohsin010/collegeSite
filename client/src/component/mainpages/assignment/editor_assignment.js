import React, { Component } from 'react';
// import './result.css';
import Assignment from './assignment';
import CreateAssignment from './display_assignment';



class AssignmentEditor extends Component {
    
   
    constructor(props) {
        super(props);
        this.state = {
            no: '',
            title:'',
            topic:'',
            due_date:'',
            rollno:'',
            file:''
        };
        console.log(this.state.no);

        this.deleteComponent = this.deleteComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // this.getBase64 = this.getBase64.bind(this)


    }
    createComponents = (ob, i) => {
        this.setState({
            components: this.state.components.concat(<Assignment component={this.state.components}  linkadress={this.state.linkadress} 
                time={this.state.time}
                />)
        });
        
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,
            [evt.target.name]: evt.target.value,

        })
    }
    // getNo(evt) {
    //     console.log(this.state.no, this.state.dueDate, this.state.title , this.state.topic, this.state.rollno,)
    // }

    deleteComponent(e) {
        console.log("Im e",e);
        const component = this.state.components.filter((e) => e !== e)

        this.setState({ components: component })
    }


    pickFile=(e)=>{
        this.setState({
            file:e.target.files[0]
        })
    }
    

    submitAssignment = (e) =>{
        debugger;
        e.preventDefault();
        let data = this.state;
       let  formData = new FormData();
        formData.append('no',data.no);
        formData.append('title',data.title);
        formData.append('topic',data.topic);
        formData.append('due_date',data.due_date);
        formData.append('rollno',data.rollno);
        formData.append('file',data.file)
        fetch('/assignments', {
            method: 'POST',
            body: formData
        }).then((resp) => resp.json()).then((resp) => {
            if(resp.rollno){
                alert('Assignment Successfully Published to :' + resp.rollno);

            }else if(resp.err){
                alert('Error is Occured');
            }
        })
    }
     
    
    //   getBase64(e) {
    //     var file = e.target.files[0];
    //     let reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => {
    //       this.setState({
    //         file: reader.result
    //       })
    //     };
    //     reader.onerror = function (error) {
    //       console.log('Error: ', error);
    //     }
    //   }
       
      
    render() {
        return (
            <div className='main-c'>
                <form onSubmit={this.submitAssignment}>
                    <table className={'tbl-result'} >
                            <tr><h4 id={'user-type'} className={'p-r'}>Upload Assignment</h4></tr>
                        <tbody>
                            <tr>
                                <th>No:</th>
                                <td className={'r-td'}><input type='numeric' name='no' required='required' placeholder='Enter No' onChange={this.handleChange } /></td>
                                <th>Title:</th>
                                <td className={'r-td'}><input type='text' name='title' required='required' placeholder='Enter Title' onChange={this.handleChange } /></td>
                            </tr>
                            <tr>
                                <th>Topic:</th>
                                <td className={'r-td'}><input type='text' name='topic' required='required' placeholder='Enter Topic Name ' onChange={this.handleChange } /></td>
                                <th>File:</th>
                                <td className={'r-td'}><input type='file' name='file' onChange = {this.pickFile}  placeholder='Enter Group ID'  /></td>
                                {/* <td className={'p-pic'}></td> */}
                                {/* onChange={this.getBase64 }  */}

                            </tr>
                            <tr>
                                <th>Due Date:</th>
                                <td className={'r-td'}><input type='date' name='due_date' required='required' placeholder='Enter Marks ' onChange={this.handleChange } /></td>
                                <th>Roll No:</th>
                                <td className={'r-td'}><input type='numeric' name='rollno'  required='required' placeholder='Enter Roll No ' onChange={this.handleChange } /></td>

                            </tr>
                            <tr>
                                <td >
                                    <input type='submit' className={'r-btn'} value='Save' />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>
                {/* <button  >Click</button> */}
                  {/* {this.state.components.map((item, index) => <tr key={index}><td>{item}</td></tr>)} */}


               

            </div>

        )
    }
};



export default AssignmentEditor;