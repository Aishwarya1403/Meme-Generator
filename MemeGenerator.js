import React, {Component} from "react"
import './MemeGenerator.css'


class MemeGenerator extends Component{
    constructor(){
      super()
      this.state={
          topText:"",
          bottomText:"",
          randomImg:"",
          allMemeImgs:[]
      }
      this.handleChange=this.handleChange.bind(this)
      this.handleClick=this.handleClick.bind(this)
  } 
  
    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response=>response.json())
            .then(response=>{
                const {memes} = response.data
                this.setState({allMemeImgs:memes})
            })
    }

    handleChange(event){
        const {name, value}= event.target
        this.setState({
            [name]:value 
        })
    }

    handleClick(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImg:randMemeImg
        })
    }

    render(){
        return(
        <div>
            <form>
                <input 
                    type="text"
                    name="topText"
                    value={this.state.topText}
                    placeholder="Top Text" 
                    onChange={this.handleChange}
                    />
                <input 
                    type="text"
                    name="bottomText"
                    value={this.state.bottomText}
                    placeholder="Bottom Text" 
                    onChange={this.handleChange}
                    />
                <button onClick={this.handleClick}>Gen</button>
            </form>
            <div className="container">
                <img src={this.state.randomImg} alt="" />
                <h2 className="topText">{this.state.topText}</h2>
                <h2 className="bottomText">{this.state.bottomText}</h2>
            </div>
        </div>
      )
  }
}

export default MemeGenerator