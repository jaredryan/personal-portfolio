import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Thumbnail extends Component {
    render() {
        return(
            <div className="thumbnail" id={this.props.name}>
                <Link to={this.props.path}>
                    <div className="thumbnailImg">
                        <img src={this.props.imgURL} id={this.props.name} alt=""/>
                        <div className="thumbnailOverlay"></div>
                    </div>
                    <h3>{this.props.name}</h3>
                </Link>
            </div>
        );
    }
}

export default Thumbnail;
