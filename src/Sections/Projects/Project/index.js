import React, { Component } from 'react';
import Project from './Project';

class ProjectContainer extends Component {
    render() {
        const descriptionList = this.props.description.map((bullet, index) => {
            return <li key={index + bullet}>{bullet}</li>;
        });

        let techList = this.props.tech && this.props.tech.reduce((total, elem) => {
            return total + elem + ", ";
        }, "");
        techList = techList.slice(0, techList.length - 2);   // remove last ", "

        return(
            <Project
                mainImage={this.props.mainImage}
                handleClick={this.props.handleClick}
                title={this.props.title}
                demo={this.props.demo}
                subtitle={this.props.subtitle}
                github={this.props.github}
                techList={techList}
                descriptionList={descriptionList}
            />
        );
    }
}

export default ProjectContainer;
