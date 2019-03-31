import React, { Component } from 'react';
import Project from './Project';
import './index.css';

class Projects extends Component {
  render() {
      const webProjects = [
          {
              title: "Negotiation Feedback",
              subtitle: "Complex, actively-used, fullstack application with on-going development",
              description: ["Fullstack JavaScript with MongoDB consisting of schools, classes, sprints, assignments, evaluations, students, teachers, administrators, and feedback about the site",
                            "User authentication, combined with redux, allows for security and displays 1 of 3 dashboards, depending on whether the user is a student, teacher, or admin",
                            "Students can join as many classes as they need, submit anonymous evaluations about their peers, receive feedback from teachers, revise evaluations and resubmit, and receive reports of their peers' feedback.",
                            "Student reports allow them to their grades and statistics through Victory's data visualization package, as well as anonymous peer feedback",
                            "Teachers create classes, manage rosters, create sprints (grouping of assignments used to generate feedback reports), and create assignments to generate evaluations and reports for their students",
                            "Teachers can also submit feedback on students' evaluations (sorting and filtering the feedback as needed) release their feedback to the students, and regrade their feedback",
                            "Adminstrators manage the schools of the site, and they may view (and delete, if needed) all teachers and classes on the site"],
              demo: "https://negotiationfeedback.herokuapp.com/",
              github: "https://github.com/jaredryan/peer-review",
              tech: ['React', 'Express', 'MongoDB', 'Node.js', 'JavaScript', 'JSX', 'CSS'],
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
              description: ["Made game from scratch using JSX, CSS, and JavaScript",
                            "Game comes with a simple UI, several levels, and several waves of different types for each level",
                            "Has a full authentication package, complete with hashed passwords and an ability to safely reset your password if you forget it",
                            "Utilizes redux to keep track of the current user's current level and scores and current",
                            "MongoDB and the backend maintains scores and users",
                            "Fully responsive for screens of all sizes"],
              demo: "http://nestinvaders.herokuapp.com/",
              github: "https://github.com/jaredryan/best-class-side-scroller",
              tech: ['React', 'Express', 'MongoDB', 'Node.js', 'JavaScript', 'JSX', 'CSS'],
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
              description: ["Fullstack JavaScript application with an internal server used for API calls",
                            "MongoDB maintains the list of issues and their comments in the database",
                            "Utilizes redux to keep track of the list of issues and their respective comments in the local state",
                            "Forms make it easy to create, edit, or remove issues as well as comments on an issue",
                            "Issues can be upvoted or downvoted",
                            "Fully responsive for screens of all sizes"],
              demo: "https://wetheissues.herokuapp.com/",
              github: "https://github.com/jaredryan/we-the-issues",
              tech: ['React', 'Express', 'MongoDB', 'Node.js', 'JavaScript', 'JSX', 'CSS'],
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
          // {
          //     title: "Pokémon Team Builder",
          //     subtitle: "First React app with Redux",
          //     description: ["Performs search on a Pokémon-based API using the Axios and Thunk packages", "Stores two lists, two slots, and search results using Redux", "Local state used for JavaScript manipulation", "Use of router and switch to change between pages and parts of the page", "Fully responsive for screens of all sizes"],
          //     demo: "http://buildpokemonteam.surge.sh/",
          //     github: "https://github.com/jaredryan/pokemon-team-builder",
          //     tech: ['React', 'JavaScript', 'JSX', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Home Page",
          //             id: require("../../Images/pokemon1.png")
          //         },
          //         {
          //             caption: "Pokédex Analysis",
          //             id: require("../../Images/pokemon2.png")
          //         },
          //         {
          //             caption: "Search Pokémon Page",
          //             id: require("../../Images/pokemon3.png")
          //         }
          //     ]
          // },
          // {
          //     title: "Fishackathon",
          //     subtitle: "First hackathon experience",
          //     description: ["Full-stack CRUD application for adding and searching information on freshwater bodies of water through an API (which has since been shut down)", "Secure user sign-up and login functionality", "Fully responsive for screens of all sizes", "Won local competition in Salt Lake City on Feb 10, 2018, currently awaiting results in the global competition"],
          //     demo: "https://freshwaterfeed.herokuapp.com/",
          //     github: "https://github.com/jaredryan/fishackathon-slc-11",
          //     tech: ["Ruby on Rails", 'JavaScript', 'HTML', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Home Page",
          //             id: require("../../Images/fishackathon1.png")
          //         },
          //         {
          //             caption: "Report Page",
          //             id: require("../../Images/fishackathon2.png")
          //         }
          //     ]
          // },
          {
              title: "OpenHouse",
              subtitle: "First experience working with a startup",
              description: [
                  "College project working with startup and student team -- on the student team, worked as project manager and one of three primary developers",
                  "Full-stack CRUD application for searching, adding, editing, and removing information to allow users to rent home offices",
                  "Integrated search in its database with Google Maps API to display results on a map",
                  "Implemented a messaging system to allow users to discuss renting a space",
                  "Secure user sign-up and login functionality",
                  "Thoroughly tested with Cucumber and RSpec"
              ],
              demo: "http://openhouse-1.herokuapp.com/",
              github: "https://github.com/jjeremydiaz/OpenHouse",
              tech: ["Ruby on Rails", 'JavaScript', 'HTML', 'CSS'],
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
          }
          // {
          //     title: "Design Replication",
          //     subtitle: "Practice mimicking a site's design without copying code",
          //     description: ["Original site for reference: http://kandjdiaries.com/", "Crash-course in how to make a well-designed website", "Without accessing the website's code, the experience was similar to that of making a website from mockups", "Fully responsive for all screen sizes", "Learned how to use font awesome for icons"],
          //     demo: "https://jaredryan.github.io/site-replication/",
          //     github: "https://github.com/jaredryan/site-replication",
          //     tech: ['HTML', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Blog Title",
          //             id: require("../../Images/kandj1.png")
          //         },
          //         {
          //             caption: "Blog Entry",
          //             id: require("../../Images/kandj2.png")
          //         },
          //         {
          //             caption: "Footer",
          //             id: require("../../Images/kandj3.png")
          //         }
          //     ]
          // },
          // {
          //     title: "MovieRecs",
          //     subtitle: "First website",
          //     description: ["Performs a movie search using public APIs", "Interface allows user to create and edit a recommendation list as desired"],
          //     demo: "https://jaredryan.github.io/movie_recs/",
          //     github: "https://github.com/jaredryan/movie_recs",
          //     tech: ['JavaScript', 'HTML', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Home",
          //             id: require("../../Images/movieRecs1.png")
          //         },
          //         {
          //             caption: "Results",
          //             id: require("../../Images/movieRecs2.png")
          //         },
          //         {
          //             caption: "Wish List",
          //             id: require("../../Images/movieRecs3.png")
          //         }
          //     ]
          // },
          // {
          //     title: "Tech JobPrep",
          //     subtitle: "First multipage website",
          //     description: ["A static website with multiple pages", "Design choices based off of matching a text editor", "Fully responsive for screens of all sizes, with my first collapsible navbar", "Content based on information I've gathered about getting a job in the tech industry"],
          //     demo: "https://jaredryan.github.io/tech-jobprep/index.html",
          //     github: "https://github.com/jaredryan/tech-jobprep",
          //     tech: ['JavaScript', 'HTML', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Home",
          //             id: require("../../Images/techJobPrep1.png")
          //         }
          //     ]
          // },
          // {
          //     title: "Mario Pest Control",
          //     subtitle: "JavaScript and Design Refresher",
          //     description: ["Takes user input to determine how much money Mario has made", "Total depends on amount of each type of enemy", "Fully responsive for screens of all sizes", "A silly site to remind myself of how to use CSS and JavaScript"],
          //     demo: "https://jaredryan.github.io/basic-javascript-css-practice/",
          //     github: "https://github.com/jaredryan/basic-javascript-css-practice",
          //     tech: ['JavaScript', 'HTML', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Home",
          //             id: require("../../Images/marioPest1.png")
          //         }
          //     ]
          // },
          // {
          //     title: "Tennis Quiz",
          //     subtitle: "First interactive quiz application",
          //     description: ["Gets user input to determine if the answer is correct", "Keeps track of the current score and progress on the quiz", "The questions and answers are shuffled on each round"],
          //     demo: "https://jaredryan.github.io/build-your-quiz/",
          //     github: "https://github.com/jaredryan/build-your-quiz",
          //     tech: ['JavaScript', 'HTML', 'CSS'],
          //     pictures: [
          //         {
          //             caption: "Quiz Page",
          //             id: require("../../Images/quiz1.png")
          //         }
          //     ]
          // },
      ];

      // Add software projects
      const softwareProjects = [
          {
              title: "When Bunnies Attack",
              subtitle: "Text-based role playing game built in Node.js",
              description: ["To play this game, clone the Github repository and run app.js in Node.js", "Game mechanics and systems required a large amount of modularized code to make it easier to add new features", "Features a navigation system allowing the player to go from area to area as desired", "Requests user input to make decisions or gather information, which then open opportunities for new decisions", "Includes a system for forced encounters with story enemies or random enemies as you walk", "Turn-based fighting system where the player can attack, flee, or use items, and is rewarded for victory", "Allows the user to print the current status or quit the game at any time"],
              demo: "",
              github: "https://github.com/jaredryan/v-assignments/tree/master/projects/colossal-adventure-console-rpg",
              tech: ["Node.js"],
          },
          {
              title: "UC Berkeley Copyrighted Course Projects",
              subtitle: "A list of projects, where the code is copyrighted",
              description: ["Designed and implemented a simplified version of Git, which manipulated files on a local computer (Java)(CS 61B)", "Implemented the logic of a simplified neural network (Python)", "Optimized a naive depth map generator algorithm using OpenMP, SSE Intrinsics, etc. for 5x speedup (C)", "Parallelized a common image compression algorithm with MapReduce in Spark (Python)", "Performed genomic analysis, including the implementation of the Needleman-Wunsch algorithms to align two sequences (Python)(BE 131)", "Implemented ALU, Register File, CPU, and 2-stage pipeline to better understand a processor (Logisim)"],
              demo: "",
              github: "",
              tech: ""
          }
      ];

      const mappedWebProjects = webProjects.map((project, index) => {
          return <Project
                      title={project.title}
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

      const mappedSoftwareProjects = softwareProjects.map((project, index) => {
          return <Project
                      title={project.title}
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

    return (
        <div className="projectsPage">
            <div className="projectBanner">
                <h1>Projects</h1>
                <div className="projectPageImg"></div>
            </div>
            <h2>Websites</h2>
            <div className="projectsDiv">
                {mappedWebProjects}
            </div>
            <h2>Software Development</h2>
            <div className="projectsDiv">
                {mappedSoftwareProjects}
            </div>
        </div>
    );
  }
}

export default Projects;
