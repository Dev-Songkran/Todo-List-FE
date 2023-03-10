import React, { useMemo, useState } from "react";
import {
  XYChart,
  Tooltip,
  BarSeries,
  buildChartTheme,
  Axis,
  Grid,
  DataProvider,
  BarStack,
} from "@visx/xychart";
import _, { map } from "lodash";
import { Box, Typography } from "@mui/material";

interface DataProps {
  date: string;
  inprogress: number;
  success: number;
}

type Props = {
  data: DataProps[];
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

const customTheme = buildChartTheme({
  backgroundColor: "#fff",
  colors: ["#56b1ff", "#0088FE", "#3236b8"],
  gridColor: "#ddd",
  gridColorDark: "#222831",
  svgLabelSmall: { fill: "#000", fontSize: "14px" },
  svgLabelBig: { fill: "#30475e" },
  tickLength: 2,
});

const LineChartNew = (props: Props) => {
  const {
    data,
    width,
    height,
    margin = { top: 40, right: 50, bottom: 40, left: 50 },
  } = props;
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // data is use
  const series = useMemo(() => {
    return [
      map(data, (item) => ({
        key: "In Progress",
        value: item.inprogress,
        date: item.date,
      })),
      map(data, (item) => ({
        key: "Success",
        value: item.success,
        date: item.date,
      })),
    ];
  }, [data]);

  const accessors = {
    xAccessor: (d?: { date?: string } | undefined) => d?.date,
    yAccessor: (d?: { value?: number } | undefined) => d?.value,
  };

  console.log(series);

  return (
    <DataProvider
      xScale={{ type: "band", paddingInner: 0.02 }}
      yScale={{ type: "linear" }}
      theme={customTheme}
    >
      <XYChart height={height} width={width} margin={margin}>
        <Axis
          orientation="bottom"
          hideAxisLine
          hideTicks
          numTicks={5}
          tickLength={10}
          tickLabelProps={() => ({
            fontSize: 11,
            fontWeight: "semibold",
            textAnchor: "start",
          })}
        />
        <Axis
          orientation="left"
          hideAxisLine
          hideTicks
          numTicks={7}
          tickLength={10}
          tickLabelProps={() => ({ fontSize: 11, fontWeight: "semibold" })}
        />

        <Grid columns={false} numTicks={10} />

        <BarStack>
          {map(series, (item, index) => (
            <BarSeries
              key={index}
              dataKey={item?.[0]?.key}
              data={item}
              onPointerMove={(e) => setHoveredId(e.index)}
              onPointerOut={() => setHoveredId(null)}
              {...accessors}
            />
          ))}
        </BarStack>

        <Tooltip
          renderTooltip={({ tooltipData, colorScale }) => {
            return (
              <Box
                component="div"
                sx={{
                  padding: "0px 10px",
                  borderRadius: "30px",
                  display: "flex",
                  flexDirection: "column",
                  color: "#666666",
                }}
              >
                <Typography fontSize={13} fontWeight={900}>
                  {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
                </Typography>

                <Typography fontSize={13} fontWeight={900}>
                  In Progress :{" "}
                  {accessors.yAccessor(
                    tooltipData?.datumByKey?.["In Progress"]?.datum
                  )}
                </Typography>

                <Typography fontSize={13} fontWeight={900}>
                  Success :{" "}
                  {accessors.yAccessor(tooltipData?.datumByKey?.Success?.datum)}
                </Typography>
              </Box>
            );
          }}
        />
      </XYChart>
    </DataProvider>
  );
};

export default LineChartNew;
