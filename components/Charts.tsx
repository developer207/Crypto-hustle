import React from 'react'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, Legend } from 'chart.js'; 
Chart.register(CategoryScale, Legend);

interface props {
  historical: number[][],
  days: number
}
const Charts = ({ historical, days }: props) => {

  const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}


  return (
    <div>
      <Line
        data={{
          labels: historical.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
            // return '//'
          }),

          datasets: [
            {
              data: historical.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in INR`,
              borderColor: randColor(),
              borderWidth:1
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
            
          },
          
          
        }}

      />
    </div>
  )
}

export default Charts
