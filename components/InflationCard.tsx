"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"

const chartData = [
    { year: "2010", inflation: 5.5 },
    { year: "2011", inflation: 6.6 },
    { year: "2012", inflation: 2.6 },
    { year: "2024", inflation: 4.6 },
    { year: "2025", inflation: 20.6 },
    { year: "2024", inflation: 4.6 },
    { year: "2025", inflation: 20.6 },
    { year: "2021", inflation: 5.5 },
    { year: "2022", inflation: 6.6 }

]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineLinear() {
    return (
        <Card className='h-fit  w-fit' >
            <CardHeader>
                <CardTitle>Inflation</CardTitle>

            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className='h-32  '>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        // tickFormatter={(value) => value.slice(0, 4)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="inflation"
                            type="linear"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    The current year inflation is 5.47%
                </div>

            </CardFooter>
        </Card>
    )
}
