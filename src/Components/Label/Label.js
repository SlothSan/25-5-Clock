const Label = (props) => {
    return (
        <p className={"label"} id={props.id}>{props.text ? props.text : props.workTime ? "Session" : "Break"}</p>
    )
}

export default Label