import React, { Component } from 'react'

import Navbar from './Navbar'

import Profile from './Sections/Profile'
import AboutMe from './Sections/AboutMe'
import Skills from './Sections/Skills'
import Experience from './Sections/Experience'
import Education from './Sections/Education'
import Projects from './Sections/Projects'

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
                navbar: React.createRef(),
                profile: React.createRef(),
                aboutMe: React.createRef(),
                skills: React.createRef(),
                experience: React.createRef(),
                education: React.createRef(),
                projects: React.createRef(),
            },
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

    onScroll = (goal, action) => {
      this.handleFade(action)
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

    handleFade = (action) => {
        const backgroundColor = 'white'
        const self = this;
        var op = 0.1;  // initial opacity
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
                if (action) action()
            } else {
                self.setState({scrollContainer: {display: 'block', opacity: `${op}`, backgroundColor, filter: `alpha(opacity=${op * 100})`}})
                op += op * 0.1;
            }
        }, 10);
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

        if (!this.state.startedFinalLoad && this.state.domLoaded) {
            this.handleLoad()
        }

        return (
            <div>
                <div className="scrollContainer" style={this.state.scrollContainer}></div>
                <div className="loadingContainer" style={{...this.state.animation, display: this.state.loadingDisplay}}>
                    <div>
                        <div className="loading"></div>
                        <h1>{this.state.loadingMessage}</h1>
                    </div>
                </div>
                <div className="contentContainer" style={{display: this.state.pagesDisplay, ...this.state.pageAnimation}}>
                    <Navbar refs={this.state.refs} onScroll={this.onScroll} />
                    <Profile refs={this.state.refs} />
                    <AboutMe refs={this.state.refs} />
                    <Skills refs={this.state.refs} />
                    <Experience refs={this.state.refs} onScroll={this.onScroll} />
                    <Education refs={this.state.refs} onScroll={this.onScroll} />
                    <Projects refs={this.state.refs} onScroll={this.onScroll} />
                </div>
            </div>
        )
    }
}

export default App;
