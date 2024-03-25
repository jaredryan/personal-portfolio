import React from 'react'
import './index.css'

const mapSkills = (skill) =>
    <div key={skill.title} className="skillCategoryContainer">
        {skill.icon}
        <h3>{skill.title}</h3>
        <ul>
            {skill.listItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </div>

const skills = [{
    title: 'Frontend',
    listItems: [
        'JavaScript',
        'TypeScript',
        'React',
        'HTML',
        'CSS',
        'Responsive design',
        'Accessibility',
        'Automated testing',
        'Performance tuning',
        'GraphQL',
    ],
    icon: <i className="fa fa-laptop" style={{fontWeight: 100}} />,
}, {
    title: 'Backend',
    listItems: [
        'Node',
        'MongoDB',
        'SQL',
        'GraphQL',
        'RESTful APIs',
        'Docker',
        'Kubernetes',
        'Automated testing',
        'Automated pipelines',
    ],
    icon: <i className="fa fa-server" style={{fontWeight: 100}} />,
}, {
    title: 'Soft',
    listItems: [
        'Agile',
        'Discover client needs',
        'Technical planning',
        'Technical documentation',
        'Demo presentations',
        'Pairing',
        'Mentoring',
        'Independent',
        '...but knows when to seek help'
    ],
    icon: <i className="fa fa-users" style={{fontWeight: 100}} />,
}]

const Skills = (props) => 
    <div className="skills" ref={props.refs.skills}>
        <div className="container">
            <h1>Skills</h1>
            <div className="skillsGrid">
                {skills.map(mapSkills)}
            </div>
        </div>
    </div>

export default Skills
