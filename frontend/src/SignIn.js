import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState();
    const [error, setError] = useState(null);
    const handleClick = async(e)=>{
        e.preventDefault();
        if(value===undefined || value.length<10){
            setError('Error! enter a valid phone number.');
            setTimeout(()=>{
                setError(null);
            },2000);
            return;
        }
        try{
            //Send OTP to user mobile number
            const countryCode = value.slice(0,2);
            const phoneNumber = value.slice(2)
            const data = {
                countryCode,
                phoneNumber 
            };
            const response = await axios.post('http://localhost:8000/api/send-otp',data);
            alert(response.data.message);
            
            //Navigate to OTP verification page
            navigate('/otp',{
                state:{
                    countryCode,
                    phoneNumber
                }
            });
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
    return ( 
        <div className="container">
            {error && <p style={{color:'red'}}>{error}</p>}
            <img src="./img/logo.png" alt="brand-logo"/>
            <h2 style={{color:'black'}}>Welcome Back</h2><br/>
            <p>Please sign in to your account</p><br/><br/>
            <div><p style={{fontSize:'small'}}>Enter Contact Number</p>
            <PhoneInput country={'in'} value={value} onChange={setValue}/>
            </div><br/>
            <br/><p>We will send you a one time SMS message.<br/>Charges may apply.</p>
            <button id="btn" onClick={handleClick}>Sign In with OTP</button>
        </div>  
    );
}
 
export default SignIn;