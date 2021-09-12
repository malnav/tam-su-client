import React from 'react'

class Setting extends React.Component {
    constructor(props){
        super(props)
          

        this.state = {
            theme: "light"
        }

        this.toggleTheme = this.toggleTheme.bind(this)
        this.handleSelect = this.handleSelect.bind(this)  
    }

    toggleTheme(){
        const dark = {
          input_background_color:  "#222",
          confession_background_color: "#333", 
          background_color:  "#222",
          font_color: "#eee",
          font_color_grey1: "#aaa",
          font_color_grey2: "#777",
          
        }
        const light = {
          input_background_color:  "#f2f2f2",
          confession_background_color: "#fff",
          background_color:  "#fff",
          font_color: "#111",
          font_color_grey1: "#666",
          font_color_grey2: "#aaa",
        }

        if (this.state.theme === "light"){
          document.documentElement.style.setProperty('--background-color', light.background_color);
          document.documentElement.style.setProperty('--input-background-color', light.input_background_color);
          document.documentElement.style.setProperty('--confession-background-color', light.confession_background_color);
          document.documentElement.style.setProperty('--font-color', light.font_color);
          document.documentElement.style.setProperty('--font-color-grey1', light.font_color_grey1);
          document.documentElement.style.setProperty('--font-color-grey2', light.font_color_grey2);
        }else{
          document.documentElement.style.setProperty('--background-color', dark.background_color);
          document.documentElement.style.setProperty('--input-background-color', dark.input_background_color);
          document.documentElement.style.setProperty('--confession-background-color', dark.confession_background_color);
          document.documentElement.style.setProperty('--font-color', dark.font_color);
          document.documentElement.style.setProperty('--font-color-grey1', dark.font_color_grey1);
          document.documentElement.style.setProperty('--font-color-grey2', dark.font_color_grey2);
        }
      }

    componentDidMount(){
        const option  = localStorage.getItem('theme')
        if (option){
            this.setState({theme: option})
        }
    }
    componentDidUpdate(){
        this.toggleTheme()
    }

    handleSelect(e){
        this.setState({theme: e.target.value})
        localStorage.setItem('theme',e.target.value)
      }

    render(){
        return (
            <>  
                    <label>Theme</label>
                    <select value={this.state.theme} onChange={this.handleSelect}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                    
            </>
        )
    }
}

export default Setting
