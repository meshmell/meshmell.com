import moment from "moment";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { useTranslations } from "next-intl";
import { DateItem } from "@/src/types/downloadCountData";
import { LocaleKeyType } from "@/src/types/locale";
import { getDownloadSum } from "@/src/utils/getDownloadSum";

export const transformData = (
  rawData: Record<string, DateItem>,
): { date: string; downloadCount: number }[] => {
  const countsByDate: Record<string, number> = {};

  Object.values(rawData).forEach((value) => {
    const date = new Date(value.timeStamp).toLocaleDateString();
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  return Object.entries(countsByDate).map(([date, downloadCount]) => ({
    date,
    downloadCount,
  }));
};

type DownloadData = {
  date: string;
  downloadCount: number;
};

type DownloadGraphType = {
  locale: LocaleKeyType;
  focusedModelsDownloadData: Record<string, DateItem>;
};

const DownloadGraph = ({
  locale,
  focusedModelsDownloadData,
}: DownloadGraphType) => {
  const t = useTranslations("main");

  const [formattedData, setFormattedData] = useState<DownloadData[]>([]);

  useEffect(() => {
    const data = transformData(focusedModelsDownloadData);
    setFormattedData(data);
  }, [focusedModelsDownloadData]);

  if (formattedData.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto flex h-[200px] w-[280px] flex-col justify-center sm:w-[330px]">
      <div className="text-center text-lg font-medium">
        {t("download.downloads")}
        {getDownloadSum(focusedModelsDownloadData)}
      </div>
      <ResponsiveContainer
        width="100%"
        height={100}
        className="flex items-center justify-center"
      >
        <AreaChart
          data={formattedData}
          height={100}
          margin={{
            top: 5,
            right: 25,
            left: -30,
            bottom: 0,
          }}
        >
          <CartesianGrid opacity={0.1} vertical={false} />
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={() => ""}
            tick={{ fontSize: "12px" }}
          />
          <YAxis tickFormatter={(value) => value.toFixed(0)} tickCount={3} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="downloadCount"
            stroke="#8884d8"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#color)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ locale, active, payload, label }: any) => {
  const t = useTranslations("main");

  if (active) {
    return (
      <div className="absolute left-1/2 top-1/2 mx-[65px] h-[70px] w-[230px] translate-y-[130%] transform rounded-md bg-white p-2 shadow-md">
        <p className="text-lg text-gray-500">{`${moment(label).format("YYYY-MM-DD")}`}</p>
        <p className="text-base font-bold text-orange-400">{`${t("download.uniqueDownloads")}${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default DownloadGraph;
