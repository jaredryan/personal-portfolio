import React, { Component } from 'react';
import Project from './Project';

class Projects extends Component {
  render() {
      const webProjects = [
          {
              title: "Pokemon Team Builder",
              subtitle: "React app done with redux and api integration",
              description: ["Performs search on a Pokémon-based API using the Axios and Thunk packages", "Stores two lists, two slots, and search results using Redux", "Local state used for JavaScript manipulation", "Use of router and switch to change between pages and parts of the page", "Fully responsive for screens of all sizes"],
              demo: "https://buildpokemonteam.herokuapp.com/",
              github: "https://github.com/jaredryan/pokemon-team-builder",
              tech: ["React", 'JavaScript', 'JSX', 'CSS'],
              pictures: [
                  {
                      caption: "Home Page",
                      id: "pokemon1"
                  },
                  {
                      caption: "Pokédex Page",
                      id: "pokemon2"
                  },
                  {
                      caption: "Slots and Lists",
                      id: "pokemon3"
                  }
              ]
          },
          {
              title: "Fishackathon",
              subtitle: "First hackathon experience",
              description: ["Full-stack CRUD application for adding and searching information on freshwater bodies of water through an API (which has since been shut down)", "Secure user sign-up and login functionality", "Fully responsive for screens of all sizes", "Won local competition in Salt Lake City on Feb 10, 2018, currently awaiting results in the global competition"],
              demo: "https://freshwaterfeed.herokuapp.com/",
              github: "https://github.com/jaredryan/fishackathon-slc-11",
              tech: ["Ruby on Rails", 'JavaScript', 'HTML', 'CSS'],
              pictures: [
                  {
                      caption: "Home Page",
                      id: "fishackathon1"
                  },
                  {
                      caption: "Report Page",
                      id: "fishackathon2"
                  }
              ]
          },{
              title: "OpenHouse",
              subtitle: "First experience working with a startup",
              description: [
                  "Full-stack CRUD application for searching, adding, editing, and removing information to allow users to rent home offices",
                  "Integrates search in its database with Google Maps API to display results on a map",
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
                      id: "openHouse1"
                  },
                  {
                      caption: "Results Page",
                      id: "openHouse2"
                  },
                  {
                      caption: "Profile Page",
                      id: "openHouse3"
                  }
              ]
          },
          {
              title: "Design Replication",
              subtitle: "Practice mimicking a site's design without copying code",
              description: ["Original site for reference: http://kandjdiaries.com/", "Crash-course in how to make a well-designed website", "Without accessing the website's code, the experience was similar to that of making a website from mockups", "Fully responsive for all screen sizes", "Learned how to use font awesome for icons"],
              demo: "https://jaredryan.github.io/site-replication/",
              github: "https://github.com/jaredryan/site-replication",
              tech: ['HTML', 'CSS'],
              pictures: [
                  {
                      caption: "Blog Title",
                      id: "kandj1"
                  },
                  {
                      caption: "Blog Entry",
                      id: "kandj2"
                  },
                  {
                      caption: "Footer",
                      id: "kandj3"
                  }
              ]
          },
          {
              title: "MovieRecs",
              subtitle: "First website",
              description: ["Performs a movie search using public APIs", "Interface allows user to create and edit a recommendation list as desired"],
              demo: "https://jaredryan.github.io/movie_recs/",
              github: "https://github.com/jaredryan/movie_recs",
              tech: ['JavaScript', 'HTML', 'CSS'],
              pictures: [
                  {
                      caption: "Home",
                      id: "movieRecs1"
                  },
                  {
                      caption: "Results",
                      id: "movieRecs2"
                  },
                  {
                      caption: "Wish List",
                      id: "movieRecs3"
                  }
              ]
          },
          {
              title: "Tech JobPrep",
              subtitle: "First multipage website",
              description: ["A static website with multiple pages", "Design choices based off of matching a text editor", "Fully responsive for screens of all sizes, with my first collapsible navbar", "Content based on information I've gathered about getting a job in the tech industry"],
              demo: "https://jaredryan.github.io/tech-jobprep/index.html",
              github: "https://github.com/jaredryan/tech-jobprep",
              tech: ['JavaScript', 'HTML', 'CSS'],
              pictures: [
                  {
                      caption: "Home",
                      id: "techJobPrep1"
                  }
              ]
          },
          {
              title: "Mario Pest Control",
              subtitle: "JavaScript and Design Refresher",
              description: ["Takes user input to perform how much money Mario", "Total depends on amount of each type of enemy", "Fully responsive for screens of all sizes", "A silly site to remind myself of how to use CSS and JavaScript"],
              demo: "https://jaredryan.github.io/basic-javascript-css-practice/",
              github: "https://github.com/jaredryan/basic-javascript-css-practice",
              tech: ['JavaScript', 'HTML', 'CSS'],
              pictures: [
                  {
                      caption: "Home",
                      id: "marioPest1"
                  }
              ]
          },
          {
              title: "Tennis Quiz",
              subtitle: "First interactive quiz application",
              description: ["Gets user input to determine if the answer is correct", "Keeps track of the current score and progress on the quiz", "The questions and answers are shuffled on each round"],
              demo: "https://jaredryan.github.io/build-your-quiz/",
              github: "https://github.com/jaredryan/build-your-quiz",
              tech: ['JavaScript', 'HTML', 'CSS'],
              pictures: [
                  {
                      caption: "Quiz Page",
                      id: "quiz1"
                  }
              ]
          },
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

      // const modifier = (webProjects.length + 1) % 2;
      // const styleHeader = {backgroundColor: modifier === 0 ? "rgb(210, 210, 225)" : "white"};

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
            <h2 className="devHeader">Websites</h2>
            <div className="projectsDiv">
                {mappedWebProjects}
            </div>
            <h2 className="devHeader">Software Development</h2>
            <div className="projectsDiv">
                {mappedSoftwareProjects}
            </div>
        </div>
    );
  }
}

export default Projects;
