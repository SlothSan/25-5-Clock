const Timer = (props) => {
    return (
        <p id={props.id} className={"time-left"}>{props.sessionLength}</p>
    )
}

export default Timer