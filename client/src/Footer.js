import React, {Component} from 'react'

class Footer extends Component {
    render(){
        return(
            <footer>
                <div>
                    <div className="footerGrid">
                        <div className="border1"></div><h3>Connect with Me!</h3><div className="border2"></div>
                    </div>
                    <a href="https://github.com/jaredryan"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/jared-m-ryan/"><i className="fa fa-linkedin"></i></a>
                    <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i className="fa fa-envelope"></i></a>
                    <a href="https://www.facebook.com/jared.ryan.94"><i className="fa fa-facebook-square"></i></a>
                </div>
            </footer>
        );
    }
}

export default Footer;
