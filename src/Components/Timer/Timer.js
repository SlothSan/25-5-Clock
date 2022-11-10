import {useEffect, useState} from "react";

const Timer = (props) => {

    const [displayTime, setDisplayTime] = useState('')

    useEffect(() => {
        setDisplayTime(props.timeLeft)
    }, [props.countdownTime, props.sessionLength, props.breakLength])

    return (
        <p id={props.id} className={"time-left"}>{displayTime}</p>
    )
}

export default Timer