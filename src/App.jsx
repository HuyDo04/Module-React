import { useState, useEffect } from 'react'
import './App.css'

 function App() {
  const [todo, setTodo] = useState("");

  const [listItem, setListItem] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [toggle, setToggle] = useState(
    ()=> JSON.parse(localStorage.getItem("status")) || []
  ); 

   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(listItem));
    }, [listItem]);

    useEffect (() => {
      localStorage.setItem("status", JSON.stringify(toggle));
    }, [toggle])
  const checkTodo = (t) => {
 
    if(t === "") {
      alert("Vui lòng nhập todo hợp lệ");
      setTodo("");
      return false
    }

    if(t.length > 250) {
      alert("Todo nhập không được quá 250 ký tự")
      setTodo("");
      return false
    }

    if(listItem.includes(t)) {
      alert("Todo đã tồn tại");
      setTodo("");
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!todo.trim()) {
      alert("Không được để trống");
      setTodo("");
      return 
    }
    if(!checkTodo(todo)) return;
    setListItem([todo, ...listItem])
    setTodo("");
  }

  const handleEdit = (index) => {
    const newTodo = window.prompt("Sửa công việc:", listItem[index]).trim();
    if (newTodo === null) return;

    if(newTodo === listItem[index]) { 
      return
    }

    if (!checkTodo(newTodo)) {
        return handleEdit(index); 
    }
  
    const updatedList = [...listItem];
    updatedList[index] = newTodo;
    setListItem(updatedList);
};
  
  const toggleTodo = (index) => {
    setToggle({
      ...toggle,
      [index] : !toggle[index],
    })
  };

   const handleDelete = (index) => {
    if(confirm("Bạn có muốn xóa ?")) {
      const newList =  listItem.filter((item,i) => i !== index);
      console.log(newList)
      setListItem(newList);
      setTodo("");
    }
 }
  return (
    <>
    <main>
      <h1 className="page-heading">Create your Todo-List</h1>

      <form action="" className="todo-form">
        <input
          type="text"
          id="todo-input"
          className="input"
          placeholder="What are your tasks for today?"
          spellcheck="false"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button id="submit" className="submit-btn" 
          onClick={handleSubmit}
          onMouseDown = {(e) => {
            e.preventDefault();
          }}
        >
          Add
        </button>
      </form>

      <ul id="task-list" className="task-list">
        {listItem.map((item, i) => (
          <li key={i} className={`task-item ${toggle[i] ? "completed" : ""}`}>
           <span className={`task-title ${toggle[i] ? "done" : ""}`}>
            {item}
          </span>

            <div className="task-action">
                <button type='text' className="task-btn edit"
                  onClick={() => {
                    handleEdit(i);
                  }}
                >Edit
                
                </button>
                <button className="task-btn"  onClick={() => {toggleTodo(i) }}>{toggle[i] ? "Mark as undone" : "Mark as done"}</button>
                <button className="task-btn delete" onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </li>
        ))}

      </ul>
    </main>
    </>
  );
}

export default App;