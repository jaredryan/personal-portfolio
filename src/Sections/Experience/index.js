import React, { useState } from 'react'
import './index.css'

const work = [{
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
    title: 'Software Developer II',
    company: 'IBM',
    date: '2019 - 2021',
    location: 'San Jose, CA',
    listItems: [
        'Refactored entire frontend for user management, which evolved to a small leadership role as work expanded and required additional engineers',
	    'Architected user management technical solutions with product and backend lead, considering security, performance, sizing, business value, and usability',
	    'Co-created conceptual models and user flows with design, providing guidance on attributes and relationships between users, roles, permissions, and groups',
        'Planned projects with 1, 3, and 6 month cycles, executed via Agile in 2-week sprints',
    ],
}, {
    title: 'Software Developer I',
    company: 'IBM',
    date: '2018 - 2019',
    location: 'Austin, Texas',
    listItems: [
        'Prototyped a fullstack application in React, Node, and Python showcasing all uses of AppID, which was leveraged for sales pitches and demos',
	    'Adapted to multiple technologies and protocols to quickly debug issues: OAuth, OpenID, Node, Angular, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, Zenhub',
    ]
}, {
    title: 'Web Developer',
    company: 'Negotiation and Team Resources Institute',
    date: '2018 - 2022',
    location: 'Remote - Berkeley, CA',
    listItems: [
        'Sole developer on a web app for collecting, grading, and anonymizing peer feedback, which has been used by 600 students, across 7 schools, generating 6K evaluations',
      	'Collaborated with non-technical UC Berkeley professor to define product requirements and designs, then again for updates and new features over the 4 years before handoff', 
  	    'Learned troubleshooting without access to clients, and maintenance practices',
    ]
}]

const lastDefaultItemIndex = 1

const education = [{
    title: 'V School',
    date: '2018',
    subject: 'Full Stack JavaScript Web Development (MERN Stack)',
}, {
    title: 'UC Berkeley College of Engineering',
    date: '2017',
    subject: 'B.S. Bioengineering, Computer Science emphasis',
}]

const mapWork = (work) => 
    <div key={work.title}>
        <h3>{work.title}</h3>
        <h4>{work.company}<span>|</span>{work.location}<span>|</span>{work.date}</h4>
        <ul>
            {work.listItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </div>

const mapEducation = (education) => 
    <div key={education.title}>
        <h3>{education.title}</h3>
        <h4>{education.subject}<span>|</span>{education.date}</h4>
    </div>

const Experience = (props) => {
    const [seeMore, setSeeMore] = useState(false)

    const handleSeeMoreClick = () => {
        if (seeMore) {
            const target = props.refs.projects.current.offsetTop
            props.onScroll(target - 1500, () => setSeeMore(!seeMore))  
        } else {
            setSeeMore(!seeMore)
        }
    }

    return (
        <div className="experience" id="experience" ref={props.refs.experience}>
            <div className="banner"></div>
            <div className="overlay"></div>
            <div className="container">
                <h1>Experience</h1>
                <div className="experienceItems">
                    {!seeMore && work.slice(0, lastDefaultItemIndex + 1).map(mapWork)}
                    {seeMore && work.map(mapWork)}
                    {seeMore && education.map(mapEducation)}
                </div>
                <h5 className="experienceToggle" onClick={handleSeeMoreClick}>
                    {seeMore ? 'See less' : 'See more'}
                    {seeMore && <i className="fa fa-angle-up" style={{fontWeight: 100}} />}
                    {!seeMore && <i className="fa fa-angle-down" />}
                </h5>
            </div>
        </div>
    )
}

export default Experience;
