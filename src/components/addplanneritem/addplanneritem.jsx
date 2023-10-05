import React from "react";

const AddItem = (props) => {
  const selectOnScroll = (e) => {
    e.target.selectedIndex += e.deltaY > 0 ? 1 : -1;
  };

  return (
    <div className="add-item" id="addTaskModal">
      <input
        type="text"
        placeholder="Add Task"
        onChange={props.changeTaskName}
      />
      <textarea placeholder="Add Notes" onChange={props.addNotes} />
      <div className="add-time">
        <label>Start Time</label>
        <select onChange={props.changeStartHours}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
        <select onChange={props.changeStartMinutes}>
          <option>00</option>
          <option>15</option>
          <option>30</option>
          <option>45</option>
        </select>
        <select onChange={props.changeStartAM}>
          <option>am</option>
          <option>pm</option>
        </select>
        <label>End Time</label>
        <select onChange={props.changeEndHours}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
        <select onChange={props.changeEndMinutes}>
          <option>00</option>
          <option>15</option>
          <option>30</option>
          <option>45</option>
        </select>
        <select onChange={props.changeEndAM}>
          <option>am</option>
          <option>pm</option>
        </select>
      </div>
      <button className="add-item-btn" onClick={props.AddItem}>
        Add
      </button>
    </div>
  );
};

export default AddItem;
