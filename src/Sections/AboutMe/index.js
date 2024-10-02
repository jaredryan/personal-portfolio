import React from 'react'
import './index.css'

const AboutMe = (props) => (
    <div className="aboutMe" id="aboutMe" ref={props.refs.aboutMe}>
        <div className="container"> 
            <div className="profilePicContainer">
                <div className="profilePic">
                    <div></div>
                </div>
                <div>
                    <h3 className="emphasis">
                        Welcome! I'm Jared. You're probably wondering who I am and how I can help.
                    </h3>
                    <p>
                        I stumbled into software while studying Bioengineering at UC Berkeley: it was love at first loop.
                        That love ultimately culminated in a software engineer position at IBM.
                        2 years in, I led the frontend of my team, becoming confident with the frontend, project planning,
                        technical discussions, and mentoring other engineers.
                        5 years in, I expanded laterally into backend, deployment, and automation, and actively participated
                        in design and product discussions.
                    </p>
                    <p>
                        My curiosity drives me to learn the basics of how the code ecosystem works, then searching for the best
                        gap I can fill. I also gravitate towards the work done before any code: determining customer needs,
                        prioritizing them, creating user-friendly design solutions, and planning and coordinating the work.
                    </p>
                    <p>
                        Let's dive into specifics.
                    </p>
                </div> 
            </div>
        </div>
    </div>
)

export default AboutMe
