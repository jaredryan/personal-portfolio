import React from 'react'
import './index.css'
import FrontendImage from '../../Images/frontendIcon2.png';
import BackendImage from '../../Images/backend2.png';
import SoftImage from '../../Images/softIcon2.png';


const mapSkills = (skill) =>
    <div key={skill.title} className="skillCategoryContainer">
        {/* <div className={skill.title.toLowerCase()}></div> */}
        {skill.image}
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
    </div>

export default Skills
