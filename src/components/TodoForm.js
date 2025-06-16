import {useState} from "react";

function TodoForm(props) {
    /**
     * props: {
     * onCreate: function...
     * }
     */
    const [newTodoText, setNewTodoText] = useState("");
    const [newTodoDate, setNewTodoDate] = useState("");

    function handleTextChange(event) {
        setNewTodoText(event.target.value);
    }

    function handleDateChange(event) {
        setNewTodoDate(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: Date.now(), 
            text: newTodoText, 
            completed: false, 
            dead: newTodoDate
        }
        
        props.onCreate(data);
        setNewTodoDate("");
        setNewTodoText("");
    }
    return (
        <div>
            <h1>TODO LIST</h1>
            <form onSubmit={handleSubmit}>
                <input type="date" onChange={handleDateChange} value={newTodoDate}></input>
                <input type="text" onChange={handleTextChange} value={newTodoText}></input>
                <button type="submit">추가</button>
            </form>
        </div>
    );

}

export default TodoForm;