const Decrement = (props) => {

    const handleDecrementClick = () => {
        if (props.id === "break-decrement") {
            if (props.breakLength > 1 && !props.isTimerRunning) {
                props.setBreakLength(props.breakLength - 1)
            }
        } else {
            if (props.sessionLength > 1 && !props.isTimerRunning) {
                props.setSessionLength(props.sessionLength - 1)
            }
        }
    }

    return (
        <i className="fa-solid fa-arrow-down fa-2xl" id={props.id} onClick={handleDecrementClick}></i>
    )
}

export default Decrement