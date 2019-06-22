import React, { Component } from 'react';
import team2 from '../../../../data/team2.jpg';
require('./supervisors.css');


class Supervisors extends Component {
  render() {
    return (
      <div id='card_main'>
      <div id='s_title'><span>Supervisors</span></div>
        <div className='row_main'>
          <div className='row'>
            <div className="card" >
              <img id='j_img' src={team2} alt="John" />
              <h1>John Doe</h1>
              <p id="c-title">CEO & Founder, Example</p>
              <p>Harvard University</p>
              <div id='links' >
                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}


export default Supervisors;
