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
      {props.tasks.map((task, index) => {
        return (
          <div
            key={index}
            className="daily-planner-item"
            style={{
              top:
                calculateTop(task.start.hours, task.start.am, task.end.am) +
                "px",
              height:
                calculateHeight(
                  task.start.hours,
                  task.end.hours,
                  task.start.am,
                  task.end.am
                ) + "px",
            }}
          >
            <p>{task.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Times;
