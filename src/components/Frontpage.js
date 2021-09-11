import * as React from 'react'
import Editor from './Editor'
import Login from './Login'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomIcon from './BottomIcon'
import ConfessionPage from './ConfessionPage'
import Main from './Main'



class Frontpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditorOpen: false,
            isSettingOpen: false,
            isLoginOpen: false,
            confessions: [],
            currentUser: JSON.parse(localStorage.getItem("confessionUser")),
            isSidebarShow:false,
        }
        this.openLogin = this.openLogin.bind(this)
        this.openSetting = this.openSetting.bind(this)
        this.openEditor = this.openEditor.bind(this)
        this.closeSetting = this.closeSetting.bind(this)
        this.closeEditor = this.closeEditor.bind(this)
        this.closeLogin = this.closeLogin.bind(this)
        this.addConfession = this.addConfession.bind(this)
        this.setUserProfile = this.setUserProfile.bind(this)
        this.toggleSidebar = this.toggleSidebar.bind(this)
        this.signOut = this.signOut.bind(this)
        
        this.setConfessions = this.setConfessions.bind(this)
        this.updateConfessionLike = this.updateConfessionLike.bind(this)
    }

    updateConfessionLike(id, userID){
        this.setState(prevState => {
            let confession = JSON.parse(JSON.stringify(prevState.confessions))
            const index = confession.findIndex(c => c._id === id)
            const indexOfUserID = confession[index].like.indexOf(userID)
            if(indexOfUserID>-1){
                confession[index].like.splice(indexOfUserID, 1)
            } else {
                confession[index].like.push(userID)
            }
            return {confessions: confession}
         });
    }

    // sort(by){

    //     if(by === 'sortbylike'){
           
    //         this.setState(prevState =>{
    //         let confession = JSON.parse(JSON.stringify(prevState.confessions))
    //         confession = confession.sort((a,b)=> b.like.length - a.like.length)
    //         return {confessions: confession}
    //         })
    //         this.toggleSidebar()
    
    //     } else if(by === 'sortbydate'){
    //         this.setState(prevState =>{
    //             let confession = JSON.parse(JSON.stringify(prevState.confessions))
    //             confession = confession.sort((a,b)=> b.createdAt - a.createdAt)
    //             return {confessions: confession}
    //         })
    //         this.toggleSidebar()
    //     }

        
        
    // }

    setUserProfile(){
        this.setState({ currentUser: JSON.parse(localStorage.getItem("confessionUser"))})
    }

    componentDidMount() {
        this.setUserProfile()
    }


    setConfessions(c){
        console.log(c)
        this.setState({ confessions: c })
    }

    addConfession(confession){
        // console.log(confession)
        this.setState({ confessions: [...this.state.confessions,confession] })
    }

    toggleSidebar(){
        this.setState(prevState=>({isSidebarShow: !prevState.isSidebarShow }))
    }

    signOut(){
        localStorage.removeItem("confessionUser")
        this.setState({ currentUser:null })
        this.toggleSidebar()

    }


    render() {

    
        return (
            
            <Router>
                <Switch>           
                    <Route exact path="/detail/:id">
                        <ConfessionPage openLogin={this.openLogin} updateConfessionLike={this.updateConfessionLike} confessions={this.state.confessions} />
                    </Route>
                    <Route exact path="/:sort" >
                       <Main setConfessions={this.setConfessions} updateConfessionLike={this.updateConfessionLike} confessions={this.state.confessions} />
                    </Route>
                    <Route exact path="/" >
                       <Main setConfessions={this.setConfessions} sort={this.sort} updateConfessionLike={this.updateConfessionLike} confessions={this.state.confessions} />
                    </Route>
                </Switch>
                <Sidebar sortByLike={this.sortByLike} signOut={this.signOut} isSidebarShow={this.state.isSidebarShow} currentUser={this.state.currentUser} />
                <BottomIcon currentUser={this.state.currentUser} openEditor={this.openEditor} openLogin={this.openLogin} showSidebar={this.toggleSidebar}  />             
                <Login setUserProfile={this.setUserProfile} closeLogin={this.closeLogin} isLoginOpen={this.state.isLoginOpen} />
                <Editor addConfession={this.addConfession} closeEditor={this.closeEditor} isEditorOpen={this.state.isEditorOpen} />

            </Router>
            
        )
    }

    openLogin(){
        this.setState({
            isLoginOpen: true
        })
        document.body.style.overflow = 'hidden';
    }
    closeLogin(){
        this.setState({
            isLoginOpen: false
        })
        document.body.style.overflow = 'unset';
    }

    openSetting() {
        
        this.setState({
            isSettingOpen: true
        })
        document.body.style.overflow = 'hidden';
    }

    openEditor() {
        
        this.setState({
            isEditorOpen: true
        })
        document.body.style.overflow = 'hidden';
    }

    closeSetting() {
        this.setState({
            isSettingOpen: false
        })
        document.body.style.overflow = 'unset';
    }


    closeEditor() {
        this.setState({
            isEditorOpen: false
        })
        document.body.style.overflow = 'unset';
    }

}

export default Frontpage