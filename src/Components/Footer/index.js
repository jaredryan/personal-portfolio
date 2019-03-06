import React, { Component } from 'react';
import './index.css';

class Footer extends Component {
    render(){
        return(
            <footer>
                <div>
                    <div className="footerGrid">
                        <div className="border1"></div><h3>Connect</h3><div className="border2"></div>
                    </div>
                    <a href="https://github.com/jaredryan"><i className="fa fa-github" style={{fontSize: "28px", fontWeight: 100}}></i></a>
                    <a href="https://www.linkedin.com/in/jared-m-ryan/"><i className="fa fa-linkedin" style={{fontSize: "28px", fontWeight: 100}}></i></a>
                    <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope" style={{fontSize: "28px", fontWeight: 100}}></i></a>
                </div>
            </footer>
        );
    }
}

export default Footer;
