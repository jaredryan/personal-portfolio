import React from 'react'
import './index.css'

const ProfilePic = (props) => {
    const containerStyle = {
        height: props.size,
        width: props.size,
        'min-width': props.size,
    }

    const scale = props.size / 1550

    const picStyle = {
        '-webkit-transform': `scale(${scale})`,
                'transform': `scale(${scale})`,
        '-moz-transform': `scale(${scale})`,
    }

    return (
        <div className="profilePic" style={containerStyle}>
            <div style={picStyle}></div>
        </div>
    )
}

export default ProfilePic
