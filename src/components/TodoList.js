import TodoItem from "./TodoItem.js"

function TodoList(props) {

    return (
        <div>
            <ul>
                {props.items.map((item, index) => (
                    <li key={index}>
                        <TodoItem item={item} onUpdate={props.onUpdate} onDelete={props.onDelete}/>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TodoList;