import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastChart = ({ dailyData }) => {
    console.log(dailyData);

    const labels = dailyData.map(day => day.title); 
    const temperatures = dailyData.map(day => day.temp);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Daily Temperature',
                data: temperatures,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'black', 
                    font: {
                        weight: 'bold',
                        size: 16, 
                    },
                },
            },
            title: {
                display: true,
                text: '5-Day Temperature Forecast',
                color: 'black', 
                font: {
                    weight: 'bold',
                    size: 20, 
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: 'black', 
                    font: {
                        weight: 'bold',
                        size: 18, 
                    },
                },
                ticks: {
                    color: 'black', 
                    font: {
                        weight: 'bold',
                        size: 14,
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.5)', 
                    lineWidth: 1, 
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Days',
                    color: 'black', 
                    font: {
                        weight: 'bold',
                        size: 18, 
                    },
                },
                ticks: {
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 14, 
                    },
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.5)', 
                    lineWidth: 1, 
                },
            },
        },
    };

    return (
        <div className="forecast-chart w-full max-w-2xl mx-auto text-black font-bold">
            <Line data={data} options={options} />
        </div>
    );
};

export default ForecastChart;
