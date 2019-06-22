import React, { Component } from 'react';
import './instructor_info.css';

class Instructor_Info extends Component {
    render() {
        return (
            <div id='instructor_info_main_container' >
                <div id='instructor_info_container'>
                    <h4 align='left'>Instructor's Info</h4>
                    <hr className='hr' />

                    <table id='instructor_info'>
                        {/* <caption>Instructor's Info</caption> */}
                        {/* <hr /> */}
                        <tr>
                            <th>Instructor's Name:</th>
                            <td>Name here</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>Email here</td>
                        </tr>
                    </table>
                    <h4 align='left'>Instructor's Biography</h4>
                    <div id='biography-container'>

                        <p align='justify'>
                            Lorem ipsum, in graphical and textual a
                            fdkjalksjfkljalkfhasdkfhkjashfdkh
                            bdksfasfdsabfkj
                            mkdbfkasjdf
                            bkfkjsahdfkjahsbnfkjashdfkjhk
                            bfdskjabhjkldfbkasfa
                            jjbnfkasjdfnkajs
                            jbfkjasbdfkfjkashfdhaskdfhkasjhfdjkshakjfkjsdahjkajkfshdfhadsjfkjdsas
                            'bnkjfasdbfnkfsadbkfkfsakdfkadjs
                            bndskjaf
                            nbfkajsfbjsabfdasjkfhkjasfkahskh
                            [ahsjfhasfbajfsdhashafhdkfhjkahskfhaskhfdashkhfkashdfhaskdhfkfhkashd
                            context, refers to filler text that is placed in a document or visual presentation. Lorem ipsum is derived from the Latin "dolorem ipsum" roughly translated as "pain itself."
                    </p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Instructor_Info;
