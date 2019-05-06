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
            loading: true
        }
        this.refs = {
            navbar: React.createRef(),
            home: React.createRef(),
            whyMe: React.createRef(),
            resume: React.createRef(),
            projects: React.createRef(),
            contact: React.createRef()
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }



    render() {
        if (this.state.loading) {
            return (
                <div className="loadingContainer">
                    <div>
                        <div className="loading"></div>
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar refs={this.refs}/>
                    <Home refs={this.refs}/>
                    <WhyMe refs={this.refs}/>
                    <Resume refs={this.refs}/>
                    <Projects refs={this.refs}/>
                    <Contact refs={this.refs}/>
                </div>
            )
        }
    }
}

export default App;
