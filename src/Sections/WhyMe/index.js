import React from 'react'
import './index.css'

const WhyMe = () => {
    const points = [
        {
            text: 'Through my professional experience at IBM since June 2018, I know how to learn quickly on the job and work with a team.',
            image: 'whyMeIBM'
        },
        {
            text: 'Freelance web development since April 2018 has taught me how to work and communicate with clients.',
            image: 'whyMeFreelance'
        },
        {
            text: 'While studying at UC Berkeley, I learned the value of hard work, focus, and organization, as well as optimism and humor.',
            image: 'whyMeBerkeley'
        },
        {
            text: "I've spent a year gaining experience leading, managing, training, and coaching teams of up to 20 people while volunteering in Brazil.",
            image: 'whyMeBrazil'
        }
    ]

    const mappedPoints = points.map((point, index) => {
        if (index % 2 === 0) {
            return (
                <div className="point">
                    <div className="picContainer">
                        <div className="pic" id={point.image}></div>
                    </div>
                    <div className="text">
                        <p>{point.text}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="point">
                    <div className="text">
                        <p>{point.text}</p>
                    </div>
                    <div className="picContainer">
                        <div className="pic" id={point.image}></div>
                    </div>
                </div>
            )
        }
    })

    return (
        <div className="whyMe" id="whyMe">
            <div className="banner"></div>
            <div className="flex">
                <h1>Why Me?</h1>
                <div className="points">
                    {mappedPoints}
                </div>
            </div>
        </div>
    );
}

export default WhyMe;
