import React, { Component } from 'react';
import ProjectImage from './ProjectImage';
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

        const imageList = this.props.pictures && this.props.pictures.map((image, index) => {
            return <ProjectImage
                        id={image.id}
                        caption={image.caption}
                   />
        })

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
                imageList={imageList}
            />
        );
    }
}

export default ProjectContainer;
