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
        console.dir(e.target);
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
            backgroundColor: this.props.index % 2 === 0
                                ? "rgb(210, 210, 225)"
                                : "white"
        }

        const descriptionList = this.props.description.map((bullet, index) => {
            return <li key={index + bullet}>{bullet}</li>;
        });

        let techList = this.props.tech.reduce((total, elem) => {
            return total + elem + ", ";
        }, "");
        techList = techList.slice(0, techList.length - 2)

        const imageList = this.props.pictures.map((image, index) => {
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
