"use client";

import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const HeatmapComponent: React.FC = () => {
  const today = new Date();
  const values = [
    { date: "2024-11-01", count: 1 },
    { date: "2024-11-02", count: 4 },
    { date: "2024-11-03", count: 2 },
    { date: "2024-11-04", count: 3 },
    // Add more values here to populate the heatmap
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-black">
        Contribution Activity
      </h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={new Date(today.getFullYear(), today.getMonth() - 11, 1)}
          endDate={today}
          values={values}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return "bg-white";
            }
            if (value.count > 4) {
              return "bg-green-600";
            }
            return `bg-green-${value.count * 100}`;
          }}
          showWeekdayLabels
        />
      </div>

      {/* Legend Section */}
      <div className="legend flex justify-center items-center mt-6">
        <span className="text-sm text-gray-500 mr-2">Less</span>
        {[0, 1, 2, 3, 4].map((scale) => (
          <div
            key={scale}
            className={`w-6 h-6 mr-2 rounded-full bg-gradient-to-t from-green-100 to-green-${(scale + 1) * 100}`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-2">More</span>
      </div>
    </div>
  );
};

export default HeatmapComponent;
