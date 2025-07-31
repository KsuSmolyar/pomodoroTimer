import classNames from "classnames";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./types";
import { Button } from "../UI/Button";

export const Tabs = <T,>({tabs, onTabClick, activeTab}: TabsProps<T>) => {

    return (
        <div className={styles.tabsContainer}>
            {tabs.map((tab, index) => {
                return (
                    <Button
                        key={index}
                        className={classNames(styles.tab, {
                            [styles.active]: activeTab === tab.value
                        })}
                        onClick={() => onTabClick(tab.value)}
                        aria-selected={activeTab === tab.value}
                        role={"tab"}
                        label={tab.label}
                    />
                )
            })}
        </div>
    )
}
