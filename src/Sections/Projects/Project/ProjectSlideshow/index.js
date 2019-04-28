import React, { Component } from 'react'
// import './index.css'
import ProjectImage from './ProjectImage'

class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageIndex: 0,
            animation: {}
        }
    }

    componentDidMount() {
        const rotateTimer = setInterval(() => {
            if (this.state.imageIndex + 1 >= this.props.project.pictures.length) {
                this.handleFade()
                setTimeout(() => {
                    this.setState({imageIndex: 0})
                }, 250)
                setTimeout(() => {
                    this.handleAppear()
                }, 700)
            } else {
                this.handleFade()
                setTimeout(() => {
                    this.setState(prevState => ({imageIndex: prevState.imageIndex + 1}))
                }, 250)
                setTimeout(() => {
                    this.handleAppear()
                }, 700)
            }
        }, 3000);
        this.setState({rotateTimer})
    }

    handleFade = () => {
        const self = this;
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                self.setState({animation: {opacity: 0, filter: `alpha(opacity=0)`}})
            } else {
                self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                op -= op * 0.1;
            }
        }, 10);
    }

    handleAppear = () => {
        const self = this;
        var op = 0.1;  // initial opacity
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            } else {
                self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                op += op * 0.1;
            }
        }, 10);
    }

    handleIndexSet = (imageIndex) => {
        clearInterval(this.state.rotateTimer)
        this.handleFade()
        setTimeout(() => {
            this.setState({imageIndex})
        }, 250)
        setTimeout(() => {
            this.handleAppear()
        }, 700)
    }

    render() {
        return (
            <div>
                  <div className="projectImages">
                      <ProjectImage
                          style={this.state.animation}
                          id={this.props.project.pictures[this.state.imageIndex].id}
                          caption={this.props.project.pictures[this.state.imageIndex].caption}
                      />
                  </div>
                  <div className="dots">
                      {
                          this.props.project.pictures.map((pic, index) => {
                              return <i className="fa fa-circle" onClick={() => this.handleIndexSet(index)} style={{fontSize: "18px", fontWeight: 100, color: this.state.imageIndex === index ? "rgb(0, 137, 203)" : "rgb(40, 40, 40)"}}></i>
                          })
                      }
                  </div>
            </div>
        )
    }
}

export default Projects;
