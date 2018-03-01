import React from 'react';

const ProjectImage = props => {
    return(
        <div className="projectImageContainer">
            <div className="projectImage" id={props.id}></div>
            <h5>{props.caption}</h5>
       </div>
    );
}

export default ProjectImage;
