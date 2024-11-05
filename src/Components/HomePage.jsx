import React, { useEffect, useState } from "react";
import "./ToDo.css";
import TaskCard from "./TaskCard";

function HomePage() {
  const [taskDetails, setTaskDetails] = useState({
    id: "",
    taskTitle: "",
    taskCategory: "",
    taskDescription: "",
    isComplete:false
  });
  const [allTodoTasks, setAllTodoTasks] = useState([]);
  const [isTodo, setIsTodo] = useState(false);
  const [category, setCategory] = useState([
    { value: "default", checked: false },
    { value: "Personal", checked: false },
    { value: "Official", checked: false },
    { value: "Travel", checked: false },
    { value: "PhysicalHealth", checked: false },
  ]);
  const [editIndex, SetEditIndex] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [descriptionAlert, setDescriptionAlert] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [localSave,setLocalSave]=useState([]);


  async function handleEvent(e) {
    if (e.target.name === "tasktitle") {
      setTaskDetails({
        ...taskDetails,
        taskTitle: e.target.value.slice(0, 20),
      });
    } else if (e.target.name === "taskCategory") {
      setTaskDetails({
        ...taskDetails,
        taskCategory: e.target.value === "default" ? "" : e.target.value,
      });
    } else if (e.target.name === "taskDescription") {
      setTaskDetails({
        ...taskDetails,
        taskDescription: e.target.value.slice(0, 101),
      });
    }
  }
  useEffect(() => {
    
    const storedTodoList = localStorage.getItem('todolist');
    const localTodoList = storedTodoList ? JSON.parse(storedTodoList) : [];
    
    if (localSave.length > 0) 
    {
      const updatedTodoList = [...localTodoList,...localSave];
      localStorage.setItem('todolist', JSON.stringify(updatedTodoList));
      setAllTodoTasks(updatedTodoList)
    } 
    else 
    {
      setAllTodoTasks(localTodoList)
    }
 
  }, [localSave]);

  function submitHandle() {
  
    if (isTodo &&taskDetails.taskDescription === "") {
    
      setDescriptionAlert(true);
    }
    if (editIndex === "" && taskDetails.taskDescription !== "") {
      let value = {
        id: localSave.length + 1,
        taskTitle: taskDetails.taskTitle,
        taskCategory: taskDetails.taskCategory,
        taskDescription: taskDetails.taskDescription,
        isComplete:taskDetails.isComplete
      };
      setLocalSave([...localSave, value]);
      setDescriptionAlert(false);
      setBtnDisable(false);
      setIsTodo(false);
      setTaskDetails({
        taskTitle: "",
        taskCategory: "",
        taskDescription: "",
      });
    } else if (editIndex!==""&taskDetails.taskDescription !== "") {
      (allTodoTasks[editIndex].id = taskDetails.id),
      (allTodoTasks[editIndex].taskTitle = taskDetails.taskTitle);
      allTodoTasks[editIndex].taskCategory = taskDetails.taskCategory;
      allTodoTasks[editIndex].taskDescription = taskDetails.taskDescription;
      allTodoTasks[editIndex].isComplete=taskDetails.isComplete;

      localStorage.setItem("todolist",JSON.stringify([...allTodoTasks]));
      setDescriptionAlert(false);
      setBtnDisable(false);
      setIsTodo(false);
      setTaskDetails({
        taskTitle: "",
        taskCategory: "",
        taskDescription: "",
      });
      SetEditIndex("");
    }
  }


  function handleEditChild(cardDetails, index) {
    setTaskDetails(cardDetails);
    SetEditIndex(index);
  }

  return (
    <div>
      <div className="OuterBox">
        <div className="header">
          <h2>My Todos</h2>
        </div>
      </div>
      <div className="tasksection">
        <div className="taskinput">
          <div className="task1">
            <div className="tasktitle">
              <label>Title:</label>
              <input
                type="text"
                name="tasktitle"
                value={taskDetails.taskTitle}
                onChange={handleEvent}
                disabled={isEdit}
              ></input>
              {isAdd && taskDetails.taskTitle === "" && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  Please Enter the Title
                </span>
              )}
            </div>
            <div className="taskCategory">
              <label>Category:</label>
              <select
                name="taskCategory"
                id="category"
                value={taskDetails.taskCategory}
                onChange={handleEvent}
                disabled={isEdit}
              >
                {category.map((Val, index) => {
                  return (
                    <option value={Val.value} key={index}>
                      {Val.value === "default"
                        ? "Select a category"
                        : Val.value}
                    </option>
                  );
                })}
              </select>
              {isAdd && taskDetails.taskCategory === "" && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  Please Select the Title
                </span>
              )}
            </div>
          </div>

          <div className={isEdit ? "addbtndisable" : "addbtn"}>
            <button
              onClick={() => {
                setIsAdd(true);
                taskDetails.taskTitle !== "" &&
                taskDetails.taskCategory !== "" &&
                setIsTodo(true);
              }}
              disabled={isEdit}
            >
            Add Todo
            </button>
          </div>
        </div>
        {isTodo &&
          taskDetails.taskTitle !== "" &&
          taskDetails.taskCategory !== "" && (
            <div className="modal">
              <div className="closebutton">
                <button
                  className="close-btn"
                  onClick={() => {
                    setIsTodo(false);
                    setIsAdd(false);
                  }}
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </div>
              <div className="textarea">
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Description</label>
                  <textarea
                    name="taskDescription"
                    value={taskDetails.taskDescription}
                    onChange={handleEvent}
                  ></textarea>
                  {descriptionAlert && taskDetails.taskDescription === "" && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontWeight: "500",
                      }}
                    >
                      Please Enter the taskDescription
                    </div>
                  )}
                </div>
                <div className="Submitbtn">
                  <button
                    onClick={() => {
                      submitHandle();
                      setIsAdd(false);
                    }}
                  >
                  Submit
                  </button>
                  <button
                    onClick={() => {
                      setIsTodo(false);
                      setIsAdd(false);
                    }}
                  >
                  Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
      <TaskCard
        details={allTodoTasks}
        propsDetails={handleEditChild}
        setAllTodoTasks={setAllTodoTasks}
        edit={setIsEdit}
        btnDisable={btnDisable}
        setBtnDisable={setBtnDisable}
      />
    </div>
  );
}

export default HomePage;
