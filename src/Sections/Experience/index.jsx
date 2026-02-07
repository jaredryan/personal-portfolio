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

import GoldOceanIcon from '../../Images/goldOceanIcon.png'
import MantlIcon from '../../Images/mantlIcon.png'
import IBMIcon from '../../Images/ibmIcon.png'
import NTRIcon from '../../Images/ntrIcon.png'
import VSchoolIcon from '../../Images/vSchoolIcon.png'
import UCBerkeleyIcon from '../../Images/ucBerkeleyIcon.png'

const work = [{
    tab: 'Gold Ocean Holdings',
    title: 'Senior Software Engineer',
    company: 'Gold Ocean Holdings',
    start: 2023,
    end: 'Present',
    location: 'Remote',
    listItems: [
        'Managed team of 6+, increased productivity by 15% by jointly crafting improvement and career plans with structured tracking for each engineer, combined with pairing sessions',
        'Developed an automated data pipeline for real estate acquisitions: scrape listings, sanitize, and generate recommendations, leading to $XXm funds invested',
        'Refined mathematical model for real estate acquisitions recommendations, which properly filters out 20% more properties, saving 1hr+ of manual evaluation for each listing filtered',

    ],
    icon: (handleChange, value) =>
        <img src={GoldOceanIcon} alt={'Gold Ocean Holdings'} className={`icon${value === 'Gold Ocean Holdings' ? ' chosen' : ''}`} onClick={() => handleChange('Gold Ocean Holdings')}/>,
}, {
    tab: 'MANTL',
    title: 'Software Developer II',
    company: 'MANTL',
    start: 2021,
    end: 2023,
    location: 'Remote',
    listItems: [
        'Mentored 4+ engineers on frontend work and owned crucial frontend features, receiving team recognition for good PR reviews, pairing sessions, testing, and good design and flows',
        'Led work on an automated testing pipeline for 3+ teams and 150+ tests and advocated for tests as mandatory for PRs, leading to automated test coverage jumping from 25% to 80%',
        'Reduced customer activation by 10+% by leading discussions with key team and organizational stakeholders to identify, prioritize, and fill gaps through automation',
    ],
    icon: (handleChange, value) =>
        <img src={MantlIcon} alt={'MANTL'} className={`icon${value === 'MANTL' ? ' chosen' : ''}`} onClick={() => handleChange('MANTL')}/>,
}, {
    tab: 'IBM - CA',
    title: 'Software Developer II',
    company: 'IBM',
    start: 2019,
    end: 2021,
    location: 'San Jose, CA',
    listItems: [
        'Led frontend with 3+ engineers through Agile methodology on 3-month cycles, improving team velocity by 15% and team estimation accuracy by 30%',
        'Architected technical solutions with product and backend lead, considering security, performance, sizing, business value, and usability, expanding platform capabilities by 33%',
        'Partnered with design to reduce design iteration cycles by 20% through active participation in design conception, providing guidance on models, relationships, and technical limits',
    ],
    icon: (handleChange, value) => 
        <img src={IBMIcon} alt={'IBM'} className={`icon${value === 'IBM - CA' ? ' chosen' : ''}`} onClick={() => handleChange('IBM - CA')} />,
}, {
    tab: 'IBM - TX',
    title: 'Software Developer I',
    company: 'IBM',
    start: 2018,
    end: 2019,
    location: 'Austin, Texas',
    listItems: [
        'Increased sales by 10% by pioneering demo applications showcasing product capabilities',
        'Quickly debugged issues across multiple technologies (OAuth, OpenID, Node, Angular, Java, Android, Swift, Docker, Jenkins), increasing passing automation tests by 15%',
    ],
    icon: (handleChange, value) =>
        <img src={IBMIcon} alt={'IBM'} className={`icon${value === 'IBM - TX' ? ' chosen' : ''}`} onClick={() => handleChange('IBM - TX')} />,
}, {
    tab: 'NTR',
    title: 'Web Developer',
    company: 'NTR',
    start: 2018,
    end: 2022,
    location: 'Remote - Berkeley, CA',
    listItems: [
        'Partnered with UC Berkeley professor to design website for collecting, grading, releasing, and anonymizing feedback, now used by 20+ colleges with 10,000+ submissions',
        'Singlehandedly developed the website from scratch with React, Node, and MongoDB, and administered it for 4 years with 99.999% availability and 0 bugs after the 1st year',
    ],
    icon: (handleChange, value) =>
        <img src={NTRIcon} alt={'NTR'} className={`icon${value === 'NTR' ? ' chosen' : ''}`} onClick={() => handleChange('NTR')} />,
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
    const horizontalRef = createRef(null)
    const verticalRef = createRef(null)
    const hidden = value !== experience.tab

    const cssTransitionProps = {
        key: experience.title + index,
        in: !hidden && !loading,
        timeout: 500,
        onExited: () => setLoading(false),
        appear: true,
    }

    const mapEntry = (thisRef) => 
        experience?.company
            ? mapWorkEntry(experience, hidden, thisRef)
            : mapEducationEntry(experience, hidden, thisRef)
    
    return <>
        <CSSTransition
            {...cssTransitionProps}
            key={cssTransitionProps.key + 'vertical'}
            nodeRef={verticalRef}
            className="vertical"
            classNames="fade-bounce-right-visibility"
        >
            {mapEntry(verticalRef)}
        </CSSTransition>
        <CSSTransition
            {...cssTransitionProps}
            key={cssTransitionProps.key + 'horizontal'}
            nodeRef={horizontalRef}
            className="horizontal"
            classNames="fade-bounce-down-visibility"
        >
            {mapEntry(horizontalRef)}
        </CSSTransition>
    </>
    
}

const earliestYear = 2017
const latestYearOfUpdates = 2023
const timelineYears = Array.from(
     {length: latestYearOfUpdates + 1 - earliestYear }, 
    (v, k) => k + earliestYear
)

const verticalTimelineComponent = (year, content, last) => !content.length ? null : 
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

const horizontalTimelineComponent = (year, content, last) => !content.length ? null : 
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
                <h1>Experience</h1>
                <div className="contentContainer">
                    <div className="experienceItems">
                        <div className="timelineContainer">
                            {timeline(handleChange, value)}
                        </div>
                        <div className="experiencesContainer">
                            {experience.map(mapExperienceEntry(value, loading, setLoading))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottomSection" />
        </div>
    )
}

export default Experience
