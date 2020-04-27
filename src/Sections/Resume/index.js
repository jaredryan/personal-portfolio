import React, { Component } from 'react'
import './index.css'

class Resume extends Component {
    constructor() {
        super()
        this.state = {
            resume: "skills",
            animation: {},
            clicked: false,
            rotateTimer: false
        }
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.startRotation);
    // }
    //
    // startRotation = () => {
    //     const halfPageLength = (this.props.refs.projects.current.offsetTop - this.props.refs.resume.current.offsetTop) / 2
    //     if (!this.state.rotateTimer && window.pageYOffset >= this.props.refs.resume.current.offsetTop - halfPageLength && window.pageYOffset <= this.props.refs.projects.current.offsetTop - halfPageLength && !this.state.clicked) {
    //         const rotateTimer = setInterval(() => {
    //             if (this.state.resume === "skills") {
    //                 this.handleFade()
    //                 setTimeout(() => {
    //                     this.setState({resume: "work"})
    //                     this.handleAppear()
    //                 }, 500)
    //             } else if (this.state.resume === "work") {
    //                 this.handleFade()
    //                 setTimeout(() => {
    //                     this.setState({resume: "education"})
    //                     this.handleAppear()
    //                 }, 500)
    //             } else {
    //                 this.handleFade()
    //                 setTimeout(() => {
    //                     this.setState({resume: "skills"})
    //                     this.handleAppear()
    //                 }, 500)
    //             }
    //         }, 3000);
    //         this.setState({rotateTimer})
    //     } else if (this.state.rotateTimer !== false && (window.pageYOffset < this.props.refs.resume.current.offsetTop - halfPageLength || window.pageYOffset > this.props.refs.projects.current.offsetTop - halfPageLength)) {
    //         clearInterval(this.state.rotateTimer)
    //         this.setState({rotateTimer: false})
    //     }
    // }

    handleResume = (resume) => {
        if (this.state.rotateTimer !== false) {
            this.setState({clicked: true, rotateTimer: false})
            clearInterval(this.state.rotateTimer)
        }
        this.handleFade()
        setTimeout(() => {
            this.setState({resume})
            this.handleAppear()
        }, 500)
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

    mapSkills = (skill) => {
        return (
            <div key={skill.title} className="skillContainer">
                <div>
                    <h3>{skill.title}</h3>
                    <ul>
                        {skill.listItems.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        )
    }

    mapWork = (work) => {
        return (
            <div key={work.title}>
                <h3>{work.title}</h3>
                <h4>{work.location}<span>|</span>{work.date}</h4>
                <ul>
                    {work.listItems.map((item, index) => <li key={item}>{item}</li>)}
                </ul>
            </div>
        )
    }

    mapEducation = (education) => {
        return (
            <div key={education.title}>
                <h3>{education.title}</h3>
                <h4>{education.subject}</h4>
                <h5>{education.date}</h5>
            </div>
        )
    }

    render() {
        const skills = [{
            title: 'Frontend',
            listItems: [
                'JavaScript',
                'React',
                'HTML/CSS',
                'jQuery'
            ]
        }, {
            title: 'Backend',
            listItems: [
                'NodeJS',
                'Express',
                'Mongoose',
                'MongoDB',
                'Ruby on Rails',
            ]
        }, {
            title: 'Other',
            listItems: [
                'Python',
                'Java',
                'C',
                'Linux',
                'Git'
            ]
        }, {
            title: 'Familiarity',
            listItems: [
                'Android',
                'Swift',
                'Angular',
                'SQL',
                'Jenkins'
            ]
        }]

        const work = [{
            title: 'Software Developer II',
            date: 'April 2019-Present',
            location: 'IBM - San Jose, CA',
            listItems: [
                'Works with Cloud Pak for Data, a cloud platform for analyzing data using AI',
                'Owns the user management frontend, working primarily in React.js and Node.js',
                'Collaborates with the backend team on resolving issues, and implemented the user management auditing functionality',
                'Collaborates with the design team, giving feedback to find the best solution, and created the new user groups with two designers'
            ]
        }, {
            title: 'Software Developer I',
            date: 'June 2018-March 2019',
            location: 'IBM - Austin, Texas',
            listItems: [
                'Worked with AppID, a cloud security application featuring frontend, backend, and security technologies',
                'Designed, programmed, reviewed, and tested code in an Agile environment',
                'Technologies used include Node.js, Angular.js, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, and Zenhub'
            ]
        }]

        const education = [{
            title: 'V School',
            date: 'April 2018',
            subject: 'Full Stack JavaScript Web Development (MERN Stack)',
        }, {
            title: 'University of California, Berkeley—College of Engineering',
            date: 'December 2017',
            subject: 'B.S. Bioengineering with Computer Science Emphasis',
        }]

        return (
            <div className="resume" id="resume" ref={this.props.refs.resume}>
                <div className="banner"></div>
                <div className="overlay"></div>
                <div className="title">
                    <div>
                        <h1>Resume</h1>
                        <a href="Ryan_Jared_Resume.pdf" download="Ryan_Jared_Resume.pdf" className="downloadButton mobile">Download</a>
                    </div>
                </div>
                <div className="container">
                    <div className="skills">
                        <h2>Skills</h2>
                        <div className="skillsGrid">
                            {skills.map(this.mapSkills)}
                        </div>
                    </div>
                    <div className="work" style={this.state.animation}>
                        <h2>Work</h2>
                        <div className="workItems">
                          {work.map(this.mapWork)}
                        </div>
                    </div>
                    <div className="education" style={this.state.animation}>
                        <h2>Education</h2>
                        <div className="educationItems">
                          {education.map(this.mapEducation)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Resume;
