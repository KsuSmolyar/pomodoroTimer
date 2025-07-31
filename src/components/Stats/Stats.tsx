import styles from "./Stats.module.css";
import { XAxis, YAxis, Tooltip, ResponsiveContainer,BarChart, Bar } from "recharts";
import { usePomodoroTimerContext } from "../../store/pomodoroTimerStore/context";
import { useMemo } from "react";
import { format, startOfDay, subDays } from "date-fns";
import { CustomTooltip } from "../CustomTooltip";
import { Tabs } from "../Tabs";
import { tabsMock } from "./mock";
import { statisticTabs, type StatisticTabsType } from "./types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { STATS_ACTIVE_TAB_KEY } from "../../constants";

export const Stats = () => {
    const ctx = usePomodoroTimerContext();
    const { history } = ctx;
    const [activeTab, setActiveTab] = useLocalStorage<StatisticTabsType>(STATS_ACTIVE_TAB_KEY, statisticTabs.day);

    const handleTabClick = (val:StatisticTabsType) => {
        setActiveTab(val)
    }

    const dayData = useMemo(() => {
        const today = startOfDay(Date.now());
        const daySessions = history.filter((item) => {
            return startOfDay(new Date(item.date)).getTime() === today.getTime();
        } )
        const totalDurationSeconds = daySessions.reduce((acc, curr) => acc + curr.duration, 0);
        const totalDurationMinutes = Math.round(totalDurationSeconds / 60);
        return [{ label: format(today, "dd.MM"), value: totalDurationMinutes }];
    },[history])

    const weekData = useMemo(() => {
        const days = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(new Date(), 6 - i);
        return {
            date: startOfDay(d),
            label: format(d, "dd.MM"),
            value: 0
        };
        });

        history.forEach(item => {
            const itemDate = startOfDay(new Date(item.date)).getTime();
            const day = days.find(d => d.date.getTime() === itemDate);
            if (day) {
                day.value += item.duration / 60;
            }
        });

        return days;
    },[history])

     const data = activeTab === statisticTabs.day ? dayData : weekData;

    return (
        <div className={styles.container}>
        

        {history.length === 0 ? (
            <p className={styles.empty}>Пока нет завершённых сессий.</p>
        ) : (
            <>
                <Tabs tabs={tabsMock} activeTab={activeTab} onTabClick={(val) => {handleTabClick(val)}}/>
                <div className={styles.chart}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} style={{ cursor: "pointer" }}>
                        <XAxis dataKey="label" />
                        <YAxis allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />}/>
                        <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </>
           
        )}
        </div>
    )
}
