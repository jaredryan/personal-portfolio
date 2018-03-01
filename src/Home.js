import React, { Component } from 'react';
import Thumbnail from './Thumbnail';

class Home extends Component {
  render() {
      const thumbnails = [
          {
              name: "Projects",
              description: "Check out a comprehensive list of my projects.",
              path: "/projects"
          },{
              name: "About",
              description: "Click here to learn more about what I'm like.",
              path: "/about"
          },{
              name: "Resume",
              description: "See my qualifications in a simple or fun format.",
              path: "/resume"
          }
      ];

      const thumbnailList = thumbnails.map((thumbnail, index) => {
        return <Thumbnail
                    name={thumbnail.name}
                    description={thumbnail.description}
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
                    <h2>Software and Web Developer</h2>
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
