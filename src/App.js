import React, { Component } from 'react'

import Navbar from './Components/Navbar'
import Home from './Sections/Home'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'
import Contact from './Sections/Contact'

class App extends Component {
    constructor() {
        super();
        this.state = {
            imgCount: 0,
            imgLoadCount: 0,
            loading: true,
            animation: {},
            loadingDisplay: 'none',
            pagesDisplay: 'none',
            appStyle: {height: '100vh', width: '100%', position: 'relative'},
            refs: {
                navbar: React.createRef(),
                home: React.createRef(),
                whyMe: React.createRef(),
                resume: React.createRef(),
                projects: React.createRef(),
                contact: React.createRef()
            }
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

    handleLoad = () => {
        const self = this;
        setTimeout(() => {
            let op = 1;  // initial opacity
            const timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    self.setState({loading: false, loadingDisplay: 'none', pagesDisplay: 'block', appStyle: {}})
                } else {
                    self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                    op -= op * 0.1;
                }
            }, 5);
        }, 1000)
    }

    render() {
        if (this.state.loading) {
            setTimeout(() => this.setState({loading: false, loadingDisplay: "flex"}), 200);
        }

        return (
            <div style={this.state.appStyle}>
                <div className="loadingContainer" style={{...this.state.animation, display: this.state.loadingDisplay}}>
                    <div>
                        <div className="loading"></div>
                        <h1>Loading...</h1>
                    </div>
                </div>
                <div style={{display: this.state.pagesDisplay}}>
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
