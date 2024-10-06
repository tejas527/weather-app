import React from "react";

const Forecast = ({title,data}) => {

    const sampledata = [1, 2, 3, 4, 5];

    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="font-medium uppercase">{title}</p>
            </div>
            <hr className="my-1" />

            <div className="flex items-center justify-between">
                {data.map((d,index)=>(
                    <div 
                        key={index} 
                        className="flex flex-col items-center justify-center">
                            <p className="font-light text-sm">{d.title}</p>
                            <img src={d.icon} />
                            <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
};

export default Forecast;