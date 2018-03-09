import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
        <div className="aboutPage">
            <div className="aboutBanner">
                <h1>About Me</h1>
                <div className="aboutPageImg"></div>
            </div>
            <div className="introAndContact">
                <div className="row1">
                    <div className="gradPic"></div>
                    <div className="softwareText">
                        <h3>Why Software?</h3>
                        <p className="mobileUnfriendly">I discovered my love for computer science midway through my bachelor’s degree as a Bioengineering student at UC Berkeley. To me, it feels like solving a logic puzzle with the resources of a computer, and I absolutely love it. The discovery of computer science reinvigorated my studies, and consequently, I decided to focus my electives on it. Now, I am pursuing a career in it.</p>
                    </div>
                </div>
                <div className="row2">
                    <div className="profilePic"></div>
                    <div className="seeMore">
                        <h3>Contact Me!</h3>
                        <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)" className="aboutEmail"><p><span>Email:</span><br className="mobile"/>jryantennis@gmail.com</p></a>
                        <div className="gapEmailAndCell"></div>
                        <p><span>Cell:</span>559-348-3595</p>
                        <br/>
                        <p>See <Link to="/projects">Projects</Link>.</p>
                        <p>See <Link to="/resume">Resume</Link>.</p>
                        <p>See <a href="https://github.com/jaredryan">Github</a>.
                        </p>
                        <p>See <a href="https://www.linkedin.com/in/jared-m-ryan/">LinkedIn</a>.</p>
                    </div>
                </div>
            </div>

            <div className="myValues">
                <div className="valuesPic"></div>
                <div className="valuesText">
                    <h3>My Values</h3>

                    <p className="mobileUnfriendly">Regarding my career, what I value most is self-improvement, organization, and teamwork.</p>

                    <p className="mobileUnfriendly">I'm a very game-oriented person: I enjoy sports, video games, and board games, and when I play them, I am constantly trying new strategies so I can get better. I find myself applying this same attitude to all areas of my life.</p>

                    <p className="mobileUnfriendly">This leads into the importance of organization: if I want to actually achieve this growth, it's essential for me to decide what exactly I want, make a plan, and have the determination to execute it.</p>

                    <p className="mobileUnfriendly">Lastly, I've found too that including the right people—with a little coordination—makes it not only that much easier to achieve that vision, but also enjoy the process.</p>
                </div>
            </div>

            <div className="myBackground">
                <div className="backgroundText">
                    <h3>My Background</h3>
                    <p className="mobileUnfriendly">It was too late to switch majors, so I studied what I could within the bioengineering program, and I ended up being one programming course short of a computer science minor, and two programming courses short of a major (too bad they don't let you switch majors last minute!).</p>

                    <p className="mobileUnfriendly">Instead of staying one more semester to get the minor, I decided to branch out on my own. Realizing how much I enjoyed web development, I decided to attend V School, a 12 week coding bootcamp with teaches Full Stack JavaScript (MERN) Web Development, and I'm loving every minute of it.</p>

                    <p className="mobileUnfriendly">At this point as a recent college graduate, I've been programming for a couple hours every day for the past two years, and that has intensified in the past 8 months once I decided that software is what I wanted to do for a living.</p>
                </div>

                <div className="naturePic"></div>
            </div>

            <div className="myInterests">
                <div className="swedenPic"></div>
                <div className="interestsText">
                    <h3>My Interests</h3>
                    <p className="mobileUnfriendly">Growing up, I've been a very competitive person. I love games of all kinds: enjoy sports, video games, and board games. I'll take anyone on in a game of tennis, basketball, ping pong, Super Smash Bros., or Mario Kart. And I'll rarely turn down the chance to play any good board game with friends.</p>

                    <p className="mobileUnfriendly">Over time, I've mellowed out a little, learning to simply enjoy the company of my friends and family, go out in nature more, and kick back and watch a good movie.</p>

                    <p className="mobileUnfriendly">It's always been a dream of mine to travel the world; I'm currently in the process of planning that out. Any suggestions of where to go first are greatly appreciated!</p>
                </div>
            </div>

        </div>

    );
  }
}

export default About;
