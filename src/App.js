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

class App extends Component {
    constructor() {
        super();
        this.state = {
            imgCount: 0,
            imgLoadCount: 4,
            firstLoaded: false,
            domLoaded: false,
            imageLoaded: false,
            loaded: false,
            animation: {},
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
            images: [HomeImage, WhyMeImage, ResumeImage, ProjectsImage]
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

    onImageLoad = () => {
        this.setState(prevState => {
            const imgCount = prevState.imgCount + 1
            if (imgCount === this.state.imgLoadCount) {
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
        setTimeout(() => {
            let op = 1;  // initial opacity
            const timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    self.setState({loaded: true, loadingDisplay: 'none', pagesDisplay: 'block', appStyle: {}})
                } else {
                    self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                    op -= op * 0.1;
                }
            }, 5);
        }, 300)
        setTimeout(() => {
            let op = 0.1;  // initial opacity
            const timer = setInterval(function () {
                if (op >= 1){
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
        }

        if (!this.state.loaded && this.state.domLoaded && this.state.imageLoaded) {
            this.handleLoad()
        }

        return (
            <div style={this.state.appStyle}>
                {this.state.images.map(this.mapImage)}
                <div className="loadingContainer" style={{...this.state.animation, display: this.state.loadingDisplay}}>
                    <div>
                        <div className="loading"></div>
                        <h1>Loading...</h1>
                    </div>
                </div>
                <div style={{display: this.state.pagesDisplay, ...this.state.pageAnimation}}>
                    <Navbar refs={this.state.refs}/>
                    <Home refs={this.state.refs}/>
                    <WhyMe refs={this.state.refs}/>
                    <Resume refs={this.state.refs}/>
                    <Projects refs={this.state.refs}/>
                    <Contact refs={this.state.refs}/>
                </div>
            </div>
        )
    }
}

export default App;
