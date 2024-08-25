import React, { useState } from 'react'
import './index.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const work = [{
    tab: 'MANTL',
    title: 'Software Developer II',
    company: 'MANTL',
    date: '2021 - 2023',
    location: 'Remote - Jupiter, FL',
    listItems: [
        'Mentored a few engineers on frontend work and owned crucial frontend features, gaining a reputation for good PR reviews, careful testing, troubleshooting, good design and flows',
        'Co-led work on introducing a design-component library that integrates with the prior one',
	    'Co-led work on an automated testing pipeline: the pipeline itself, testing framework, database seeding / cleanup, tests, and teaching others how to contribute',
        'Proactively worked with cross-team stakeholders to identify, prioritize, and complete work to reduce number of days on our “activation” flow (time from request to completion)',
    ]
}, {
    tab: 'IBM - CA',
    title: 'Software Developer II',
    company: 'IBM',
    date: '2019 - 2021',
    location: 'San Jose, CA',
    listItems: [
        'Refactored entire frontend for user management, which evolved to a small leadership role as work expanded and required additional engineers',
	    'Architected user management technical solutions with product and backend lead, considering security, performance, sizing, business value, and usability',
	    'Co-created conceptual models and user flows with design, providing guidance on attributes and relationships between users, roles, permissions, and groups',
        'Planned projects with 1-, 3-, and 6-month cycles, executed via Agile in 2-week sprints',
    ],
}, {
    tab: 'IBM - TX',
    title: 'Software Developer I',
    company: 'IBM',
    date: '2018 - 2019',
    location: 'Austin, Texas',
    listItems: [
        'Prototyped a fullstack application in React, Node, and Python showcasing all uses of AppID, which was leveraged for sales pitches and demos',
	    'Adapted to multiple technologies and protocols to quickly debug issues: OAuth, OpenID, Node, Angular, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, Zenhub',
    ]
}, {
    tab: 'NTR',
    title: 'Web Developer',
    company: 'NTR',
    date: '2018 - 2022',
    location: 'Remote - Berkeley, CA',
    listItems: [
        'Sole developer on a web app for collecting, grading, and anonymizing peer feedback, which has been used by 600 students, across 7 schools, generating 6K evaluations',
      	'Collaborated with non-technical UC Berkeley professor to define product requirements and designs, then again for updates and new features over the 4 years before handoff', 
  	    'Learned troubleshooting without access to clients, and maintenance practices',
    ]
}]

const education = [{
    tab: 'V School',
    title: 'V School',
    date: '2018',
    subject: 'Fullstack JavaScript Web Development (MERN Stack)',
}, {
    tab: 'UC Berkeley',
    title: 'UC Berkeley College of Engineering',
    date: '2017',
    subject: 'B.S. Bioengineering, Computer Science Emphasis',
}]

const experience = [...work, ...education]

const mapEducation = (education, value, index) => 
    <div
        key={education.title}
        role="tabpanel"
        hidden={value !== index}
        className="school"
    >
        {value === index &&
            <div className="experienceContainer">
                <h3>{education.title}</h3>
                <h4>{education.subject}<span>|</span>{education.date}</h4>
            </div>
        }
    </div>

const mapWork = (work, value, index) =>
    <div 
        key={work.title + work.company}
        role="tabpanel"
        hidden={value !== index}
        className="position"
    >
        {value === index && 
            <div className="experienceContainer">
                <h3>{work.title}</h3>
                <h4>{work.company}<span>|</span>{work.location}<span>|</span>{work.date}</h4>
                <ul>
                    {work.listItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
            </div>
        }
    </div>

const mapExperience = value => (experience, index) => experience?.company
    ? mapWork(experience, value, index)
    : mapEducation(experience, value, index)


const Experience = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue)

    return (
        <div className="experience" id="experience" ref={props.refs.experience}>
            <div className="background" />
            <div className="container">
                <h1>Timeline</h1>
                <div className="experienceItems">
                    <div className="tabContainer">
                        <Tabs value={value} onChange={handleChange} orientation="vertical" className="tabs">
                            {experience.map((position, index) => <Tab label={position.tab} value={index} />)}
                        </Tabs>
                    </div>
                    {experience.map(mapExperience(value))}
                </div>
            </div>
            <div className="bottomSection" />
        </div>
    )
}

export default Experience
