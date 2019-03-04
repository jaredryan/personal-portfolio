import React, { Component } from 'react';
import Thumbnail from './Thumbnail';
import './index.css';

class Home extends Component {
  render() {
      const thumbnails = [
          {
              name: "Projects",
              path: "/projects",
              imgURL: require("../../Images/homepageProjects.png")
          },{
              name: "About",
              path: "/about",
              imgURL: require("../../Images/aboutMeIcon.jpg")
          },{
              name: "Resume",
              path: "/resume",
              imgURL: require("../../Images/resumeHomeIcon.png")
          }
      ];

      const thumbnailList = thumbnails.map((thumbnail, index) => {
        return <Thumbnail
                    name={thumbnail.name}
                    imgURL={thumbnail.imgURL}
                    key={index + thumbnail.name}
                    id={thumbnail.name}
                    path={thumbnail.path}
                />
      });

    return (
        <div className="mainPage">
            <header>
                <div className="homepageText">
                    <h1>Jared Ryan</h1>
                    <h2 style={{marginBottom: "10px", marginTop: "30px"}}>IBM Software Developer</h2>
                    <h2 style={{marginBottom: "0px", marginTop: "10px"}}>Freelance Web Developer</h2>
                </div>
                <div className="homepageImg"></div>
            </header>
            <div className="threeThumbnails">
                {thumbnailList}
            </div>
        </div>
    );
  }
}

export default Home;
