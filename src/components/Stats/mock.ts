import type { TabItem } from "../Tabs/types";
import { statisticTabs, type StatisticTabsType } from "./types";

export const tabsMock:TabItem<StatisticTabsType>[] = [
    {
        label: "за день",
        value: statisticTabs.day,
    },
    {
        label: "за неделю",
        value: statisticTabs.week,
    }
]
