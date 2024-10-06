// ForecastChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastChart = ({ dailyData }) => {
    // Prepare data for the chart
    const labels = dailyData.map(day => day.title); // Day titles (e.g., Mon, Tue)
    const temperatures = dailyData.map(day => day.temp); // Daily temperatures

    // Chart data structure
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

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: '5-Day Temperature Forecast',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Days',
                },
            },
        },
    };

    return (
        <div className="forecast-chart">
            <Line data={data} options={options} />
        </div>
    );
};

export default ForecastChart;
