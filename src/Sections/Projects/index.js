import React, { Component } from 'react'
import Project from './Project'
import './index.css'
import ProjectSlideShow from './Project/ProjectSlideshow'

const projects = [{
    title: "Negotiation Feedback",
    subtitle: "Complex, actively-used, fullstack application",
    date: "2018",
    summaryBullets: [
        "Freelance project for college professor",
        "Fullstack JavaScript with MongoDB consisting of schools, classes, sprints, assignments, evaluations, students, teachers, administrators, and feedback about the site"
    ],
    problemsSolved: [
        "Secure user authentication, which then directs the user to for 1 of 3 dashboards, depending on whether the user is a student, teacher, or admin",
        "Class management system for both students and teachers",
        "Evaluation management system with a complex lifecycle where both students and teachers have varying permissions to submit, grade, view and edit content",
        "Report system which ensures that students' feedback is anonymous, while also displaying the answers in an attractive manner using statistics and Victory's data visualization package",
        "Student management system for teachers",
        "Assignment management system for teachers, allowing grouping of assignments — called sprints — which allow for template assignment generation, as well as making possible anonymous feedback for the students",
        "Granting special administrator to select accounts, allowing them to manage all schools, as well as viewing and deleting access for all teachers and classes"],
    lessonsLearned: [
        "How to technically plan and design a large, complex site for many types of users",
        "How to single-handedly manage the tasks associated with such a site",
        "How to work with a designer, both in terms of tweaking the UI and discussing what is possible as a developer",
        "Helping a client to determine their needs (including the needs they may not already have considered)",
        "How to request bug reports and troubleshoot them without being able to see the bug immediately for myself"],
    demo: "https://negotiationfeedback.herokuapp.com/",
    mainImage: require("../../Images/teacherDashboard1.png"),
    pictures: [
        {
            caption: "Signup Page",
            id: require("../../Images/newDashboard.png")
        },
        {
            caption: "Student Dashboard",
            id: require("../../Images/studentDashboard.png")
        },
        {
            caption: "Student Evaluation",
            id: require("../../Images/studentEvaluation.png")
        },
        {
            caption: "Teacher Dashboard 1",
            id: require("../../Images/teacherDashboard1.png")
        },
        {
            caption: "Teacher Dashboard 2",
            id: require("../../Images/teacherDashboard2.png")
        },
        {
            caption: "Grading",
            id: require("../../Images/grading.png")
        },
        {
            caption: "Reports",
            id: require("../../Images/report.png")
        },
    ]
}, {
    title: "When Bunnies Attack",
    subtitle: "Text-based role playing game built in Node.js",
    mainImage: require("../../Images/bunnyAttack.jpg"),
    date: "2018",
    summaryBullets: [
        "Made a short RPG with all of the basic elements and a simple event engine to quickly add more content",
        "To play this game, clone the Github repository and run the app.js file with Node.js"],
    problemsSolved: [
        "Navigation system allowing the player to go from area to area as desired",
        "Requests user input to make decisions or gather information while in an area, which then open opportunities for new decisions",
        "Encounter system to trigger fights with story enemies or random enemies",
        "Turn-based fighting system where the player can attack, flee, or use items, and is rewarded for victory",
        "Inventory system that can be used inside and outside of battle"],
    lessonsLearned: [
        "How to write a game loop",
        "How to write code in a manner that allows for easy production — in this case, by simply adding an object with all necessary information into an array"],
    github: "https://github.com/jaredryan/v-assignments/tree/master/projects/colossal-adventure-console-rpg",
}];

class Projects extends Component {
    constructor() {
        super()
        this.state = {
            projectIsOpen: false,
            projectList: {},
            projectDisplay: {opacity: 0, filter: `alpha(opacity=0)`}
        }
    }

    handleProjectSet = (projectIsOpen) => {
        this.props.onScroll(this.props.refs.projects.current.offsetTop);
        setTimeout(() => {
            this.setState({
              projectIsOpen,
              projectList: {opacity: 0, filter: `alpha(opacity=0)`},
              projectDisplay: {opacity: `${1}`, filter: `alpha(opacity=${1 * 100})`}
            })
        }, 350)
    }

    handleProjectUnset = () => {
        this.props.onScroll(this.props.refs.projects.current.offsetTop);
        setTimeout(() => {
            this.setState({
              projectIsOpen: false,
              projectList: {opacity: `${1}`, filter: `alpha(opacity=${1 * 100})`},
              projectDisplay: {opacity: 0, filter: `alpha(opacity=0)`}
            })
        }, 350)
    }

  render() {
      const mappedProjects = projects.map((project, index) => {
          return <Project
                      title={project.title}
                      handleClick={() => this.handleProjectSet(project.title)}
                      mainImage={project.mainImage}
                      subtitle={project.subtitle}
                      demo={project.demo}
                      github={project.github}
                      tech={project.tech}
                      pictures={project.pictures}
                      key={project.title + index}
                      index={index}
                      modifier={0}
                 />
      });

      let project;
      const projectIsOpen = this.state.projectIsOpen !== false;
      if (projectIsOpen) {
          project = projects.find(project => project.title === this.state.projectIsOpen);

          const summaryList = project.summaryBullets && project.summaryBullets.length > 0 && project.summaryBullets.map((bullet, index) => {
              return <li key={index + bullet}>{bullet}</li>;
          });
          const problemsSolvedList = project.problemsSolved && project.problemsSolved.length > 0 && project.problemsSolved.map((bullet, index) => {
              return <li key={index + bullet}>{bullet}</li>;
          });
          const lessonsLearnedList = project.lessonsLearned && project.lessonsLearned.length > 0 && project.lessonsLearned.map((bullet, index) => {
              return <li key={index + bullet}>{bullet}</li>;
          });

          return (
              <div className="projects" id="projects" ref={this.props.refs.projects}>
                <div className="container">
                    <h1>Projects</h1>
                    <div className="projectDisplay" id="projectDisplay" style={this.state.projectDisplay}>
                        <div className="backButton" onClick={() => this.handleProjectUnset()}><i class="fa fa-arrow-left" style={{fontSize: "24px"}}></i></div>
                        <div className="projectTitle">
                            <h2>{project.title}</h2>
                            <h3>{project.subtitle}<span>|</span>{project.date}</h3>
                            <div className="buttons">
                                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer"><button className="link">Visit</button></a>}
                                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><button className="link">Github</button></a>}
                            </div>
                        </div>
                        <div className="projectInfo">
                            {summaryList &&
                                <div>
                                    <h5><span>Summary</span></h5>
                                    <ul>{summaryList}</ul>
                                </div>
                            }
                            {problemsSolvedList &&
                                <div className="projectEntryItem">
                                    <h5><span>Problems Solved</span></h5>
                                    <ul>{problemsSolvedList}</ul>
                                </div>
                            }
                            {lessonsLearnedList &&
                                <div>
                                    <h5><span>Lessons Learned</span></h5>
                                    <ul>{lessonsLearnedList}</ul>
                                </div>
                            }
                            {project.pictures &&
                                <ProjectSlideShow
                                    project={project}/>
                            }
                        </div>
                        <div className="bottomBackButton" onClick={() => this.handleProjectUnset()}><i class="fa fa-arrow-left" style={{fontSize: "24px"}}></i></div>
                    </div>
                </div>
              </div>
          );
      } else {
        return (
            <div className="projects" id="projects" ref={this.props.refs.projects}>
                <div className="container">
                    <h1>Projects</h1>
                    <div className="projectsDiv" style={this.state.projectList}>
                        {mappedProjects}
                    </div>
                </div>
            </div>
        );
    }
  }
}

export default Projects;
