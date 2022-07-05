import React from "react";

function AddToDo(props) {
  const [task, setTask] = React.useState("");
  const [time, setTime] = React.useState(null);
  return (
    <div className="addNewToDo">
      <b>new todo</b>
      <input type="text" onChange={(e) => setTask(e.target.value)} />
      <b>deadline</b>
      <input type="date" onChange={(e) => setTime(e.target.value)} />
      <button onClick={(e) => props.onAddTodoList(task, time)}>Add todo</button>
    </div>
  );
}

export default AddToDo;
