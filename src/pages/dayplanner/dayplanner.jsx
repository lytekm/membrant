import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/navbar/nav";
import AddItem from "../../components/addplanneritem/addplanneritem";
import Times from "../../components/times/times";
import { useParams } from "react-router-dom";

const DayPlanner = () => {
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState({
    start: { hours: 0, minutes: 0, am: "am" },
    end: { hours: 0, minutes: 0, am: "am" },
  });

  //add task to planner
  const AddTask = () => {
    const newTask = {
      name: taskName,
      start: time.start,
      end: time.end,
      notes: notes,
    };
    if (newTask.name === "") {
      alert("Please fill out all fields");
      return;
    }
    if (newTask.start.hours === 12 && newTask.start.am === "am") {
      newTask.start.hours = 0;
    }
    setTasks([...tasks, newTask]);
    setAddTask(false);
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

  return (
    <Fragment>
      <Navbar />
      <h1 className="planner-header">Day Planner</h1>
      <div className="today">
        <h2>Today</h2>
        <button
          className="add-btn"
          onClick={() => {
            setAddTask(true);
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
          <Times tasks={tasks} />
        </div>
      </div>
    </Fragment>
  );
};

export default DayPlanner;
