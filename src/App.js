import React, { Component } from 'react'

import Navbar from './Components/Navbar'
import Home from './Sections/Home'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'
import Contact from './Sections/Contact'

import HomeImage from './Images/home.jpg'
import WhyMeImage from './Images/whyMe.jpg'
import ResumeImage from './Images/resume.jpg'
import ProjectsImage from './Images/projects.jpg'
import WhyMeBerkeleyImage from './Images/whyMeBerkeley.jpg'
import WhyMeBrazilImage from './Images/whyMeBrazil.jpg'
import WhyMeFreelanceImage from './Images/whyMeFreelance.jpg'
import WhyMeIBMImage from './Images/whyMeIBM.jpg'

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
            appStyle: {height: '100vh', width: '100%', position: 'relative', backgroundColor: 'rgb(33, 1, 32)'},
            refs: {
                navbar: React.createRef(),
                home: React.createRef(),
                whyMe: React.createRef(),
                resume: React.createRef(),
                projects: React.createRef(),
                contact: React.createRef()
            },
            images: [
                HomeImage,
                WhyMeImage,
                ResumeImage,
                ProjectsImage,
                WhyMeBerkeleyImage,
                WhyMeBrazilImage,
                WhyMeFreelanceImage,
                WhyMeIBMImage
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

    onNavbarScroll = (goal) => {
      this.handleFade('black')
      setTimeout(() => {
          window.scrollTo(0, goal)
      }, 250)
      setTimeout(() => {
          this.handleAppear('black')
      }, 700)
    }

    onProjectScroll = (goal) => {
      this.handleFade('white')
      setTimeout(() => {
          window.scrollTo(0, goal)
      }, 250)
      setTimeout(() => {
          this.handleAppear('white')
      }, 700)
    }

    handleAppear = (color) => {
        const backgroundColor = color === 'black' ? 'rgb(33, 1, 32)' : 'rgb(214, 226, 234)'
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

    handleFade = (color) => {
        const self = this;
        const backgroundColor = color === 'black' ? 'rgb(33, 1, 32)' : 'rgb(214, 226, 234)'
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
                    self.setState({loaded: true, loadingDisplay: 'none', pagesDisplay: 'block', appStyle: {backgroundColor: 'rgb(33, 1, 32)'}})
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
            <div style={this.state.appStyle}>
                {this.state.images.map(this.mapImage)}
                <div className="scrollContainer" style={this.state.scrollContainer}></div>
                <div className="loadingContainer" style={{...this.state.animation, display: this.state.loadingDisplay}}>
                    <div>
                        <div className="loading"></div>
                        <h1>{this.state.loadingMessage}</h1>
                    </div>
                </div>
                <div style={{display: this.state.pagesDisplay, ...this.state.pageAnimation}}>
                    <Navbar refs={this.state.refs} onScroll={this.onNavbarScroll}/>
                    <Home refs={this.state.refs}/>
                    <WhyMe refs={this.state.refs}/>
                    <Resume refs={this.state.refs}/>
                    <Projects refs={this.state.refs} onScroll={this.onProjectScroll}/>
                    <Contact refs={this.state.refs}/>
                </div>
            </div>
        )
    }
}

export default App;
