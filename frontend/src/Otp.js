import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from 'react';

const Otp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {countryCode, phoneNumber} = location.state;
    const [otp, setOTP] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [error, setError] = useState(null);
  
    const handleInputChange = (e, index) => {
      const { value } = e.target;
  
      // Update the OTP array with the new value
      const newOTP = [...otp];
      newOTP[index] = value;
  
      setOTP(newOTP);
  
      // Move focus to the next input field if a character is entered
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    };

    const handleClick = async(e)=>{
        e.preventDefault();
        try{
            //Send OTP to user mobile number
            const data = {
                countryCode,
                phoneNumber 
            };
            const response = await axios.post('https://otp-verification-system-api.onrender.com/api/send-otp',data);
            alert(response.data.message);
        }
        catch(error){
            if(error.message==='Network Error'){
                alert('OTP submission failed due to network failure - please try again.');
            }
            else{
                alert('OTP submission failed - '+ error.response.data.message);
            }
        }
    };  

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const fourDigitOtp = otp[0]+otp[1]+otp[2]+otp[3];
        if(fourDigitOtp.length!==4){
            setError('Error! enter a valid 4 digit OTP.');
            setTimeout(()=>{
                setError(null);
            },2000);
            return;
        }
        try{
            //Verify OTP entered by a user
            const data = {
                countryCode,
                phoneNumber,
                otp: fourDigitOtp
            };
            const response = await axios.post('https://otp-verification-system-api.onrender.com/api/verify-otp',data);
            alert(response.data.message);
            
            //Navigate to Success Page
            navigate('/success');
        }
        catch(error){
            if(error.message==='Network Error'){
                alert('OTP verification failed due to network failure - please try again.');
            }
            else{
                alert('OTP verification failed - '+ error.response.data.message);
            }
        }
    };
    return (
    <div className="container">
        {error && <p style={{color:'red'}}>{error}</p>}
        <br /><img src="./img/otp.jpg" alt="verified_image" />
        <h2>Please verify Mobile number</h2><br/>
        <p>An OTP is sent to 
            <span>{' +'+countryCode+phoneNumber}</span><br/>
            <br /><Link to={'/'}>Change Phone Number</Link>
        </p><br />

        <form onSubmit={handleSubmit}>
            <div>
            {otp.map((value, index) => (
                <input
                className="input"
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                inputmode="numeric"
                maxLength={1}
                />
            ))}
            </div>
            <br/><p>Didn't reveive the code? <span className="resend" onClick={handleClick}>Resend</span></p>
            <div>
            <button id="btn" type="submit">Verify</button>
            </div>
        </form>
    </div>
    );
}
 
export default Otp;