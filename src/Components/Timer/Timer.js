const Timer = (props) => {

    return (
        <p id={props.id} className={"time-left"}>{props.timeLeft}</p>
    )
}

export default Timer