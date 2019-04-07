import React, { Component } from 'react'
import './index.css'

class Resume extends Component {
    constructor() {
        super()
        this.state = {
            resume: "skills"
        }
        this.myRef = React.createRef();
    }

    handleResume = (resume) => {
        this.setState({resume})
    }

    render() {
        const skills = [
            {
                title: 'Front-end',
                listItems: [
                    'JavaScript',
                    'React',
                    'HTML/CSS',
                    'jQuery'
                ]
            },
            {
                title: 'Back-end',
                listItems: [
                    'Ruby on Rails',
                    'NodeJS',
                    'Express',
                    'Mongoose',
                    'MongoDB'
                ]
            },
            {
                title: 'Other',
                listItems: [
                    'Python',
                    'Java',
                    'C',
                    'Linux',
                    'Git'
                ]
            },
            {
                title: 'Familiarity',
                listItems: [
                    'Android',
                    'Swift',
                    'Angular',
                    'SQL',
                    'Jenkins'
                ]
            }
        ]

        const work = [
            {
                title: 'Software Developer',
                date: 'June 2018-Present',
                location: 'IBM - Austin, Texas',
                listItems: [
                    'Works with AppID, a cloud security application featuring frontend, backend, and security technologies',
                    'Design, program, review, and test code in an Agile environment',
                    'Technologies used include Node.js, Angular.js, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, and Zenhub'
                ]
            },
            {
                title: 'Full-time Volunteer Public Representative, Trainer, and Manager',
                date: 'April 2013—March 2015',
                location: 'The Church of Jesus Christ of Latter Day Saints – Rio Grande do Sul, Brazil',
                listItems: [
                    'Presented messages to groups anywhere from 1-100 individuals',
                    'Improved performance by 150% by leading 20 fellow volunteers through coaching, interviews, as well as weekly trainings and discussions',
                    'Achieved fluency in Portuguese in writing, reading, and speaking'
                ]
            }
        ]

        const education = [
            {
                title: 'V School',
                date: 'April 2018',
                subject: 'Full Stack JavaScript Web Development (MERN Stack)',
            },
            {
                title: 'University of California, Berkeley—College of Engineering',
                date: 'December 2017',
                subject: 'B.S. Bioengineering with Computer Science Emphasis',
            }
        ]

        return (
            <div className="resume" id="resume" ref={this.props.refs.resume}>
                <div className="banner"></div>
                <div className="overlay"></div>
                <div className="flex">
                    <div className="leftContainer">
                        <h1>Resume</h1>
                        <div className="tabs">
                            <button onClick={() => this.handleResume("skills")}
                                    style={{color: this.state.resume === "skills" ? "rgb(0, 186, 255)" : "rgb(255, 255, 255)"}}>
                                <i  className="fa fa-circle"
                                    style={{fontSize: "22px", fontWeight: 100, color: this.state.resume === "skills" ? "rgb(0, 186, 255)" : "rgb(255, 255, 255)"}}></i>
                                <div className="mobile" style={{borderBottom: this.state.resume === "skills" ? "2px solid rgb(0, 186, 255)" : "2px solid rgb(255, 255, 255)"}}>
                                    Skills
                                </div>
                                <div className="default">
                                    Skills
                                </div>
                            </button>
                            <button onClick={() => this.handleResume("work")}
                                    style={{color: this.state.resume === "work" ? "rgb(0, 186, 255)" : "rgb(255, 255, 255)"}}>
                                <i  className="fa fa-circle"
                                    style={{fontSize: "22px", fontWeight: 100, color: this.state.resume === "work" ? "rgb(0, 186, 255)" : "rgb(255, 255, 255)"}}></i>
                                <div className="mobile" style={{borderBottom: this.state.resume === "work" ? "2px solid rgb(0, 186, 255)" : "2px solid rgb(255, 255, 255)"}}>
                                    Work
                                </div>
                                <div className="default">
                                    Work
                                </div>
                            </button>
                            <button onClick={() => this.handleResume("education")}
                                    style={{color: this.state.resume === "education" ? "rgb(0, 186, 255)" : "rgb(255, 255, 255)"}}>
                                <i  className="fa fa-circle"
                                    style={{fontSize: "22px", fontWeight: 100, color: this.state.resume === "education" ? "rgb(0, 186, 255)" : "rgb(255, 255, 255)"}}></i>
                                <div className="mobile" style={{borderBottom: this.state.resume === "education" ? "2px solid rgb(0, 186, 255)" : "2px solid rgb(255, 255, 255)"}}>
                                    Education
                                </div>
                                <div className="default">
                                    Education
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="container">
                            {
                                this.state.resume === "skills" &&
                                    <div className="skills">
                                        <div className="skillsGrid">
                                            {
                                                skills.map((skill, index) => {
                                                    return (
                                                        <div key={skill.title}>
                                                            <h3>{skill.title}</h3>
                                                            <ul>
                                                                {skill.listItems.map((item, index) => <li key={item}>{item}</li>)}
                                                            </ul>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                            }
                            {
                                this.state.resume === "work" &&
                                    <div className="work">
                                        {
                                            work.map((work, index) => {
                                                return (
                                                    <div key={work.title}>
                                                        <h3>{work.title}</h3>
                                                        <h4>{work.location}</h4>
                                                        <ul>
                                                            {work.listItems.map((item, index) => <li key={item}>{item}</li>)}
                                                        </ul>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                            {
                                this.state.resume === "education" &&
                                    <div className="education">
                                        {
                                            education.map((education, index) => {
                                                return (
                                                    <div key={education.title}>
                                                        <h3>{education.title}</h3>
                                                        <h4>{education.subject}</h4>
                                                        <h5>{education.date}</h5>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Resume;
