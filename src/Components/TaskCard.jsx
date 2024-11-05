import React, { useEffect, useState } from "react";

function TaskCard({
  details,
  propsDetails,
  setAllTodoTasks,
  edit,
  btnDisable,
  setBtnDisable,
}) {
  const [delIndex, setDelIndex] = useState("");
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [isCompleteAlert, setIsCompleteAlert] = useState(false);

  function handleDelete() {
    let filterData = details.filter((val, index) => {
      return delIndex !== index;
    });
    setAllTodoTasks(filterData);
    localStorage.setItem("todolist",JSON.stringify(filterData));
    setDeleteBtn(false);
  }

  function editHandle(value, index) {
    propsDetails(value, index);
  }

  function handleComplete() {
    localStorage.setItem('todolist', JSON.stringify(details));
  }

  return (
    <div>
      {details && details.length !== 0 &&
        details.map((val, index) => (
          <div key={index} className="card">
            <div className="cardelements">
              <div className="cardelements1">
                <div className="titledesc">
                  <span
                    className={
                      val.isComplete ? "completetasklstcard" : "tasklstcard"
                    }
                  >
                    {val.taskTitle}
                  </span>
                  <span
                    className={val.isComplete ? "completetaskCtg" : "taskCtg"}
                    style={{
                      color: val.isComplete ? "black" : "white",
                    }}
                  >
                    {val.taskCategory}
                  </span>
                </div>
                <div
                  className={val.isComplete ? "completetaskdesc" : "taskdesc"}
                >
                  <p>{val.taskDescription}</p>
                </div>
              </div>
              <div className="functionalbtn">
                {!val.isComplete && (
                  <div className={btnDisable ? "editdisable" : "editbtn"}>
                    <button
                      onClick={() => {
                        editHandle(val, index);
                        edit(false);
                        setBtnDisable(true);
                      }}
                      disabled={btnDisable}
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className={btnDisable ? "completedisable" : "completebtn"}>
                  {!val.isComplete && (
                    <button
                      onClick={() => {
                        setDelIndex(index);
                        setIsCompleteAlert(true);
                        edit(true);
                        setBtnDisable(true);
                      }}
                      disabled={btnDisable}
                    >
                      Complete
                    </button>
                  )}
                </div>
                <div className={btnDisable ? "deletedisable" : "deletebtn"}>
                  <button
                    onClick={() => {
                      setDeleteBtn(true);
                      setDelIndex(index);
                      edit(true);
                      setBtnDisable(true);
                    }}
                    disabled={btnDisable}
                  >
                    Delete
                  </button>
                  {deleteBtn === true && index === delIndex && (
                    <div className="deleteModal">
                      <div className="closebtn">
                        <button
                          className="close-btn"
                          onClick={() => {
                            setDeleteBtn(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          <ion-icon name="close"></ion-icon>
                        </button>
                      </div>
                      <div className="deletemsg">
                        <p>Are you sure!want to delete task?</p>
                      </div>
                      <div className="functbtn">
                        <button
                          onClick={() => {
                            handleDelete();
                            edit(false);
                            setBtnDisable(false);
                            val.isComplete = false;
                          }}
                        >
                          yes
                        </button>
                        <button
                          onClick={() => {
                            setDeleteBtn(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                  {isCompleteAlert === true && delIndex === index && (
                    <div className="completeModal">
                      <div className="closebtn">
                        <button
                          className="close-btn"
                          onClick={() => {
                            setIsCompleteAlert(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          <ion-icon name="close"></ion-icon>
                        </button>
                      </div>
                      <div className="completemsg">
                        <p>Are you sure!want to Complete task ? </p>
                      </div>
                      <div className="functbtn">
                        <button
                          onClick={() => {
                            val.isComplete = true;
                            setIsCompleteAlert(false);
                            edit(false);
                            setBtnDisable(false);
                            handleComplete();
                          }}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setIsCompleteAlert(false);
                            edit(false);
                            setBtnDisable(false);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskCard;
