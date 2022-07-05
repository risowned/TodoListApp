//here two useState(toDoList) are set because once the search is set the
// fulltodo list gets modified and shorten. Then the other functionalities will be
// effective on the shorten list once the search bar is cleared. So, the second
//useState(toDoList) is used to get the full todolist once the search bar is cleared.
import "./App.css";
import React, { useEffect } from "react";
import ToDoList from "./components/ToDoList";
import Search from "./components/Search";
import AddToDo from "./components/AddToDo";
import WatchCount from "./components/WatchCount";

function App() {
  const [filterToDoList, setFilterToDoList] = React.useState([]);
  const [fullToDoList, setFullToDoList] = React.useState([]);
  const [arrLength, setArrLength] = React.useState(null);
  const onFilteredToDoListChange = (text) => {
    if (text) {
      setFilterToDoList(
        filterToDoList.filter((tododata) =>
          tododata.description.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setFilterToDoList(fullToDoList);
    }
  };
  const onAddTodoList = (task, time) => {
    const newId = parseInt(fullToDoList.length) + arrLength;
    const newObj = {
      id: "",
      description: "",
      deadline: "",
      taskCompletionStatus: "",
    };
    newObj.id = (newId + 1).toString();
    newObj.description = task;
    newObj.deadline = time;
    newObj.taskCompletionStatus = false;
    setFullToDoList([...fullToDoList, newObj]);
    setFilterToDoList([...fullToDoList, newObj]);
  };
  const onChangeCheckBox = (text) => {
    let checkedTaskCompletionStatus = false;
    fullToDoList.forEach((element) => {
      if (parseInt(element.id) === parseInt(text)) {
        console.log(fullToDoList);

        element.taskCompletionStatus =
          element.taskCompletionStatus === true ? false : true;
        checkedTaskCompletionStatus = element.taskCompletionStatus;
      }
    });
    setFilterToDoList([...fullToDoList]);
    setFullToDoList([...fullToDoList]);
    return checkedTaskCompletionStatus;
  };
  const onDeleteItem = (text) => {
    let newFullToDoList = fullToDoList.filter((element) => element.id !== text);
    setFilterToDoList([...newFullToDoList]);
    setFullToDoList([...newFullToDoList]);
  };
  const onUpdateItem = (id, description, deadline) => {
    fullToDoList.map((toDoItem) => {
      if (toDoItem.id === id) {
        toDoItem.description = description;
        toDoItem.deadline = deadline;
      }
    });
    setFilterToDoList([...fullToDoList]);
    setFullToDoList([...fullToDoList]);
    return "Update";
  };

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setArrLength(data.length);
          data.forEach((e) => (e.taskCompletionStatus = false));
          setFilterToDoList(data);
          setFullToDoList(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="App">
      <WatchCount />

      <Search onFilteredToDoListChange={onFilteredToDoListChange} />

      <AddToDo onAddTodoList={onAddTodoList} />
      <ToDoList
        toDoListDataSource={filterToDoList}
        onChangeCheckBox={onChangeCheckBox}
        onDeleteItem={onDeleteItem}
        onUpdateItem={onUpdateItem}
      />
    </div>
  );
}

export default App;
