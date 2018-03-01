import React from 'react';

const Project = props => {
    return(
        <div className="projectEntry" onClick={props.handleClick} style={props.style}>
            <h2>{props.title}
                {
                    props.demo !== "" &&
                    <a href={props.demo} target="_blank" id="ignoreToggle">(<span id="ignoreToggle">Demo</span>)</a>
                }
            </h2>
            <h3>{props.subtitle}
                {
                    props.github !== "" && <a href={props.github} target="_blank" id="ignoreToggle">(<span id="ignoreToggle">Github</span>)</a>
                }
            </h3>
            {props.clicked ?
                <div>
                    <ul>
                        {props.descriptionList}
                    </ul>
                    <h5><span>Technologies:</span> {props.techList}</h5>
                    <div className="projectImages">
                        {props.imageList}
                    </div>
                    <h6>(Click to close)</h6>
                </div> :
                <h6>(Click to expand)</h6>
            }
        </div>
    );
}

export default Project;
