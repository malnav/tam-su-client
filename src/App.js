import './Sass/App.scss';
import React from 'react'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import BottomBar from './components/BottomBar'
import Editor from './components/EditorModal'
import Login from './components/LoginModal'
import SinglePage from './Pages/SinglePage'
import MainPage from './Pages/MainPage'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: "light",
            isEditorOpen: false,
            isLoginOpen: false,
            confessions: [],
            currentUser: JSON.parse(localStorage.getItem("confessionUser")),
            isSidebarShow:false,
        }
        this.toggleLoginModal = this.toggleLoginModal.bind(this)
        this.toggleEditorModal = this.toggleEditorModal.bind(this)
        this.toggleSidebar = this.toggleSidebar.bind(this)
        this.addConfession = this.addConfession.bind(this)
        this.signOut = this.signOut.bind(this)
        this.setConfessions = this.setConfessions.bind(this)
        this.setUserProfile = this.setUserProfile.bind(this) 
        
    }

    setUserProfile(){
      this.setState({ currentUser: JSON.parse(localStorage.getItem("confessionUser"))})
    }
    componentDidMount() {
      this.setUserProfile()
    }

    setConfessions(c){
        this.setState({ confessions: c })
    }

    addConfession(confession){
        // console.log(confession)
        this.setState({ confessions: [...this.state.confessions,confession] })
    }

    toggleSidebar(){
        this.setState(prevState=>({isSidebarShow: !prevState.isSidebarShow }))
    }

    toggleLoginModal(){
        this.setState(prevState =>  ({isLoginOpen: !prevState.isLoginOpen}))
    }
    
    toggleEditorModal() {
        this.setState(prevState => ({isEditorOpen: !prevState.isEditorOpen}))   
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
                        <SinglePage openLogin={this.toggleLoginModal} />
                    </Route>
                    <Route exact path={["/:sort","/"]}>
                       <MainPage setConfessions={this.setConfessions} updateConfessionLike={this.updateConfessionLike} confessions={this.state.confessions} />
                    </Route>
                </Switch>
                <Sidebar sortByLike={this.sortByLike} signOut={this.signOut} isSidebarShow={this.state.isSidebarShow} currentUser={this.state.currentUser} />
                <Login setUserProfile={this.setUserProfile} closeLogin={this.toggleLoginModal} isLoginOpen={this.state.isLoginOpen} />
                <Editor addConfession={this.addConfession} closeEditor={this.toggleEditorModal} isEditorOpen={this.state.isEditorOpen} />
                <BottomBar currentUser={this.state.currentUser} openEditor={this.toggleEditorModal} openLogin={this.toggleLoginModal} showSidebar={this.toggleSidebar}  />             
            </Router>
        )
    }

    

}

export default App
