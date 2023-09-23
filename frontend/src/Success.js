const Success = () => {
    return ( 
    <div className="container">
        <img src="./img/welcome.jpg" alt="welcome_image"/>
        <h2>Welcome to AdmitKard</h2><br/>
        <br/><p>In order to provide you with<br/>a custom experience,<br/>
        <span style={{fontWeight: 'bold'}}>we need to ask you a few questions.</span></p>
        <button type="button" id="btn">Get Started</button>
        <p style={{lineHeight:'30px'}}>*This will only take 5 min.</p>
    </div>
    );
}
 
export default Success;