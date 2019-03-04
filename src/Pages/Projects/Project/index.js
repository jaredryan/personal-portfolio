import React, { Component } from 'react';
import ProjectImage from './ProjectImage';
import Project from './Project';

class ProjectContainer extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.id !== "ignoreToggle") {
            this.setState(prevState => {
                return {
                    clicked: !prevState.clicked
                }
            });
        }
    }

    render(){
        const style = {
            backgroundColor: (this.props.index + this.props.modifier) % 2 === 0
                                ? "white"
                                : "rgb(224, 221, 213)"
        }

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
                handleClick={this.handleClick}
                title={this.props.title}
                demo={this.props.demo}
                subtitle={this.props.subtitle}
                github={this.props.github}
                clicked={this.state.clicked}
                techList={techList}
                descriptionList={descriptionList}
                imageList={imageList}
                style={style}
            />
        );
    }
}

export default ProjectContainer;
