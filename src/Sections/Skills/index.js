import React from 'react'
import './index.css'
import FrontendImage from '../../Images/frontendIcon.png';
import BackendImage from '../../Images/backendIcon.png';
import SoftImage from '../../Images/softIcon.jpg';


const mapSkills = (skill) =>
    <div key={skill.title} className="skillCategoryContainer">
        {skill.image}
        {skill.icon}
        <div className="categoryContainer">
            <div className="categoryTitle">
                <h3>{skill.title}</h3>
            </div>
            <ul>
                {skill.listItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
        </div>
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
    image: <img src={FrontendImage} alt="Frontend Skills" className="frontend" />,
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
    image: <img src={BackendImage} alt="Backend Skills" className="backend" />,
}, {
    title: 'Soft',
    listItems: [
        'Discover client needs',
        'Technical planning',
        'Technical documentation',
        'Presentations',
        'Pairing',
        'Mentoring',
        'Agile',
        'Independent',
        'When/how to seek help'
    ],
    icon: <i className="fa fa-users" style={{fontWeight: 100}} />,
    image: <img src={SoftImage} alt="Soft Skills" className="soft" />,
}]

const Skills = (props) => 
    <div className="skills" ref={props.refs.skills}>
        <div className="container">
            <h1>Skills</h1>
            <div className="skillsGrid">
                {skills.map(mapSkills)}
            </div>
        </div>
        <div className="bottomSection" />
    </div>

export default Skills
