import React from 'react';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';




const Chart = ({stats}) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
       const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Last Month User Registration'
          },
        },
      };
      
      const labels = ['Week1', 'Week2', 'Week3', 'Week4'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Users',
            data: stats,
            backgroundColor: '#57c84d',
            barThickness: 50, 
          }
        ],
      };
      



    return (
        <div>
             <Bar options={options} data={data} />;
            
        </div>
    );
}

export default Chart;

