import React from 'react';
import './index.css';

const Project = props => {
    return (
        <div className="projectEntry">
            <div className="projectImageContainer">
                <div className="projectImage titleImage" id={props.mainImage}>
                    <div className="hoverEntry">
                        <div>
                            <h2>{props.subtitle}</h2>
                            <a href="#projectDisplay"><button onClick={props.handleClick}>See More</button></a>
                        </div>
                    </div>
                    <img src={props.mainImage} alt=""/>
                </div>
                <h5>{props.title}</h5>
            </div>
        </div>
    );
}

export default Project;
