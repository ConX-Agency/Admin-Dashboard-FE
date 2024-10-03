import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { chartConfig, chartData } from '@/data/chart'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { CartesianGrid, AreaChart, XAxis, Area } from 'recharts'

const AreaChartComponent = () => {
    return (
        <Card className='max-w-xs'>
            <CardHeader>
                <CardTitle className='text-sm'>Area Chart - Stacked</CardTitle>
                <CardDescription className='text-xs'>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
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
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none text-xs">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground text-xs">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

const BarChartComponent = () => {
    return (
        <div>Charts</div>
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

export { AreaChartComponent, BarChartComponent, LineChartComponent, PieChartComponent, RadarChartComponent, RadialChartComponent }