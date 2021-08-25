import React, { Component } from 'react'
import './index.css'

const summary = "Frontend lead and backend co-lead of the user and role management service in IBM’s data and AI analytics platform. Seeking full-time, 100% remote, frontend or fullstack roles."

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
        'Created frontend code from scratch, with focus on a clean, clear, reusable codebase',
        'Architected technical solutions with product and backend lead, considering security, performance, sizing, business value, and usability',
        'Strong communication skills: user testing, customer support, cross-team coordination, internal team coordination, influencing product discussions',
        'Co-created conceptual models and user flows with design, providing guidance on attributes and relationships between users, roles, permissions, and groups',
        'Prioritized tasks in 6 month and 1 month cycles with larger product team, and uses Agile methodology to coordinate and execute tasks within the team in two-week sprints',
        'Mentored and led product innovations teams, leading to 3 publications',
    ]
}, {
    title: 'Software Developer I',
    date: 'June 2018-March 2019',
    location: 'IBM - Austin, Texas',
    listItems: [
        'Junior developer on AppID, which helps developers easily add security to their apps',
        'Prototyped a fullstack application in React, Node, and Python showcasing all uses of AppID, and was leveraged for sales pitches and demos',
        'Adapted to multiple technologies to quickly debug issues: OAuth, OpenID, Node, Angular, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, Zenhub'
    ]
}, {
    title: 'Web Developer	',
    date: 'April 2018-Present',
    location: 'Negotiation and Team Resources Institute	- Berkeley, CA',
    listItems: [
        'Sole developer on a web app for collecting, grading, and anonymizing peer feedback, which has been used by 600 students, across 7 schools, generating 6K evaluations',
        'Collaborated with UC Berkeley professor to define product requirements and designs',
        'Addressed client and user issues through discussion, collaboration, then implementation',
        'Created data visualizations to show grades against class benchmarks'
    ]
}]

const education = [{
    title: 'V School',
    date: 'April 2018',
    subject: 'Full Stack JavaScript Web Development (MERN Stack)',
}, {
    title: 'UC Berkeley College of Engineering',
    date: 'December 2017',
    subject: 'B.S. Bioengineering, Computer Science emphasis',
}]

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
                    <div className="summary">
                        <h2>Summary</h2>
                        <div>
                            <h4>{summary}</h4>
                        </div>
                    </div>
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
