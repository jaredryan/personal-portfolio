import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Resume = () => {
    return (
        <div className="webResumePage">
            <div className="webBanner">
                <h1>Resume</h1>
                <a href="Ryan_Jared_Resume.pdf" download="Ryan_Jared_Resume.pdf" className="goToProjects downloadButton"><button>Download</button></a>
                <div className="webPageImg"></div>
            </div>
            <div className="objective">
                <h2>Objective</h2>
                <p>IBM developer looking to develop programming, design, management, and business skills.</p>
            </div>
            <div className="workExperience">
                <h2>Work Experience</h2>
                <div className="work1">
                    <h3>Software Developer: June 2018-Present</h3>
                    <h4>IBM - Austin, Texas</h4>
                    <ul>
                        <li>Works with AppID, a cloud security application featuring frontend, backend, and security technologies</li>
                        <li>Design, program, review, and test code in an Agile environment</li>
                        <li>Technologies used include Node.js, Angular.js, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, and Zenhub</li>
                    </ul>
                </div>
                <div className="work2">
                    <h3>Full-time Volunteer Public Representative, Trainer, and Manager: April 2013—March 2015</h3>
                    <h4>The Church of Jesus Christ of Latter Day Saints – Rio Grande do Sul, Brazil</h4>
                    <ul>
                        <li>Presented messages to groups anywhere from 1-100 individuals</li>
                        <li>Improved performance by 150% by leading 20 fellow volunteers through coaching, interviews, as well as weekly trainings and discussions</li>
                        <li>Achieved fluency in Portuguese in writing, reading, and speaking</li>
                    </ul>
                </div>
            </div>
            <div className="skills">
                <h2>Skills</h2>
                <div className="skillsGrid">
                    <div>
                        <h3>Front-end</h3>
                        <ul>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>HTML/CSS</li>
                            <li>jQuery</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Back-end</h3>
                        <ul>
                            <li>Ruby on Rails</li>
                            <li>NodeJS</li>
                            <li>Express</li>
                            <li>Mongoose</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Other</h3>
                        <ul>
                            <li>Python</li>
                            <li>Java</li>
                            <li>C</li>
                            <li>Linux</li>
                            <li>Git</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Familiarity</h3>
                        <ul>
                            <li>Android</li>
                            <li>Swift</li>
                            <li>Angular</li>
                            <li>SQL</li>
                            <li>Jenkins</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="projects">
                <Link to="/projects" className="goToProjects"><button>Projects</button></Link>
            </div>

            <div className="education">
                <h2>Education</h2>
                <div className="edu1">
                    <h3>V School</h3>
                    <h4>Full Stack JavaScript Web Development (MERN Stack)</h4>
                    <h5>April 2018</h5>
                </div>
                <div className="edu2">
                    <h3>University of California, Berkeley—College of Engineering</h3>
                    <h4>B.S. Bioengineering with Computer Science Emphasis</h4>
                    <h5>December 2017</h5>
                </div>
            </div>

            <div className="coursework">
                <h2>Relevant University Coursework</h2>
                <ul>
                    <li>Software Engineering</li>
                    <li>Introduction to Artificial Intelligence</li>
                    <li>Data Structures</li>
                    <li>Structure and Interpretation of Computer Programs</li>
                    <li>Machine Structures</li>
                    <li>Engineering Design Process and Project</li>
                </ul>
            </div>
        </div>
    );
}

export default Resume;
