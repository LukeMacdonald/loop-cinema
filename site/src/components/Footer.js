import React from 'react';

// Footer component
function Footer() {
  const name = "Luke Macdonald";
  const email = "s3888490@student.rmit.edu.au";
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className='row' style={{justifyContent:'center'}}>
          <div className='col-2'>
            <button className='btn btn-primary' style={{borderRadius:'50%',width:'3rem', height:'3rem', backgroundColor:'#00ADB5', borderColor:'#00ADB5'}}><i className='fa fa-facebook'></i></button>
          </div>
          <div className='col-2'>
            <button className='btn btn-primary' style={{borderRadius:'50%',width:'3rem', height:'3rem', backgroundColor:'#00ADB5', borderColor:'#00ADB5'}}><i className='fa fa-google'></i></button>
          </div>
          <div className='col-2'>
            <button className='btn btn-primary' style={{borderRadius:'50%',width:'3rem', height:'3rem', backgroundColor:'#00ADB5', borderColor:'#00ADB5'}}><i className='fa fa-instagram'></i></button>
          </div>
        </div>
        <p style={{marginTop:'2rem'}}>Contact: {name} - {email}</p>
      </div>
    </footer>
  );
}

export default Footer;
