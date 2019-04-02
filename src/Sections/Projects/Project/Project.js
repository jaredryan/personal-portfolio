import React from 'react';
import './index.css';
import ProjectImage from './ProjectImage';

const Project = props => {
    return (
        <div className="projectEntry">
            {props.clicked ?
                <div>
                    <ul>
                        {props.descriptionList}
                    </ul>
                    {props.techList && <h5><span>Technologies:</span> {props.techList}</h5>}
                    <div className="projectImages">
                        {props.imageList}
                    </div>
                </div>
                :
                <div className="projectImageContainer">
                    <div className="projectImage titleImage" id={props.mainImage}>
                        <div className="hoverEntry">
                            <div>
                                <h2>{props.subtitle}</h2>
                                <button onClick={props.handleClick}>See More</button>
                            </div>
                        </div>
                        <img src={props.mainImage} alt=""/>
                    </div>
                    <h5>{props.title}</h5>
                </div>
            }
        </div>
    );
}

export default Project;
