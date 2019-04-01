import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Resume extends Component {
    constructor() {
        super()
        this.state = {
            resume: "skills"
        }
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
            <div className="resume" id="resume">
                <div className="banner"></div>
                <div className="overlay"></div>
                <div className="flex">

                    <div className="info">
                        <h1>Resume</h1>
                        <div className="tabs">
                            <button onClick={() => this.handleResume("skills")}>Skills</button>
                            <button onClick={() => this.handleResume("work")}>Work</button>
                            <button onClick={() => this.handleResume("education")}>Education</button>
                        </div>
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
                        <div className="dots">
                            <i className="fa fa-circle" onClick={() => this.handleResume("skills")} style={{fontSize: "10px", fontWeight: 100, color: this.state.resume === "skills" ? "rgb(249, 107, 99)" : "rgb(65, 53, 45)"}}></i>
                            <i className="fa fa-circle" onClick={() => this.handleResume("work")} style={{fontSize: "10px", fontWeight: 100, color: this.state.resume === "work" ? "rgb(249, 107, 99)" : "rgb(65, 53, 45)"}}></i>
                            <i className="fa fa-circle" onClick={() => this.handleResume("education")} style={{fontSize: "10px", fontWeight: 100, color: this.state.resume === "education" ? "rgb(249, 107, 99)" : "rgb(65, 53, 45)"}}></i>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Resume;
