import React, { FC, useMemo } from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { IconWallet } from "@tabler/icons-react";
import { map, reduce } from "lodash";
import { Box, Stack } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F"];

interface DataProps {
  name: string;
  value: number;
}
export interface IDonut {
  data: DataProps[];
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  donutThickness?: number;
}

const Donut: FC<IDonut> = (props) => {
  const {
    data,
    donutThickness = 18,
    width,
    height,
    margin = { top: 10, right: 10, bottom: 10, left: 10 },
  } = props;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  const total = useMemo(() => {
    return reduce(
      data,
      (amount, item) => Number(amount) + Number(item.value),
      0
    );
  }, [data]);

  if (data.length <= 0) return <></>;

  const getPercent = (price: number) => {
    return Math.round(
      (price /
        data.reduce(
          (amount, item: DataProps) => Number(amount) + Number(item.value),
          0
        )) *
        100
    );
  };

  return (
    <Stack direction="row" justifyContent="space-between" position="relative">
      <svg width={width} height={height}>
        <Group top={centerY + margin.top} left={centerX + margin.left}>
          <Pie
            data={data}
            pieValue={(data: DataProps) => data.value}
            outerRadius={radius}
            innerRadius={radius - donutThickness}
            padAngle={0.05}
            cornerRadius={40}
          >
            {(pie) =>
              pie.arcs.map((arc) => (
                <Group key={arc.index}>
                  <g>
                    <path
                      d={pie.path(arc) as string}
                      fill={COLORS[arc.index]}
                    ></path>
                  </g>
                  <Text
                    fill="white"
                    fontWeight="bold"
                    fontSize={12}
                    angle={-80}
                    y={pie.path.centroid(arc)[1]}
                    x={pie.path.centroid(arc)[0] + 4.5}
                  >{`${getPercent(arc.data.value)}%`}</Text>
                </Group>
              ))
            }
          </Pie>
          <Group>
            <IconWallet size={40} y={-50} x={-20} />
            <Text textAnchor="middle" fontSize={20} fontWeight="bold" dy={20}>
              {total}
            </Text>
            <Text textAnchor="middle" fontSize={14} dy={45} fill="#868e96">
              All
            </Text>
          </Group>
        </Group>
      </svg>
    </Stack>
  );
};

export default Donut;
