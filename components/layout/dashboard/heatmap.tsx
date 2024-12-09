"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface HeatmapValue {
  date: string;
  count: number;
}

const dates = [
  {
    date: "2024-01-01",
    count: 0,
  },
  {
    date: "2024-01-02",
    count: 0,
  },
  {
    date: "2024-01-03",
    count: 0,
  },
  {
    date: "2024-01-04",
    count: 0,
  },
  {
    date: "2024-01-05",
    count: 0,
  },
  {
    date: "2024-01-06",
    count: 0,
  },
  {
    date: "2024-01-07",
    count: 0,
  },
  {
    date: "2024-01-08",
    count: 0,
  },
  {
    date: "2024-01-09",
    count: 0,
  },
  {
    date: "2024-01-10",
    count: 0,
  },
  {
    date: "2024-01-11",
    count: 0,
  },
  {
    date: "2024-01-12",
    count: 0,
  },
  {
    date: "2024-01-13",
    count: 0,
  },
  {
    date: "2024-01-14",
    count: 0,
  },
  {
    date: "2024-01-15",
    count: 0,
  },
  {
    date: "2024-01-16",
    count: 0,
  },
  {
    date: "2024-01-17",
    count: 0,
  },
  {
    date: "2024-01-18",
    count: 0,
  },
  {
    date: "2024-01-19",
    count: 0,
  },
  {
    date: "2024-01-20",
    count: 0,
  },
  {
    date: "2024-01-21",
    count: 0,
  },
  {
    date: "2024-01-22",
    count: 0,
  },
  {
    date: "2024-01-23",
    count: 0,
  },
  {
    date: "2024-01-24",
    count: 0,
  },
  {
    date: "2024-01-25",
    count: 0,
  },
  {
    date: "2024-01-26",
    count: 0,
  },
  {
    date: "2024-01-27",
    count: 0,
  },
  {
    date: "2024-01-28",
    count: 0,
  },
  {
    date: "2024-01-29",
    count: 0,
  },
  {
    date: "2024-01-30",
    count: 0,
  },
  {
    date: "2024-01-31",
    count: 0,
  },
  {
    date: "2024-02-01",
    count: 0,
  },
  {
    date: "2024-02-02",
    count: 0,
  },
  {
    date: "2024-02-03",
    count: 0,
  },
  {
    date: "2024-02-04",
    count: 0,
  },
  {
    date: "2024-02-05",
    count: 0,
  },
  {
    date: "2024-02-06",
    count: 0,
  },
  {
    date: "2024-02-07",
    count: 0,
  },
  {
    date: "2024-02-08",
    count: 0,
  },
  {
    date: "2024-02-09",
    count: 0,
  },
  {
    date: "2024-02-10",
    count: 0,
  },
  {
    date: "2024-02-11",
    count: 0,
  },
  {
    date: "2024-02-12",
    count: 0,
  },
  {
    date: "2024-02-13",
    count: 0,
  },
  {
    date: "2024-02-14",
    count: 0,
  },
  {
    date: "2024-02-15",
    count: 0,
  },
  {
    date: "2024-02-16",
    count: 0,
  },
  {
    date: "2024-02-17",
    count: 0,
  },
  {
    date: "2024-02-18",
    count: 0,
  },
  {
    date: "2024-02-19",
    count: 0,
  },
  {
    date: "2024-02-20",
    count: 0,
  },
  {
    date: "2024-02-21",
    count: 0,
  },
  {
    date: "2024-02-22",
    count: 0,
  },
  {
    date: "2024-02-23",
    count: 0,
  },
  {
    date: "2024-02-24",
    count: 0,
  },
  {
    date: "2024-02-25",
    count: 0,
  },
  {
    date: "2024-02-26",
    count: 0,
  },
  {
    date: "2024-02-27",
    count: 0,
  },
  {
    date: "2024-02-28",
    count: 0,
  },
  {
    date: "2024-02-29",
    count: 0,
  },
  {
    date: "2024-03-01",
    count: 0,
  },
  {
    date: "2024-03-02",
    count: 0,
  },
  {
    date: "2024-03-03",
    count: 0,
  },
  {
    date: "2024-03-04",
    count: 0,
  },
  {
    date: "2024-03-05",
    count: 0,
  },
  {
    date: "2024-03-06",
    count: 0,
  },
  {
    date: "2024-03-07",
    count: 0,
  },
  {
    date: "2024-03-08",
    count: 0,
  },
  {
    date: "2024-03-09",
    count: 0,
  },
  {
    date: "2024-03-10",
    count: 0,
  },
  {
    date: "2024-03-11",
    count: 0,
  },
  {
    date: "2024-03-12",
    count: 0,
  },
  {
    date: "2024-03-13",
    count: 0,
  },
  {
    date: "2024-03-14",
    count: 0,
  },
  {
    date: "2024-03-15",
    count: 0,
  },
  {
    date: "2024-03-16",
    count: 0,
  },
  {
    date: "2024-03-17",
    count: 0,
  },
  {
    date: "2024-03-18",
    count: 0,
  },
  {
    date: "2024-03-19",
    count: 0,
  },
  {
    date: "2024-03-20",
    count: 0,
  },
  {
    date: "2024-03-21",
    count: 0,
  },
  {
    date: "2024-03-22",
    count: 0,
  },
  {
    date: "2024-03-23",
    count: 0,
  },
  {
    date: "2024-03-24",
    count: 0,
  },
  {
    date: "2024-03-25",
    count: 0,
  },
  {
    date: "2024-03-26",
    count: 0,
  },
  {
    date: "2024-03-27",
    count: 0,
  },
  {
    date: "2024-03-28",
    count: 0,
  },
  {
    date: "2024-03-29",
    count: 0,
  },
  {
    date: "2024-03-30",
    count: 0,
  },
  {
    date: "2024-03-31",
    count: 0,
  },
  {
    date: "2024-04-01",
    count: 0,
  },
  {
    date: "2024-04-02",
    count: 0,
  },
  {
    date: "2024-04-03",
    count: 0,
  },
  {
    date: "2024-04-04",
    count: 0,
  },
  {
    date: "2024-04-05",
    count: 0,
  },
  {
    date: "2024-04-06",
    count: 0,
  },
  {
    date: "2024-04-07",
    count: 0,
  },
  {
    date: "2024-04-08",
    count: 0,
  },
  {
    date: "2024-04-09",
    count: 0,
  },
  {
    date: "2024-04-10",
    count: 0,
  },
  {
    date: "2024-04-11",
    count: 0,
  },
  {
    date: "2024-04-12",
    count: 0,
  },
  {
    date: "2024-04-13",
    count: 0,
  },
  {
    date: "2024-04-14",
    count: 0,
  },
  {
    date: "2024-04-15",
    count: 0,
  },
  {
    date: "2024-04-16",
    count: 0,
  },
  {
    date: "2024-04-17",
    count: 0,
  },
  {
    date: "2024-04-18",
    count: 0,
  },
  {
    date: "2024-04-19",
    count: 0,
  },
  {
    date: "2024-04-20",
    count: 0,
  },
  {
    date: "2024-04-21",
    count: 0,
  },
  {
    date: "2024-04-22",
    count: 0,
  },
  {
    date: "2024-04-23",
    count: 0,
  },
  {
    date: "2024-04-24",
    count: 0,
  },
  {
    date: "2024-04-25",
    count: 0,
  },
  {
    date: "2024-04-26",
    count: 0,
  },
  {
    date: "2024-04-27",
    count: 0,
  },
  {
    date: "2024-04-28",
    count: 0,
  },
  {
    date: "2024-04-29",
    count: 0,
  },
  {
    date: "2024-04-30",
    count: 0,
  },
  {
    date: "2024-05-01",
    count: 0,
  },
  {
    date: "2024-05-02",
    count: 0,
  },
  {
    date: "2024-05-03",
    count: 0,
  },
  {
    date: "2024-05-04",
    count: 0,
  },
  {
    date: "2024-05-05",
    count: 0,
  },
  {
    date: "2024-05-06",
    count: 0,
  },
  {
    date: "2024-05-07",
    count: 0,
  },
  {
    date: "2024-05-08",
    count: 0,
  },
  {
    date: "2024-05-09",
    count: 0,
  },
  {
    date: "2024-05-10",
    count: 0,
  },
  {
    date: "2024-05-11",
    count: 0,
  },
  {
    date: "2024-05-12",
    count: 0,
  },
  {
    date: "2024-05-13",
    count: 0,
  },
  {
    date: "2024-05-14",
    count: 0,
  },
  {
    date: "2024-05-15",
    count: 0,
  },
  {
    date: "2024-05-16",
    count: 0,
  },
  {
    date: "2024-05-17",
    count: 0,
  },
  {
    date: "2024-05-18",
    count: 0,
  },
  {
    date: "2024-05-19",
    count: 0,
  },
  {
    date: "2024-05-20",
    count: 0,
  },
  {
    date: "2024-05-21",
    count: 0,
  },
  {
    date: "2024-05-22",
    count: 0,
  },
  {
    date: "2024-05-23",
    count: 0,
  },
  {
    date: "2024-05-24",
    count: 0,
  },
  {
    date: "2024-05-25",
    count: 0,
  },
  {
    date: "2024-05-26",
    count: 0,
  },
  {
    date: "2024-05-27",
    count: 0,
  },
  {
    date: "2024-05-28",
    count: 0,
  },
  {
    date: "2024-05-29",
    count: 0,
  },
  {
    date: "2024-05-30",
    count: 0,
  },
  {
    date: "2024-05-31",
    count: 0,
  },
  {
    date: "2024-06-01",
    count: 0,
  },
  {
    date: "2024-06-02",
    count: 0,
  },
  {
    date: "2024-06-03",
    count: 0,
  },
  {
    date: "2024-06-04",
    count: 0,
  },
  {
    date: "2024-06-05",
    count: 0,
  },
  {
    date: "2024-06-06",
    count: 0,
  },
  {
    date: "2024-06-07",
    count: 0,
  },
  {
    date: "2024-06-08",
    count: 0,
  },
  {
    date: "2024-06-09",
    count: 0,
  },
  {
    date: "2024-06-10",
    count: 0,
  },
  {
    date: "2024-06-11",
    count: 0,
  },
  {
    date: "2024-06-12",
    count: 0,
  },
  {
    date: "2024-06-13",
    count: 0,
  },
  {
    date: "2024-06-14",
    count: 0,
  },
  {
    date: "2024-06-15",
    count: 0,
  },
  {
    date: "2024-06-16",
    count: 0,
  },
  {
    date: "2024-06-17",
    count: 0,
  },
  {
    date: "2024-06-18",
    count: 0,
  },
  {
    date: "2024-06-19",
    count: 0,
  },
  {
    date: "2024-06-20",
    count: 0,
  },
  {
    date: "2024-06-21",
    count: 0,
  },
  {
    date: "2024-06-22",
    count: 0,
  },
  {
    date: "2024-06-23",
    count: 0,
  },
  {
    date: "2024-06-24",
    count: 0,
  },
  {
    date: "2024-06-25",
    count: 0,
  },
  {
    date: "2024-06-26",
    count: 0,
  },
  {
    date: "2024-06-27",
    count: 0,
  },
  {
    date: "2024-06-28",
    count: 0,
  },
  {
    date: "2024-06-29",
    count: 0,
  },
  {
    date: "2024-06-30",
    count: 0,
  },
  {
    date: "2024-07-01",
    count: 0,
  },
  {
    date: "2024-07-02",
    count: 0,
  },
  {
    date: "2024-07-03",
    count: 0,
  },
  {
    date: "2024-07-04",
    count: 0,
  },
  {
    date: "2024-07-05",
    count: 0,
  },
  {
    date: "2024-07-06",
    count: 0,
  },
  {
    date: "2024-07-07",
    count: 0,
  },
  {
    date: "2024-07-08",
    count: 0,
  },
  {
    date: "2024-07-09",
    count: 0,
  },
  {
    date: "2024-07-10",
    count: 0,
  },
  {
    date: "2024-07-11",
    count: 0,
  },
  {
    date: "2024-07-12",
    count: 0,
  },
  {
    date: "2024-07-13",
    count: 0,
  },
  {
    date: "2024-07-14",
    count: 0,
  },
  {
    date: "2024-07-15",
    count: 0,
  },
  {
    date: "2024-07-16",
    count: 0,
  },
  {
    date: "2024-07-17",
    count: 0,
  },
  {
    date: "2024-07-18",
    count: 0,
  },
  {
    date: "2024-07-19",
    count: 0,
  },
  {
    date: "2024-07-20",
    count: 0,
  },
  {
    date: "2024-07-21",
    count: 0,
  },
  {
    date: "2024-07-22",
    count: 0,
  },
  {
    date: "2024-07-23",
    count: 0,
  },
  {
    date: "2024-07-24",
    count: 0,
  },
  {
    date: "2024-07-25",
    count: 0,
  },
  {
    date: "2024-07-26",
    count: 0,
  },
  {
    date: "2024-07-27",
    count: 0,
  },
  {
    date: "2024-07-28",
    count: 0,
  },
  {
    date: "2024-07-29",
    count: 0,
  },
  {
    date: "2024-07-30",
    count: 0,
  },
  {
    date: "2024-07-31",
    count: 0,
  },
  {
    date: "2024-08-01",
    count: 0,
  },
  {
    date: "2024-08-02",
    count: 0,
  },
  {
    date: "2024-08-03",
    count: 0,
  },
  {
    date: "2024-08-04",
    count: 0,
  },
  {
    date: "2024-08-05",
    count: 0,
  },
  {
    date: "2024-08-06",
    count: 0,
  },
  {
    date: "2024-08-07",
    count: 0,
  },
  {
    date: "2024-08-08",
    count: 0,
  },
  {
    date: "2024-08-09",
    count: 0,
  },
  {
    date: "2024-08-10",
    count: 0,
  },
  {
    date: "2024-08-11",
    count: 0,
  },
  {
    date: "2024-08-12",
    count: 0,
  },
  {
    date: "2024-08-13",
    count: 0,
  },
  {
    date: "2024-08-14",
    count: 0,
  },
  {
    date: "2024-08-15",
    count: 0,
  },
  {
    date: "2024-08-16",
    count: 0,
  },
  {
    date: "2024-08-17",
    count: 0,
  },
  {
    date: "2024-08-18",
    count: 0,
  },
  {
    date: "2024-08-19",
    count: 0,
  },
  {
    date: "2024-08-20",
    count: 0,
  },
  {
    date: "2024-08-21",
    count: 0,
  },
  {
    date: "2024-08-22",
    count: 0,
  },
  {
    date: "2024-08-23",
    count: 0,
  },
  {
    date: "2024-08-24",
    count: 0,
  },
  {
    date: "2024-08-25",
    count: 0,
  },
  {
    date: "2024-08-26",
    count: 0,
  },
  {
    date: "2024-08-27",
    count: 0,
  },
  {
    date: "2024-08-28",
    count: 0,
  },
  {
    date: "2024-08-29",
    count: 0,
  },
  {
    date: "2024-08-30",
    count: 0,
  },
  {
    date: "2024-08-31",
    count: 0,
  },
  {
    date: "2024-09-01",
    count: 0,
  },
  {
    date: "2024-09-02",
    count: 0,
  },
  {
    date: "2024-09-03",
    count: 0,
  },
  {
    date: "2024-09-04",
    count: 0,
  },
  {
    date: "2024-09-05",
    count: 0,
  },
  {
    date: "2024-09-06",
    count: 0,
  },
  {
    date: "2024-09-07",
    count: 0,
  },
  {
    date: "2024-09-08",
    count: 0,
  },
  {
    date: "2024-09-09",
    count: 0,
  },
  {
    date: "2024-09-10",
    count: 0,
  },
  {
    date: "2024-09-11",
    count: 0,
  },
  {
    date: "2024-09-12",
    count: 0,
  },
  {
    date: "2024-09-13",
    count: 0,
  },
  {
    date: "2024-09-14",
    count: 0,
  },
  {
    date: "2024-09-15",
    count: 0,
  },
  {
    date: "2024-09-16",
    count: 0,
  },
  {
    date: "2024-09-17",
    count: 0,
  },
  {
    date: "2024-09-18",
    count: 0,
  },
  {
    date: "2024-09-19",
    count: 0,
  },
  {
    date: "2024-09-20",
    count: 0,
  },
  {
    date: "2024-09-21",
    count: 0,
  },
  {
    date: "2024-09-22",
    count: 0,
  },
  {
    date: "2024-09-23",
    count: 0,
  },
  {
    date: "2024-09-24",
    count: 0,
  },
  {
    date: "2024-09-25",
    count: 0,
  },
  {
    date: "2024-09-26",
    count: 0,
  },
  {
    date: "2024-09-27",
    count: 0,
  },
  {
    date: "2024-09-28",
    count: 0,
  },
  {
    date: "2024-09-29",
    count: 0,
  },
  {
    date: "2024-09-30",
    count: 0,
  },
  {
    date: "2024-10-01",
    count: 0,
  },
  {
    date: "2024-10-02",
    count: 0,
  },
  {
    date: "2024-10-03",
    count: 0,
  },
  {
    date: "2024-10-04",
    count: 0,
  },
  {
    date: "2024-10-05",
    count: 0,
  },
  {
    date: "2024-10-06",
    count: 0,
  },
  {
    date: "2024-10-07",
    count: 0,
  },
  {
    date: "2024-10-08",
    count: 0,
  },
  {
    date: "2024-10-09",
    count: 0,
  },
  {
    date: "2024-10-10",
    count: 0,
  },
  {
    date: "2024-10-11",
    count: 0,
  },
  {
    date: "2024-10-12",
    count: 0,
  },
  {
    date: "2024-10-13",
    count: 0,
  },
  {
    date: "2024-10-14",
    count: 0,
  },
  {
    date: "2024-10-15",
    count: 0,
  },
  {
    date: "2024-10-16",
    count: 0,
  },
  {
    date: "2024-10-17",
    count: 0,
  },
  {
    date: "2024-10-18",
    count: 0,
  },
  {
    date: "2024-10-19",
    count: 0,
  },
  {
    date: "2024-10-20",
    count: 0,
  },
  {
    date: "2024-10-21",
    count: 0,
  },
  {
    date: "2024-10-22",
    count: 0,
  },
  {
    date: "2024-10-23",
    count: 0,
  },
  {
    date: "2024-10-24",
    count: 0,
  },
  {
    date: "2024-10-25",
    count: 0,
  },
  {
    date: "2024-10-26",
    count: 0,
  },
  {
    date: "2024-10-27",
    count: 0,
  },
  {
    date: "2024-10-28",
    count: 0,
  },
  {
    date: "2024-10-29",
    count: 0,
  },
  {
    date: "2024-10-30",
    count: 0,
  },
  {
    date: "2024-10-31",
    count: 0,
  },
  {
    date: "2024-11-01",
    count: 0,
  },
  {
    date: "2024-11-02",
    count: 0,
  },
  {
    date: "2024-11-03",
    count: 0,
  },
  {
    date: "2024-11-04",
    count: 0,
  },
  {
    date: "2024-11-05",
    count: 0,
  },
  {
    date: "2024-11-06",
    count: 0,
  },
  {
    date: "2024-11-07",
    count: 0,
  },
  {
    date: "2024-11-08",
    count: 0,
  },
  {
    date: "2024-11-09",
    count: 0,
  },
  {
    date: "2024-11-10",
    count: 0,
  },
  {
    date: "2024-11-11",
    count: 0,
  },
  {
    date: "2024-11-12",
    count: 0,
  },
  {
    date: "2024-11-13",
    count: 0,
  },
  {
    date: "2024-11-14",
    count: 0,
  },
  {
    date: "2024-11-15",
    count: 0,
  },
  {
    date: "2024-11-16",
    count: 0,
  },
  {
    date: "2024-11-17",
    count: 0,
  },
  {
    date: "2024-11-18",
    count: 0,
  },
  {
    date: "2024-11-19",
    count: 0,
  },
  {
    date: "2024-11-20",
    count: 0,
  },
  {
    date: "2024-11-21",
    count: 0,
  },
  {
    date: "2024-11-22",
    count: 0,
  },
  {
    date: "2024-11-23",
    count: 0,
  },
  {
    date: "2024-11-24",
    count: 0,
  },
  {
    date: "2024-11-25",
    count: 0,
  },
  {
    date: "2024-11-26",
    count: 0,
  },
  {
    date: "2024-11-27",
    count: 0,
  },
  {
    date: "2024-11-28",
    count: 0,
  },
  {
    date: "2024-11-29",
    count: 0,
  },
  {
    date: "2024-11-30",
    count: 0,
  },
  {
    date: "2024-12-01",
    count: 0,
  },
  {
    date: "2024-12-02",
    count: 0,
  },
  {
    date: "2024-12-03",
    count: 0,
  },
  {
    date: "2024-12-04",
    count: 1,
  },
  {
    date: "2024-12-05",
    count: 1,
  },
  {
    date: "2024-12-06",
    count: 0,
  },
  {
    date: "2024-12-07",
    count: 0,
  },
  {
    date: "2024-12-08",
    count: 1,
  },
  {
    date: "2024-12-09",
    count: 0,
  },
  {
    date: "2024-12-10",
    count: 0,
  },
  {
    date: "2024-12-11",
    count: 0,
  },
  {
    date: "2024-12-12",
    count: 0,
  },
  {
    date: "2024-12-13",
    count: 0,
  },
  {
    date: "2024-12-14",
    count: 0,
  },
  {
    date: "2024-12-15",
    count: 0,
  },
  {
    date: "2024-12-16",
    count: 0,
  },
  {
    date: "2024-12-17",
    count: 0,
  },
  {
    date: "2024-12-18",
    count: 0,
  },
  {
    date: "2024-12-19",
    count: 0,
  },
  {
    date: "2024-12-20",
    count: 0,
  },
  {
    date: "2024-12-21",
    count: 0,
  },
  {
    date: "2024-12-22",
    count: 0,
  },
  {
    date: "2024-12-23",
    count: 0,
  },
  {
    date: "2024-12-24",
    count: 0,
  },
  {
    date: "2024-12-25",
    count: 0,
  },
  {
    date: "2024-12-26",
    count: 0,
  },
  {
    date: "2024-12-27",
    count: 0,
  },
  {
    date: "2024-12-28",
    count: 0,
  },
  {
    date: "2024-12-29",
    count: 0,
  },
  {
    date: "2024-12-30",
    count: 0,
  },
  {
    date: "2024-12-31",
    count: 0,
  },
];

