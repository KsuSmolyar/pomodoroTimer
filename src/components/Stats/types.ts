export const statisticTabs = {
    day: "day",
    week: "week"
} as const;

export type StatisticTabsType = keyof typeof statisticTabs;
