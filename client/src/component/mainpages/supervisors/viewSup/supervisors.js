import React, { Component } from 'react';
import team2 from '../../../../data/team2.jpg';
import './supervisors.css';


class Supervisors extends Component {

  constructor(props){
    super(props)
    this.state = {
      supervisors:[]
    }


  }

  componentDidMount(){
        fetch('/supervisor_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(this.state)
        }).then((resp) => resp.json()).then((supervisors) => {

            if (supervisors) {
            this.setState({ 
                
              supervisors:supervisors
            });
        }else{
            console.log('No supervisor Yet')
        }
        })
    }


  render() {
    return (
      <div id='card_main'>
      <div id='s_title'><span>Supervisors</span></div>
        <div className='row_main'>
         {this.state.supervisors.map((supervisor) => {

           return  <div className='row'>
            <div className="card" > 
              <img id='j_img' src={supervisor.file} alt="John" />
              <h3>{supervisor.name}</h3>
              <div id='detail'>
              <p id="c-title">{supervisor.designation}</p>
              <p>{supervisor.department}</p>
              </div>
              {/* <div id='links' >
                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a>
              </div> */}
            </div>
          </div>
         })}
          
        </div>
      </div>
    );
  }
}


export default Supervisors;
// let ConnectedDefault = connect((store) => {

//   return {
//     login: store.loginReducer
//   }
// })(withRouter(Default));

// export default ConnectedDefault;