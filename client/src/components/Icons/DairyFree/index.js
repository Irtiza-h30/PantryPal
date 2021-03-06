import React from "react";
import Icon from "@ant-design/icons";
import { Tooltip } from "antd";

const DairyFreeSvg = () => (
  <svg
    style={{
      width: "2.5em",
      height: "2.5em",
      verticalAlign: "middle",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
  >
    <path d="M531.6 388.8h128v370.8h-128z" fill="#FEFE71" p-id="1828"></path>
    <path d="M295.6 388.8h236v370.8h-236z" fill="#D6CD1E" p-id="1829"></path>
    <path
      d="M295.6 759.4l118-102.4 118 102.4z"
      fill="#FEFE71"
      p-id="1830"
    ></path>
    <path d="M413.6 294.6l-118 94.2h236z" fill="#D6CD1E" p-id="1831"></path>
    <path d="M413.6 229.2h123v65.4h-123z" fill="#FE8E46" p-id="1832"></path>
    <path d="M541.6 294.6h-128l118 94.2h128z" fill="#FEFE71" p-id="1833"></path>
    <path
      d="M531.6 773.4h-236c-7.8 0-14-6.2-14-14V388.8c0-7.8 6.2-14 14-14h236c7.8 0 14 6.2 14 14v370.8c0 7.6-6.2 13.8-14 13.8z m-222-28h208V402.8h-208v342.6z"
      fill="#463218"
      p-id="1834"
    ></path>
    <path
      d="M659.6 773.4h-128c-7.8 0-14-6.2-14-14V388.8c0-7.8 6.2-14 14-14h128c7.8 0 14 6.2 14 14v370.8c0 7.6-6.4 13.8-14 13.8z m-114-28h100V402.8h-100v342.6z"
      fill="#463218"
      p-id="1835"
    ></path>
    <path
      d="M531.6 402.8h-236c-6 0-11.2-3.8-13.2-9.4-2-5.6-0.2-11.8 4.4-15.6l118-94c5.2-4 12.4-4 17.4 0l118 94c4.6 3.8 6.4 10 4.4 15.6-1.8 5.6-7 9.4-13 9.4z m-196-28h156l-78-62.2-78 62.2z"
      fill="#463218"
      p-id="1836"
    ></path>
    <path
      d="M659.6 402.8h-128c-3.2 0-6.2-1-8.8-3l-118-94c-4.6-3.8-6.4-10-4.4-15.6s7.2-9.4 13.2-9.4h128c3.2 0 6.2 1 8.8 3l118 94c4.6 3.8 6.4 10 4.4 15.6s-7.4 9.4-13.2 9.4z m-123.2-28h83l-82.8-66h-83l82.8 66z"
      fill="#463218"
      p-id="1837"
    ></path>
    <path
      d="M536.6 308.6h-123c-7.8 0-14-6.2-14-14v-65.4c0-7.8 6.2-14 14-14h123c7.8 0 14 6.2 14 14v65.4c0 7.8-6.2 14-14 14z m-109-28h95v-37.4h-95v37.4z"
      fill="#463218"
      p-id="1838"
    ></path>
    <path d="M334 430h28v115.4h-28z" fill="#FFFFFF" p-id="1839"></path>
    <path
      d="M295.6 773.4c-4 0-7.8-1.6-10.6-4.8-5-5.8-4.4-14.6 1.4-19.8l113.2-98.2v-105.2c0-7.8 6.2-14 14-14s14 6.2 14 14v111.6c0 4-1.8 8-4.8 10.6l-118 102.4c-2.6 2.4-6 3.4-9.2 3.4z"
      fill="#463218"
      p-id="1840"
    ></path>
    <path
      d="M531.6 773.4c-3.2 0-6.6-1.2-9.2-3.4l-118-102.4c-5.8-5-6.4-14-1.4-19.8s14-6.4 19.8-1.4l118 102.4c5.8 5 6.4 14 1.4 19.8-2.8 3.2-6.6 4.8-10.6 4.8z"
      fill="#463218"
      p-id="1841"
    ></path>
    <path
      d="M611.2 677.6m-117.2 0a117.2 117.2 0 1 0 234.4 0 117.2 117.2 0 1 0-234.4 0Z"
      fill="#E56823"
      p-id="1842"
    ></path>
    <path
      d="M658.8 740c-3.6 0-7.2-1.4-10-4.2-35.8-36-90.2-90.6-95.2-95.2-3-2.6-4.8-6.4-4.8-10.6 0-7.8 6.2-14 14-14 5.8 0 8.2 2.4 14 8.2l11 11 33 33c24 24 47.8 48 47.8 48 5.4 5.4 5.4 14.4 0 19.8-2.8 2.8-6.2 4-9.8 4z m-96-95.8z m0 0z m-0.2 0c0.2 0 0.2 0 0 0 0.2 0 0.2 0 0 0z m0 0z m0 0z m0 0z m0 0z m0 0z m0-0.2z"
      fill="#463218"
      p-id="1843"
    ></path>
    <path
      d="M562.8 740c-3.6 0-7.2-1.4-9.8-4-5.4-5.4-5.6-14.4 0-19.8 0 0 23.8-24 47.8-48l33-33c4.6-4.6 8.4-8.2 11-11 5.8-5.8 8.2-8.2 14-8.2 7.8 0 14 6.2 14 14 0 4.2-1.8 8-4.8 10.6-5 4.6-59.4 59.2-95.2 95.2-2.8 2.8-6.4 4.2-10 4.2z m96-95.8z m0 0z m0 0z m0 0z m0 0z m0 0z m0 0z m0.2 0s-0.2 0 0 0c-0.2 0 0 0 0 0z m0-0.2z"
      fill="#463218"
      p-id="1844"
    ></path>
    <path
      d="M611.2 808.8c-72.4 0-131.2-58.8-131.2-131.2s58.8-131.2 131.2-131.2 131.2 58.8 131.2 131.2-58.8 131.2-131.2 131.2z m0-234.6c-57 0-103.2 46.4-103.2 103.2s46.4 103.2 103.2 103.2c57 0 103.2-46.4 103.2-103.2s-46.4-103.2-103.2-103.2z"
      fill="#463218"
      p-id="1845"
    ></path>
  </svg>
);

const DairyFreeIcon = () => (
  <Tooltip title="Dairy Free">
    <Icon component={DairyFreeSvg} />
  </Tooltip>
);

export default DairyFreeIcon;
