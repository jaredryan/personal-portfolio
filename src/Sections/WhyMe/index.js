import React, { Component } from 'react'
import './index.css'

class WhyMe extends Component {
    mappedPoints = () => {
        const points = [{
            text: 'Through my professional experience at IBM since June 2018, I know how to learn quickly on the job, lead projects, and work with a team.',
            image: 'whyMeIBM'
        }, {
            text: 'Freelance web development since April 2018 has taught me how to work independently, manage a project, and communicate with clients.',
            image: 'whyMeFreelance'
        }, {
            text: 'While studying at UC Berkeley, I learned the value of hard work, focus, and organization; optimism and humor were also essential.',
            image: 'whyMeBerkeley'
        }, {
            text: "I've spent a year leading, managing, training, and coaching teams of up to 20 people while volunteering in Brazil.",
            image: 'whyMeBrazil'
        }]

        return points.map((point, index) => {
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
    }



    render() {
        return (
            <div className="whyMe" id="whyMe" ref={this.props.refs.whyMe}>
                <div className="banner"></div>
                <div className="flex">
                    <h1>Why Me?</h1>
                    <div className="points">
                        {this.mappedPoints()}
                    </div>
                </div>
            </div>
        );
    }
}

export default WhyMe;
