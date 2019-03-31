import React from 'react'

import Navbar from './Components/Navbar'
import Intro from './Sections/Intro'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'

const App = () => {

    // <div>
    //     <Navbar />
    //     <Intro />
    //     <WhyMe />
    //     <Resume />
    //     <Projects />
    // </div>

    return (
        <div>
            <Navbar />
            <Intro />
            <WhyMe />
            <Resume />
        </div>
    )
}

export default App;
