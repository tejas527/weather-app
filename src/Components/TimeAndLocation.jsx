import React, { useState, useEffect } from "react";
import { DateTime } from "luxon"; // Using Luxon for handling date and time

const TimeAndLocation = ({ weather: {formattedLocalTime, name,country },}) => {

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-medium">
            {formattedLocalTime}
            </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
