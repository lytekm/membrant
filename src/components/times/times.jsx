import React, { useEffect, useState } from "react";

const Times = (props) => {
  const timeRefs = new Array(24).fill(0).map(() => React.createRef());
  const [offsets, setOffsets] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  // Function to calculate and set the offsetTop values
  const calculateOffsets = () => {
    const newOffsets = timeRefs.map((ref) => ref.current.offsetTop);
    setOffsets(newOffsets);
  };

  useEffect(() => {
    // Call calculateOffsets when the component mounts
    calculateOffsets();
  }, []);

  const onScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const hours = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];

  //calculate height of item
  const calculateHeight = (startTime, endTime, sAm, eAm) => {
    const startAm = sAm === "am" ? 0 : 12; //account for am/pm
    const endAm = eAm === "am" ? 0 : 12;
    console.log(sAm, eAm);
    const itemHeight =
      offsets[hours.indexOf(endTime) + endAm] -
      offsets[hours.indexOf(startTime) + startAm] -
      6; //account for border
    return itemHeight;
  };

  //calculate how far down to place item
  const calculateTop = (startingHour, sAm) => {
    const am = sAm === "am" ? 0 : 12; //account for am/pm
    return offsets[hours.indexOf(startingHour) + am] + 2 - scrollTop; //account for border
  };

  return (
    <div className="times" onScroll={(e) => onScroll(e)}>
      {timeRefs.map((ref, index) => {
        return (
          <span className="time" key={index}>
            <p>{hours[index]}</p>
            <div className="line" ref={ref}></div>
          </span>
        );
      })}
      {props.tasks.map((task) => {
        const starttime = task.starttime.split(" ");
        const endtime = task.endtime.split(" ");
        const start = {
          hours: starttime[0],
          minutes: starttime[1],
          am: starttime[2],
        };
        const end = {
          hours: endtime[0],
          minutes: endtime[1],
          am: endtime[2],
        };

        return (
          <div
            key={task.dayplanner_id}
            className="daily-planner-item"
            onClick={() => {
              props.editTask(task);
            }}
            style={{
              top: calculateTop(start.hours, start.am, end.am) + "px",
              height:
                calculateHeight(start.hours, end.hours, start.am, end.am) +
                "px",
            }}
          >
            <p>{task.taskname}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Times;
