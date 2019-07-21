// import React from 'react'
// import ResultTable from './resulttable';
// import { throws } from 'assert';

// class Result extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             resultfound: false

//         }
//         this.myref = React.createRef();
//         // this.inptRollno = this.inptRollno.bind(this);
//     }
 
  
    
//     render() {

        

//         return (
//             <div>
//             <div className='main-c' id='s-view'  >
//                 <div id='r-serach'>
//                     <p align='left' id={'result-title'} className={'p-r'}><b>Result</b></p>
//                     <div id='r-search2' > 

//                         <form  >
//                             <table className='tbl-result'>
//                                 <tr>
//                                     <th>Roll No</th>
//                                     <td className={'r-td'}><input ref={this.myref} type='numeric' name='rollNo' required='required' placeholder='Enter Roll no' value={this.state.resultfound} onChange={this.inptRollno} /></td>
//                                 </tr>
//                                 <tr>
//                                     <input className='r-btn' type='submit' name='Find Result' value='Find Result'  />
//                                 </tr>
//                             </table>
//                         </form>
//                     </div>

//                 </div>

//             </div>
//                 </div>
//         )
       
//     }
// }
// export default Result;