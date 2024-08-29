import React, { useState, createRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import './index.css'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'

import MantlIcon from '../../Images/mantlIcon.png'
import IBMIcon from '../../Images/ibmIcon.png'
import NTRIcon from '../../Images/ntrIcon.png'
import VSchoolIcon from '../../Images/vSchoolIcon.png'
import UCBerkeleyIcon from '../../Images/ucBerkeleyIcon.png'

const work = [{
    tab: 'MANTL',
    title: 'Software Developer II',
    company: 'MANTL',
    start: 2021,
    end: 2023,
    location: 'Remote — Jupiter, FL',
    listItems: [
        'Mentored a few engineers on frontend work and owned crucial frontend features, gaining a reputation for good PR reviews, careful testing, troubleshooting, good design and flows',
        'Co-led work on introducing a design-component library that integrates with the prior one',
	    'Co-led work on an automated testing pipeline: the pipeline itself, testing framework, database seeding / cleanup, tests, and teaching others how to contribute',
        'Proactively worked with cross-team stakeholders to identify, prioritize, and complete work to reduce number of days on our “activation” flow (time from request to completion)',
    ],
    icon: (handleChange, value) =>
        <img src={MantlIcon} alt={'MANTL'} className={`icon${value === 'MANTL' ? ' chosen' : ''}`} onClick={() => handleChange('MANTL')}/>,
}, {
    tab: 'NTR',
    title: 'Web Developer',
    company: 'NTR',
    start: 2018,
    end: 2022,
    location: 'Remote - Berkeley, CA',
    listItems: [
        'Sole developer on a web app for collecting, grading, and anonymizing peer feedback, which has been used by 600 students, across 7 schools, generating 6K evaluations',
      	'Collaborated with non-technical UC Berkeley professor to define product requirements and designs, then again for updates and new features over the 4 years before handoff', 
  	    'Learned troubleshooting without access to clients, and maintenance practices',
    ],
    icon: (handleChange, value) =>
        <img src={NTRIcon} alt={'NTR'} className={`icon${value === 'NTR' ? ' chosen' : ''}`} onClick={() => handleChange('NTR')} />,
}, {
    tab: 'IBM - CA',
    title: 'Software Developer II',
    company: 'IBM',
    start: 2019,
    end: 2021,
    location: 'San Jose, CA',
    listItems: [
        'Refactored entire frontend for user management, which evolved to a small leadership role as work expanded and required additional engineers',
	    'Architected user management technical solutions with product and backend lead, considering security, performance, sizing, business value, and usability',
	    'Co-created conceptual models and user flows with design, providing guidance on attributes and relationships between users, roles, permissions, and groups',
        'Planned projects with 1-, 3-, and 6-month cycles, executed via Agile in 2-week sprints',
    ],
    icon: (handleChange, value) => 
        <img src={IBMIcon} alt={'IBM'} className={`icon${value === 'IBM - CA' ? ' chosen' : ''}`} onClick={() => handleChange('IBM - CA')} />,
}, {
}, {
    tab: 'IBM - TX',
    title: 'Software Developer I',
    company: 'IBM',
    start: 2018,
    end: 2019,
    location: 'Austin, Texas',
    listItems: [
        'Prototyped a fullstack application in React, Node, and Python showcasing all uses of AppID, which was leveraged for sales pitches and demos',
	    'Adapted to multiple technologies and protocols to quickly debug issues: OAuth, OpenID, Node, Angular, Java, Android, Swift, Kubernetes, Docker, Jenkins, Github, Zenhub',
    ],
    icon: (handleChange, value) =>
        <img src={IBMIcon} alt={'IBM'} className={`icon${value === 'IBM - TX' ? ' chosen' : ''}`} onClick={() => handleChange('IBM - TX')} />,
}]

const education = [{
    tab: 'V School',
    title: 'V School',
    date: 2018,
    subject: 'Fullstack JavaScript Web Development (MERN Stack)',
    icon: (handleChange, value) => 
        <img src={VSchoolIcon} alt={'V School'} className={`icon${value === 'V School' ? ' chosen' : ''}`} onClick={() => handleChange('V School')} />,
}, {
    tab: 'UC Berkeley',
    title: 'UC Berkeley College of Engineering',
    date: 2017,
    subject: 'B.S. Bioengineering, Computer Science Emphasis',
    icon: (handleChange, value) =>
        <img src={UCBerkeleyIcon} alt={'UC Berkeley'} className={`icon${value === 'UC Berkeley' ? ' chosen' : ''}`} onClick={() => handleChange('UC Berkeley')} />,
}]

const experience = [...work, ...education]

const mapEducationEntry = (education, hidden, thisRef) => 
    <div
        className="school"
        ref={thisRef}
    >
        <div className="experienceContainer">
            <h3>{education.title}</h3>
            <h4>{education.subject}</h4>
        </div>
    </div>

const mapWorkEntry = (work, hidden, thisRef) =>
    <div 
        className="position"
        ref={thisRef}
    >
        <div className="experienceContainer">
            <h3>{work.title}</h3>
            <h4>{work.company}<span>|</span>{work.location}<span>|</span>{work.start}<span>—</span>{work.end}</h4>
            <ul>
                {work.listItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
        </div>
    </div>

const mapExperienceEntry = (value, loading, setLoading) => (experience, index) => {
    const thisRef = createRef(null)
    const hidden = value !== experience.tab
    
    return (
        <CSSTransition
            key={experience.title + index}
            nodeRef={thisRef}
            in={!hidden && !loading}
            timeout={500}
            mountOnEnter
            unmountOnExit
            classNames="fade-bounce-right"
            onExited={() => setLoading(false)}
        >
            {experience?.company
                ? mapWorkEntry(experience, hidden, thisRef)
                : mapEducationEntry(experience, hidden, thisRef)
            }
        </CSSTransition>
    )
}

const earliestYear = 2017
const latestYearOfUpdates = 2021
const timelineYears = Array.from(
     {length: latestYearOfUpdates + 1 - earliestYear }, 
    (v, k) => k + earliestYear
)

const verticalTimelineComponent = (year, content, last) => 
    <TimelineItem key={year}>
        <TimelineOppositeContent color="text.secondary">
            {year}{last && '+'}
        </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineDot />
        {!last && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
            {content}{}
        </TimelineContent>
    </TimelineItem>

const horizontalTimelineComponent = (year, content, last) => 
    <TimelineItem key={year}>
        <TimelineOppositeContent color="text.secondary">
            {year}{last && '+'}
        </TimelineOppositeContent>
        <div className="dotConnectorContainer">
            <TimelineSeparator>
            <TimelineDot />
            </TimelineSeparator>
            {!last && <div className="customerHorizontalConnector" />}
        </div>
        <TimelineContent>
            {content}
        </TimelineContent>
    </TimelineItem>

const timeline = (handleChange, value) => {
    const timelineEntries = timelineYears.map((year, index) => {
        const yearEducation = experience
            .filter(entry => entry?.date === year)
        
        const yearWork = experience
            .filter(entry => entry?.start === year)
        
        const content = [
            ...yearEducation,
            ...yearWork
        ]
            .map(entry => entry?.icon(handleChange, value))

        return { year, content }
    })

    return <>
        <Timeline className="vertical">
            {timelineEntries.map(({ year, content }, index) => verticalTimelineComponent(year, content, index === (timelineEntries.length - 1)))}
        </Timeline>
        <Timeline className="horizontal">
            {timelineEntries.map(({ year, content }, index) => horizontalTimelineComponent(year, content, index === (timelineEntries.length - 1)))}
        </Timeline>
    </>

}


const Experience = (props) => {
    const [value, setValue] = useState(experience[0].tab);
    const [loading, setLoading] = useState(false);

    const handleChange = (newValue) => {
        if (value !== newValue) {
            setLoading(true)
            setValue(newValue)
        }
    }

    return (
        <div className="experience" id="experience" ref={props.refs.experience}>
            <div className="background" />
            <div className="container">
                <h1>Timeline</h1>
                <div className="contentContainer">
                    <div className="experienceItems">
                        <div className="timelineContainer">
                            {timeline(handleChange, value)}
                        </div>
                        {experience.map(mapExperienceEntry(value, loading, setLoading))}
                    </div>
                </div>
            </div>
            <div className="bottomSection" />
        </div>
    )
}

export default Experience
