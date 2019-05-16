import React, { Component } from 'react'
import Project from './Project'
import './index.css'
import ProjectSlideShow from './Project/ProjectSlideshow'

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
      const projects = [
          {
              title: "Negotiation Feedback",
              subtitle: "Complex, actively-used, fullstack application with on-going development",
              date: "April 2018-Present",
              summaryBullets: ["Fullstack JavaScript with MongoDB consisting of schools, classes, sprints, assignments, evaluations, students, teachers, administrators, and feedback about the site"],
              problemsSolved: [
                  "Secure user authentication, which then directs the user to for 1 of 3 dashboards, depending on whether the user is a student, teacher, or admin",
                  "Class management system for both students and teachers",
                  "Evaluation management system with a complex lifecycle where both students and teachers have varying permissions to submit, grade, view and edit content",
                  "Report system which ensures that students' feedback is anonymous, while also displaying the answers in an attractive manner using statistics and Victory's data visualization package",
                  "Student management system for teachers",
                  "Assignment management system for teachers, allowing grouping of assignments -- called sprints -- which allow for template assignment generation, as well as making possible anonymous feedback for the students",
                  "Granting special adminstrator to select accounts, allowing them to manage all schools, as well as viewing and deleting access for all teachers and classes"],
              lessonsLearned: [
                  "How to technically design a large, complex site",
                  "How to single-handedly manage the task associated with such a site",
                  "How to work with a designer, both in terms of tweaking the UI and discussing what is possible as a developer",
                  "Helping a client to determine their needs (including the needs they may not already have considered)",
                  "To bill by the hour — until I know better how to estimate the amount of work to complete a task"],
              demo: "https://negotiationfeedback.herokuapp.com/",
              github: "https://github.com/jaredryan/peer-review",
              tech: ['React', 'Express', 'MongoDB', 'Node.js', 'JavaScript', 'JSX', 'CSS'],
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
                  {
                      caption: "Old Main Page",
                      id: require("../../Images/NRMainPage.png")
                  },
                  {
                      caption: "Old Teacher Review",
                      id: require("../../Images/NRTeacherReview.png")
                  },
              ]
          },
          {
              title: "Nest Invaders",
              subtitle: "A 2D shooting game built in a fullstack website with secure login",
              date: "April 2018",
              summaryBullets: ["Made game from scratch using JSX, CSS, and JavaScript"],
              lessonsLearned: [
                  "How to create a site with a full authentication package, complete with hashed passwords and an ability to safely reset your password if you forget it",
                  "How to control content of the site based on the user's permissions (in this case, access to the playing the game at levels 1-3)",
                  "How to write a quickly-updating game loop factoring game logic, determining the current score, AI decisions, and enemy waves",
                  "How to get user input to activate game controls in the UI"],
              demo: "http://nestinvaders.herokuapp.com/",
              github: "https://github.com/jaredryan/best-class-side-scroller",
              tech: ['React', 'Express', 'MongoDB', 'Node.js', 'JavaScript', 'JSX', 'CSS'],
              mainImage: require("../../Images/NIGame.png"),
              pictures: [
                  {
                      caption: "Home Page",
                      id: require("../../Images/NIMainPage.png")
                  },
                  {
                      caption: "Game",
                      id: require("../../Images/NIGame.png")
                  },
                  {
                      caption: "Levels, Instructions, and Scores",
                      id: require("../../Images/NIScoresAndLevels.png")
                  },
                  {
                      caption: "Profile Page",
                      id: require("../../Images/NIProfileForms.png")
                  },
              ]
          },
          {
              title: "We, the Issues",
              subtitle: "First fullstack application with React and Node.js",
              date: "March 2018",
              summaryBullets: ["Fullstack JavaScript application with an internal server used for API calls"],
              problemsSolved: [
                  "Implemented a system to create, edit, or remove issues as well as comments on an issue",
                  "Implemented a voting and sorting system",
                  "Fully responsive for screens of all sizes"
              ],
              lessonsLearned: [
                  "How to properly store information in the frontend using redux and state",
                  "How to use properly store information the backend using node and MongoDB",
                  "How to connect these parts into a fullstask application",
                  "The basic concepts of what it would take to implement a social-media site (without the smart functionality)"
              ],
              demo: "https://wetheissues.herokuapp.com/",
              github: "https://github.com/jaredryan/we-the-issues",
              tech: ['React', 'Express', 'MongoDB', 'Node.js', 'JavaScript', 'JSX', 'CSS'],
              mainImage: require("../../Images/weTheIssues1.png"),
              pictures: [
                  {
                      caption: "Banner and New Issue Form",
                      id: require("../../Images/weTheIssues1.png")
                  },
                  {
                      caption: "Issue",
                      id: require("../../Images/weTheIssues2.png")
                  },
              ]
          },
          {
              title: "OpenHouse",
              subtitle: "First experience working with a startup",
              date: "October 2017-December 2017",
              summaryBullets: ["College project working with startup and student team -- on the student team, worked as project manager and one of three primary developers"],
              problemsSolved: [
                  "Full-stack CRUD application for searching, adding, editing, and removing information to allow users to rent home offices",
                  "Integrated search in its database with Google Maps API to display results on a map",
                  "Implemented a messaging system to allow users to discuss renting a space",
                  "Secure user sign-up and login functionality",
                  "Thoroughly tested with Cucumber and RSpec"],
              lessonsLearned: [
                  "How to regularly meet with a client to determine their on-going needs, as well as discuss our current progress",
                  "How to manage a project with a team of 6 developers with varying degrees of interest and skill",
                  "How to research and add new features that I never would have imagined",
                  "How to implement a fullstack site using Ruby on Rails"],
              demo: "http://openhouse-1.herokuapp.com/",
              github: "https://github.com/jjeremydiaz/OpenHouse",
              tech: ["Ruby on Rails", 'JavaScript', 'HTML', 'CSS'],
              mainImage: require("../../Images/openHouse1.png"),
              pictures: [
                  {
                      caption: "Home Page",
                      id: require("../../Images/openHouse1.png")
                  },
                  {
                      caption: "Results Page",
                      id: require("../../Images/openHouse2.png")
                  },
                  {
                      caption: "Profile Page",
                      id: require("../../Images/openHouse3.png")
                  }
              ]
          },
          {
              title: "When Bunnies Attack",
              subtitle: "Text-based role playing game built in Node.js",
              mainImage: require("../../Images/bunnyAttack.jpg"),
              date: "February 2018",
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
              tech: ["Node.js"],
          },
          {
              title: "UC Berkeley Projects",
              subtitle: "A list of projects, where the code is copyrighted",
              mainImage: require("../../Images/berkeleyProjects.jpg"),
              date: "Fall 2014-Fall 2018",
              description: ["Designed and implemented a simplified version of Git, which manipulated files on a local computer (Java)(CS 61B)", "Implemented the logic of a simplified neural network (Python)", "Optimized a naive depth map generator algorithm using OpenMP, SSE Intrinsics, etc. for 5x speedup (C)", "Parallelized a common image compression algorithm with MapReduce in Spark (Python)", "Performed genomic analysis, including the implementation of the Needleman-Wunsch algorithms to align two sequences (Python)(BE 131)", "Implemented ALU, Register File, CPU, and 2-stage pipeline to better understand a processor (Logisim)"],
              tech: ""
          }
      ];

      const mappedProjects = projects.map((project, index) => {
          return <Project
                      title={project.title}
                      handleClick={() => this.handleProjectSet(project.title)}
                      mainImage={project.mainImage}
                      subtitle={project.subtitle}
                      description={project.description}
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
          const descriptionList = project.description && project.description.length > 0 && project.description.map((bullet, index) => {
              return <li key={index + bullet}>{bullet}</li>;
          });

          let techList = project.tech && project.tech.reduce((total, elem) => {
              return total + elem + ", ";
          }, "");
          techList = techList.slice(0, techList.length - 2);   // remove last ", "

          return (
              <div className="projects" id="projects" ref={this.props.refs.projects}>
                  <div className="banner"></div>
                  <div className="overlay"></div>
                  <div className="overlay2"></div>
                  <div className="flex" style={{padding: 0, paddingTop: "80px"}}>
                      <h1>Projects</h1>
                      <div className="projectDisplay" id="projectDisplay" style={this.state.projectDisplay}>
                          <div className="backButton" onClick={() => this.handleProjectUnset()}><i class="fa fa-arrow-left" style={{fontSize: "24px"}}></i></div>
                          <h2>{project.title}</h2>
                          <h3>{project.subtitle} <br/>({project.date})</h3>
                          <div className="buttons">
                              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer"><button className="link">Visit</button></a>}
                              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><button className="link">Github</button></a>}
                          </div>
                          <div className="projectEntry">
                              <div>
                                  {summaryList &&
                                      <div>
                                          <h5><span>Summary</span></h5>
                                          <ul>{summaryList}</ul>
                                      </div>
                                  }
                                  {problemsSolvedList &&
                                      <div>
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
                                  {descriptionList && <ul>{descriptionList}</ul>}
                                  {techList && <h5><span>Technologies:</span> <span className="tech">{techList}</span></h5>}
                                  {project.pictures &&
                                        <ProjectSlideShow
                                            project={project}/>
                                  }
                              </div>
                          </div>
                          <div className="bottomBackButton" onClick={() => this.handleProjectUnset()}><i class="fa fa-arrow-left" style={{fontSize: "24px"}}></i></div>
                      </div>
                  </div>
              </div>
          );
      } else {
        return (
            <div className="projects" id="projects" ref={this.props.refs.projects}>
                <div className="banner"></div>
                <div className="overlay"></div>
                <div className="overlay2"></div>
                <div className="flex">
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
