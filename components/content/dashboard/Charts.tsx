import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { chartConfig, chartData } from '@/data/chart'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { CartesianGrid, AreaChart, XAxis, Area, BarChart, Bar } from 'recharts'

const AreaChartComponent = () => {
    return (
        <ChartContainer config={chartConfig} className='max-w-sm w-full h-full max-h-sm'>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                />
                <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    )
}

const BarChartComponent = () => {
    return (
        <ChartContainer config={chartConfig} className='w-full h-[125px]'>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

const LineChartComponent = () => {
    return (
        <div>Charts</div>
    )
}

const PieChartComponent = () => {
    return (
        <div>Charts</div>
    )
}

const RadarChartComponent = () => {
    return (
        <div>Charts</div>
    )
}

const RadialChartComponent = () => {
    return (
        <div>Charts</div>
    )
}

const GeneralInfoComponent = ({ title }: { title: string }) => {
    return (
        <>
            <div className='flex flex-row w-full h-full'>
                <div className='flex flex-col'>
                    <h1>{title}</h1>
                    
                </div>
            </div>
        </>
    )
}

export { AreaChartComponent, BarChartComponent, LineChartComponent, PieChartComponent, RadarChartComponent, RadialChartComponent, GeneralInfoComponent }