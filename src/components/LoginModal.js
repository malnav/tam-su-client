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
        this.toggleLeftRight = this.toggleLeftRight.bind(this)
        this.onGoogleFailure = this.onGoogleFailure.bind(this)
        
        this.loginGoogleFacebook = this.loginGoogleFacebook.bind(this)
    }

    toggleLeftRight(){
        this.setState(prevState => ({
            isLoginShow: !prevState.isLoginShow
        }))
       
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
                photo = response.picture.data.url
                email = response.email
            }
            const responseFromServer = await loginThirdparty({name,photo,email})
            if (responseFromServer.status === 201){
                const user = responseFromServer.data
                //Create Account
                localStorage.setItem('confessionUser', JSON.stringify(user))
                this.props.setUserProfile()
                this.props.closeLogin()
            }
            
        } catch (error) {
            console.log(error)
        }
       
    }

    onGoogleFailure(response){
        console.log(response)
    }

    render(){
        return (
            <Modal modalSize="modal-login" closeModal={this.props.closeLogin} isModalOpen={this.props.isLoginOpen}>
                    <div className={this.state.isLoginShow?"login-signup-container":"login-signup-container showSignUp"}>   
                        <div className="login-container">   
                            <GoogleLogin
                                clientId="233713890537-24vm05j1innm9hrg02nkeo9pqvh0nq66.apps.googleusercontent.com"
                                render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}> <AiFillGoogleCircle size={20}/> Vào bằng Google</button>
                                )}
                                buttonText="Login"
                                onSuccess={this.loginGoogleFacebook}
                                onFailure={this.onGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                            <FacebookLogin
                                appId="153252090323278"
                                fields="name,email,picture"
                                callback={this.loginGoogleFacebook}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick}><AiFillFacebook size={20} />Vào bằng Facebook</button>
                                  )}
                                />
                            <button onClick={this.toggleLeftRight}><AiOutlineMail size={20} /> Vào bằng Email</button>
                        </div>
                        <div className="sign-up-container">
                            <button onClick={this.toggleLeftRight}>Back</button>
                        </div>
                    </div>
            </Modal>
        )
    }
}

export default Login
