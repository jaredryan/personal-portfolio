import React, { Component } from 'react';
import Project from './Project';

class Projects extends Component {
  render() {
      const projects = [
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
              subtitle: "First website made for fun",
              description: ["Performs a movie search using public APIs", "Interface allows user to create and edit a recommendation list as desired"],
              demo: "https://jaredryan.github.io/movie_recs/  ",
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
          }
      ];

      const mappedProjects = projects.map((project, index) => {
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
                 />
      });

    return (
        <div className="projectsPage">
            <div className="projectBanner">
                <h1>Projects</h1>
                <div className="projectPageImg"></div>
            </div>
            <div className="projectsDiv">
                {mappedProjects}
            </div>
        </div>
    );
  }
}

export default Projects;
