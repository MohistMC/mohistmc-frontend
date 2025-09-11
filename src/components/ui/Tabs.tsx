// src/components/tabs.tsx
import * as React from "react"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={`tabs tabs-lift ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    )
)
Tabs.displayName = "Tabs"

interface TabProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    defaultChecked?: boolean
}

const Tab = React.forwardRef<HTMLInputElement, TabProps>(
    ({ className, label, defaultChecked, children, ...props }, ref) => (
        <>
            <input
                ref={ref}
                type="radio"
                name="os_tabs"
                className={`tab ${className || ""}`}
                aria-label={label}
                defaultChecked={defaultChecked}
                {...props}
            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                {children}
            </div>
        </>
    )
)
Tab.displayName = "Tab"

export { Tabs, Tab }
