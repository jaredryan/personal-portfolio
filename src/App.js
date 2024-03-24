import React, { Component } from 'react'

import Home from './Sections/Home'
import Skills from './Sections/Skills'
import Experience from './Sections/Experience'
import Projects from './Sections/Projects'

import ResumeImage from './Images/resume.jpg'

class App extends Component {
    constructor() {
        super();
        this.state = {
            imgCount: 0,
            loadingMessage: "Loading...",
            firstLoaded: false,
            domLoaded: false,
            imageLoaded: false,
            startedFinalLoad: false,
            animation: {},
            scrollContainer: {display: 'none'},
            pageAnimation: {opacity: 0, filter: `alpha(opacity=0)`},
            loadingDisplay: 'none',
            pagesDisplay: 'none',
            refs: {
                projects: React.createRef(),
            },
            images: [
                ResumeImage,
            ]
        }
    }

    loadingCompleted = () => {
        this.setState({domLoaded: true});
    }

    componentDidMount() {
        window.addEventListener('load', this.loadingCompleted);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.loadingCompleted)
    }

    onProjectScroll = (goal) => {
      this.handleFade()
      setTimeout(() => {
          window.scrollTo(0, goal)
      }, 250)
      setTimeout(() => {
          this.handleAppear()
      }, 700)
    }

    handleAppear = () => {
        const backgroundColor = 'white'
        const self = this;
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                self.setState({scrollContainer: {display: 'none', backgroundColor, opacity: 0, filter: `alpha(opacity=0)`}})
            } else {
                self.setState({scrollContainer: {display: 'block', backgroundColor, opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                op -= op * 0.1;
            }
        }, 10);
    }

    handleFade = () => {
        const backgroundColor = 'white'
        const self = this;
        var op = 0.1;  // initial opacity
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            } else {
                self.setState({scrollContainer: {display: 'block', opacity: `${op}`, backgroundColor, filter: `alpha(opacity=${op * 100})`}})
                op += op * 0.1;
            }
        }, 10);
    }

    onImageLoad = () => {
        this.setState(prevState => {
            const imgCount = prevState.imgCount + 1
            if (imgCount === this.state.images.length) {
                this.setState({imageLoaded: true})
            }
            return {imgCount}
        })
    }

    mapImage = (image) => {
        return <img src={image} alt="fillerText" style={{display: 'none'}} onLoad={this.onImageLoad}/>
    }

    handleLoad = () => {
        const self = this;
        this.setState({startedFinalLoad: true})
        setTimeout(() => {
            let op = 1;  // initial opacity
            const timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    self.setState({loaded: true, loadingDisplay: 'none', pagesDisplay: 'flex'})
                } else {
                    self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                    op -= op * 0.1;
                }
            }, 5);
        }, 300)
        setTimeout(() => {
            let op = 0.1;  // initial opacity
            const timer = setInterval(function () {
                if (op >= 1) {
                    clearInterval(timer);
                } else {
                    self.setState({pageAnimation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                    op += op * 0.1;
                }
            }, 5);
        }, 500)
    }

    render() {
        if (this.state.firstLoaded === false) {
            setTimeout(() => this.setState({firstLoaded: true, loadingDisplay: "flex"}), 200);
            setTimeout(() => this.setState({loadingMessage: "Still loading..."}), 2000);
            setTimeout(() => this.setState({loadingMessage: "Getting tired..."}), 4000);
            setTimeout(() => this.setState({loadingMessage: "Daydreaming..."}), 6000);
            setTimeout(() => this.setState({loadingMessage: "Refocusing..."}), 8000);
            setTimeout(() => this.setState({loadingMessage: "Almost there..."}), 10000);
        }

        if (!this.state.startedFinalLoad && this.state.domLoaded && this.state.imageLoaded) {
            this.handleLoad()
        }

        return (
            <div>
                {this.state.images.map(this.mapImage)}
                <div className="scrollContainer" style={this.state.scrollContainer}></div>
                <div className="loadingContainer" style={{...this.state.animation, display: this.state.loadingDisplay}}>
                    <div>
                        <div className="loading"></div>
                        <h1>{this.state.loadingMessage}</h1>
                    </div>
                </div>
                <div className="contentContainer" style={{display: this.state.pagesDisplay, ...this.state.pageAnimation}}>
                    <Home />
                    <Skills />
                    <Experience />
                    <Projects refs={this.state.refs} onScroll={this.onProjectScroll}/>
                </div>
            </div>
        )
    }
}

export default App;
