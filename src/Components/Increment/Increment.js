const Increment = (props) => {

    const handleIncrementClick = () => {
        if (props.id === "break-increment") {
            if (props.breakLength < 60 && !props.isTimerRunning) {
                props.setBreakLength(props.breakLength + 1)
            }
        } else {
            if (props.sessionLength < 60 && !props.isTimerRunning) {
                props.setSessionLength(props.sessionLength + 1)
            }
        }
    }

    return (
        <i className="fa-solid fa-arrow-up fa-2xl" id={props.id} onClick={handleIncrementClick}></i>
    )
}

export default Increment