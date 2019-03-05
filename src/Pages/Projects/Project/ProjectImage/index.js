import React from 'react';
import './index.css';

const ProjectImage = props => {
    return(
        <div className="projectImageContainer">
            <div className="projectImage" id={props.id}>
                <img src={props.id} alt=""/>
            </div>
            <h5>{props.caption}</h5>
       </div>
    );
}

export default ProjectImage;
