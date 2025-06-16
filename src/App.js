// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  // const [GETTER, SETTER] = useState()
  // 할 일 배열 선언 및 useState를 사용하여 상태 관리
  const [todos, setTodos] = useState(() => {
    // 로컬 스토리지에서 초기값 가져오기
    const savedTodos = localStorage.getItem('todos');
    //  localStorage에 있으면 쓰고 없으면 빈 배열로 초기화
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    // todos가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 일정을 추가하는 메서드 선언
  function createTodoItem(data) {
    // 입력칸에 아무것도 입력하지 않았을 경우 return
    if(!data.text.trim()) {
      alert("할일을 입력해주세요");
      return;
    }

    // 일정을 오늘이나 오늘보다 과거로 설정했을 경우 return
    const todoDate = new Date(data.dead);
    const nowDate = Date.now();
    if(!data.dead) {
      alert("날짜를 입력해주세요");
      return;
    } else if(todoDate < nowDate) {
      alert("일정을 현재보다 과거로 설정할 수 없음");
      return;
    }
    // 모든 조건에 이상이 없을 경우 setTodos
    // todos.push(data);
    // setTodos([...todos]);
    setTodos([...todos, data]);
    // console.log("createTodoItem", data);
    // console.log("datatype", typeof(data.dead))
    console.log("date", data.dead)


  }

  // 일정 삭제 메서드 선언
  function deleteTodoItem(id) {
    // 삭제 대상 일정의 id를 비교하여 일치하지 않는 것만 필터링해서 출력
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    /*
    const newTo = [];
    for (let i = 0; i < todos.length; i++) {
      if(todos[i].id !== id) {
        newTo.push(todos[i]);
      }
    }
    setTodos(newTo);
    */
  }

  // 일정 업데이트 메서드 선언
  function updateTodoItem(id, data) {
    // 일정 id를 비교하여 업데이트 대상 서치
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    // 찾을 수 없다면(return -1)
    if (todoIndex === -1) {
      alert("해당하는 항목이 없습니다");
      return;
    }
    // 찾은 항목에 업데이트된 데이터 삽입
    todos[todoIndex] = {...todos[todoIndex], ...data, id};
    setTodos([...todos]);

    /*
    // Array.map()을 사용한 방법
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, ...data, id};
      }
      return todo;
    });
    setTodos(newTodos);
    */
  }

  return (
    <div className="App">
      <TodoForm onCreate={createTodoItem}/>
      <TodoList items={todos} onDelete={deleteTodoItem} onUpdate={updateTodoItem}/>
    </div>
  );
}

export default App;
