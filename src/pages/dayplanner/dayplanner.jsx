import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/navbar/nav";
import AddItem from "../../components/addplanneritem/addplanneritem";
import Times from "../../components/times/times";
import { useParams } from "react-router-dom";
import config from "../../config.js";

const DayPlanner = () => {
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState({
    start: { hours: 0, minutes: 0, am: "am" },
    end: { hours: 0, minutes: 0, am: "am" },
  });
  const [taskEditor, setTaskEditor] = useState(false);
  const [task, setTask] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/dayplanner/` + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(...tasks, data);
        console.log(data);
      });
  }, []);

  const addTaskToDB = (task) => {
    fetch(`${config.apiBaseUrl}/dayplanner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  //add task to planner
  const AddTask = () => {
    const newTask = {
      taskname: taskName,
      user: params.id,
      starttime: `${time.start.hours} ${time.start.minutes} ${time.start.am}`,
      endtime: `${time.end.hours} ${time.end.minutes} ${time.end.am}`,
      notes: notes,
      dayplanner_id: Math.floor(Math.random() * 100),
    };
    if (newTask.name === "") {
      alert("Please fill out all fields");
      return;
    }
    if (newTask.starttime.hours === 12 && newTask.starttime.am === "am") {
      newTask.starttime.hours = 0;
    }
    setTasks([...tasks, newTask]);
    setAddTask(false);
    addTaskToDB(newTask);
  };

  const changeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const changeStartHours = (e) => {
    setTime({ ...time, start: { ...time.start, hours: e.target.value } });
  };

  const changeStartMinutes = (e) => {
    setTime({ ...time, start: { ...time.start, minutes: e.target.value } });
  };

  const changeStartAM = (e) => {
    const am = e.target.value === "am" ? "am" : "pm";
    setTime({ ...time, start: { ...time.start, am: am } });
  };

  const changeEndHours = (e) => {
    setTime({ ...time, end: { ...time.end, hours: e.target.value } });
  };

  const changeEndMinutes = (e) => {
    setTime({ ...time, end: { ...time.end, minutes: e.target.value } });
  };

  const changeEndAM = (e) => {
    const am = e.target.value === "am" ? "am" : "pm";
    setTime({ ...time, end: { ...time.end, am: am } });
  };

  const addNotes = (e) => {
    setNotes(e.target.value);
  };

  const editTask = (task) => {
    setTaskEditor(!taskEditor);
    setTask(task);
  };

  const deleteTask = (id) => {
    fetch(`${config.apiBaseUrl}/dayplanner/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Fragment>
      <Navbar />
      <h1 className="planner-header">Day Planner</h1>
      <div className="today">
        <h2>Today</h2>
        <button
          className="add-btn"
          id="addTask"
          onClick={() => {
            setAddTask(!addTask);
          }}
        >
          +
        </button>
        <div className="today-tasks">
          {addTask ? (
            <AddItem
              AddItem={AddTask}
              changeTaskName={(e) => changeTaskName(e)}
              addNotes={(e) => addNotes(e)}
              changeStartHours={(e) => changeStartHours(e)}
              changeStartMinutes={(e) => changeStartMinutes(e)}
              changeStartAM={(e) => changeStartAM(e)}
              changeEndHours={(e) => changeEndHours(e)}
              changeEndMinutes={(e) => changeEndMinutes(e)}
              changeEndAM={(e) => changeEndAM(e)}
            />
          ) : null}
        </div>
        <div className="task-container">
          <Times tasks={tasks} editTask={editTask} />
        </div>
        <div className="task-editor">
          {taskEditor ? (
            <div>
              <h1>{task.taskname}</h1>
              <p>{task.notes}</p>
              <p>
                {task.starttime} - {task.endtime}
              </p>
              <button
                onClick={() => {
                  deleteTask(task.dayplanner_id);
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default DayPlanner;
