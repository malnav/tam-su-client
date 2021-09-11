import React from 'react'
import GoogleLogin from 'react-google-login'
import {loginThirdparty} from '../Services/UserAPI'
import Modal from './Modal'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {AiFillFacebook,AiFillGoogleCircle,AiOutlineMail} from 'react-icons/ai'



class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoginShow: true
        }
        this.openLogin = this.openLogin.bind(this)
        this.openSignup= this.openSignup.bind(this)
        this.onGoogleSuccess = this.onGoogleSuccess.bind(this)
        this.onGoogleFailure = this.onGoogleFailure.bind(this)
        this.loginGoogle = this.loginGoogleFacebook.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
    }

    openLogin(e){
        this.setState(prevState => ({
            isLoginShow: !prevState.isLoginShow
        }))
       
    }

    openSignup(e){
        this.setState(prevState => ({
            isLoginShow: !prevState.isLoginShow
        }))
    }

    responseFacebook(response){
        console.log(response);
        this.loginGoogleFacebook(response)
    }

    async loginGoogleFacebook(response){
        try {

            let name,photo,email
          
            if(response.profileObj){
                name = response.profileObj.name
                photo = response.profileObj.imageUrl
                email = response.profileObj.email
            } else{
                name = response.name
                console.log("🚀 ~ response.picture.url", response.picture.data.url)
                photo = response.picture.data.url
                email = response.email
            }
            // console.log("🚀 ~ responseFromGoogle", response)
           
            const responseFromServer = await loginThirdparty({name,photo,email})
            // console.log("🚀 ~ responseFromServer", responseFromServer)    
            if (responseFromServer.status === 201){
                const user = responseFromServer.data
                // console.log("🚀 ~ user from server", user)
                //Create Account
                localStorage.setItem('confessionUser', JSON.stringify(user))
                this.props.setUserProfile()
                this.props.closeLogin()
            }
            
        } catch (error) {
            console.log(error)
        }
       
    }

    onGoogleSuccess(response){

        this.loginGoogleFacebook(response)

    }
    onGoogleFailure(){

    }

    render(){
        return (
            <Modal modalSize="modal-login" closeModal={this.props.closeLogin} isModalOpen={this.props.isLoginOpen}>
                    <div className={this.state.isLoginShow?"login-signup-container":"login-signup-container showSignUp"}>   
                        <div className="login-container">   
                        {/* <GoogleLogin
                            clientId="233713890537-k6nlvr0lrn2vq5kvsj38lrnqasprhdum.apps.googleusercontent.com"
                            buttonText="Continue With Google"
                            onSuccess={this.onGoogleSuccess}
                            onFailure={this.onGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                            <GoogleLogin
                                clientId="233713890537-k6nlvr0lrn2vq5kvsj38lrnqasprhdum.apps.googleusercontent.com"
                                render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}> <AiFillGoogleCircle size={20}/> Vào bằng Google</button>
                                )}
                                buttonText="Login"
                                onSuccess={this.onGoogleSuccess}
                                onFailure={this.onGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                            <FacebookLogin
                                appId="153252090323278"
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick}><AiFillFacebook size={20} />Vào bằng Facebook</button>
                                  )}
                                />
                            <button onClick={this.openSignup}><AiOutlineMail size={20} /> Vào bằng Email</button>
                        </div>
                        <div className="sign-up-container">
                            {/* <h4>Continue with an email link</h4>
                            <p>Enter your email and we'll send you a link to login to your account.</p>
                            <input type="text" />
                            <div><a onClick={this.openLogin}>Back</a><button>Submit</button></div> */}
                            <button onClick={this.openLogin}>Back</button>
                        </div>
                    </div>
            </Modal>
        )
    }
}

export default Login
