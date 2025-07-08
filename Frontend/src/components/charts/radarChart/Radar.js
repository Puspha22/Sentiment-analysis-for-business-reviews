import React, { useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { UserData } from "../../../assets/dummyData/dummy";

const RadarChart = () => {
    const [userData, setUserData] = useState({
        // labels is just a list of all the labels that represents the year
        labels: UserData.map((user) => user.year),
        datasets: [
          {
            label: "User Lost",
            data: UserData.map((user) => user.userLost),
            backgroundColor: ["red", "orange", "lightgreen", "green", "red"],
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            pointHoverBackgroundColor: "skyblue",
            pointHoverBorderColor: "red",
            fill: true,
          },
          {
            label: "User Gained",
            data: UserData.map((user) => user.userGain),
    
            backgroundColor: ["orange", "#c4b6b6", "lightgreen", "green", "red"],
            borderColor: "rgba(75,192,192,1)",
    
            borderWidth: 2,
            pointHoverBackgroundColor: "skyblue",
            pointHoverBorderColor: "red",
            pointBorderWidth: 1,
            steppedLine: true,
            // fill: true,
          },
        
        ],
      });
  return (
    <div>
        <Radar  
      data={userData}
        
        />
    </div>
  )
}

export default RadarChart