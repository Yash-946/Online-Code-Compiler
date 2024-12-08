"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CalendarHeatmap, { HeatmapValue } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const HeatmapComponent: React.FC = () => {
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [dailyupdates, setDailyUpdates] = useState();
  const values = [
    { date: "2024-12-04", count: 1 },
    { date: "2024-12-05", count: 4 }
    // { date: "2024-11-03", count: 2 },
    // { date: "2024-11-04", count: 3 },

  ];

  // useEffect(() => {
  //   async function getdailyupdates() {
  //     const response = await axios.get(
  //       `/api/dashboard/dailyupdate?userID=${userID}`
  //     );
  //     const data = response.data;
  //     console.log("dailyupdatedata", data);
  //   }
  //   getdailyupdates();
  // }, []);

  const today = new Date();

  // Calculate the start date as January 1st of the current year
  const startDate = new Date(today.getFullYear(), 0, 1); // Month is 0-indexed, so 0 = January

  // Calculate the end date as December 31st of the current year
  const endDate = new Date(today.getFullYear(), 11, 31);

  const getTooltipDataAttrs = (value:HeatmapValue) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return {};
    }
    console.log("getTooltipDataAttrs",value)
    // Configuration for react-tooltip
    return {
      'data-tip': `${value.date} has count: ${value.count}`,
    };
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-primary rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-black">
        Contribution Activity
      </h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return "color-empty"; // For no activity
            }
            if (value.count === 1) {
              return "color-scale-1"; // Light green
            }
            if (value.count === 2) {
              return "color-scale-2"; // Medium green
            }
            if (value.count === 3) {
              return "color-scale-3"; // Darker green
            }
            return "color-scale-4";   // Very dark green
          }}
          tooltipDataAttrs={getTooltipDataAttrs}
          showWeekdayLabels
        />
      </div>

      {/* Legend Section */}
      <div className="legend flex justify-center items-center mt-6">
        <span className="text-sm text-gray-500 mr-2">Less</span>
        {[0, 1, 2, 3, 4].map((scale) => (
          <div
            key={scale}
            className={`w-6 h-6 mr-2 rounded-full bg-gradient-to-t from-green-200 to-green-${
              (scale + 1) * 100
            }`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-2">More</span>
      </div>
    </div>
  );
};

export default HeatmapComponent;
