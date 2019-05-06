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
            self.setState({loading: false})
            var op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    self.setState({loadingDisplay: 'none', pagesDisplay: 'block', appStyle: {}})
                } else {
                    self.setState({animation: {opacity: `${op}`, filter: `alpha(opacity=${op * 100})`}})
                    op -= op * 0.1;
                }
            }, 5);
        }, 10000)
    }

    render() {
        if (this.state.loading) {
            setTimeout(() => this.setState({loadingDisplay: "flex"}), 200);
        }

        return (
            <div style={this.state.appStyle}>
                <div className="loadingContainer" style={{display: this.state.loadingDisplay, ...this.state.animation}}>
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
