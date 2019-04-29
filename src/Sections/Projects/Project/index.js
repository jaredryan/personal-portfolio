import React, { Component } from 'react';
import Project from './Project';

class ProjectContainer extends Component {
    render() {
        return(
            <Project
                mainImage={this.props.mainImage}
                handleClick={this.props.handleClick}
                title={this.props.title}
                subtitle={this.props.subtitle}
            />
        );
    }
}

export default ProjectContainer;
