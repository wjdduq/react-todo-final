// id, text, completed
function TodoItem(props) {

    // 상속받은 메서드를 사용하여 지정된 id 항목을 삭제하는 메서드 선언
    function handleDelete() {
        props.onDelete(props.item.id)
    }

    // 상속받은 메서드를 사용하여 체크박스 토글 컨트롤하는 메서드 선언
    function handleToggle() {
        const newCompleted = !props.item.completed;
        props.onUpdate(props.item.id, { completed: newCompleted });
    }

    // 현재 날짜와 일정간의 차이를 계산하여 리턴해주는 메서드 선언
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