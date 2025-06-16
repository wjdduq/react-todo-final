// id, text, completed
function TodoItem(props) {

    function handleDelete() {
        props.onDelete(props.item.id)
    }

    function handleToggle() {
        const newCompleted = !props.item.completed;
        props.onUpdate(props.item.id, { completed: newCompleted });
    }

    function handleDead() {
        const deadLineDate = new Date(props.item.dead);
        const today = new Date();
        const diffTime = deadLineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isDeadlineClose = diffDays <= 2 && diffDays >= 0;
        return isDeadlineClose;
    }



    return (
        <div className="todo-items">
            <p style={{ color: handleDead() ? "red" : "black", fontWeight: handleDead() ? "bold" : "" }}>{props.item.dead}</p>
            {handleDead() && <span style={{ marginLeft: "8px", fontWeight: "bold", color: "red" }}>마감임박!!</span>}
            <p>{props.item.text}</p>
            <p style={{ "color": props.item.completed ? "green" : "black" }}>완료 여부: {props.item.completed ? "완료" : "미완료"}</p>
            <div className="todo-item-buttons">
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={props.item.completed}
                        onChange={handleToggle}
                        style={{ width: "18px", height: "18px" }}
                    />
                    {props.item.completed ? "완료" : "미완료"}
                </label>
                <button className="item-btn" onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );

}

export default TodoItem;