const HeatmapComponent: React.FC = () => {
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [loading, setLoading] = useState(true);
  const [dailyupdates, setDailyUpdates] = useState<HeatmapValue[]>([]);
  const [alldailyupdates, setAllDailyUpdates] = useState<HeatmapValue[]>([]);

  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, 11, 31);
  const endDate = new Date(today.getFullYear(), 11, 31);

  useEffect(() => {
    async function getDailyUpdates() {
      try {
        const response = await axios.get(
          `/api/dashboard/dailyupdate?userID=${userID}`
        );
        const data = response.data.Data;
        setDailyUpdates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching daily updates:", error);
        setLoading(false);
      }
    }
    getDailyUpdates();
  }, []);

  const getTooltipDataAttrs = (value: HeatmapValue) => {
    if (!value || !value.date) {
      return {
        "data-tooltip-id": "heatmap-tooltip",
        "data-tooltip-content": `No Submission`,
      };
    }
    return {
      "data-tooltip-id": "heatmap-tooltip",
      "data-tooltip-content": `${value.date}`,
    };
  };

  //   const allDates = addDates({
  //     startDate,
  //     endDate,
  //     dailyupdates,
  //   });
  //   console.log(alldailyupdates.length);

  if (loading) {
    return <div>Loading</div>;
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
          values={dailyupdates}
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
            return "color-scale-4"; // Very dark green
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
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
};

export default HeatmapComponent;

interface addDatesProps {
  startDate: Date;
  endDate: Date;
  dailyupdates: any;
}

function addDates({ startDate, endDate, dailyupdates }: addDatesProps) {
  const allDates = [];
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const formattedDate = d.toISOString().slice(0, 10);
    const existingEntry = dailyupdates.find(
      (item: any) => item.date === formattedDate
    );
    allDates.push({
      date: formattedDate,
      count: existingEntry ? existingEntry.count : 0, // 0 for no activity
    });
  }
  return allDates;
}
