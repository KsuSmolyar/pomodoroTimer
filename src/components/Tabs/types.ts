export type TabsProps<T> = {
    tabs: TabItem<T>[],
    onTabClick: (val: T) => void,
    activeTab: string
}

export type TabItem<T> = {
    value: T,
    label: string,
}
