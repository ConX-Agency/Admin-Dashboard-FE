"use client"

import React from 'react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { chartConfig, chartData } from '@/data/chart'
import { CartesianGrid, XAxis, BarChart, Bar } from 'recharts'

const SalesAnalyticsChart = () => {
    return (
        <div className='bg-neutral-200'>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                        dataKey="desktop"
                        stackId="a"
                        fill="var(--color-desktop)"
                        radius={[0, 0, 4, 4]}
                    />
                    <Bar
                        dataKey="mobile"
                        stackId="a"
                        fill="var(--color-mobile)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export { SalesAnalyticsChart }