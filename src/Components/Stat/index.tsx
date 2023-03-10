import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  makeStyles,
} from "@mui/material";
import StatGroup from "./StatGroup";
import { ParentSize } from "@visx/responsive";
import dynamic from "next/dynamic";
import { useAnalyzeTodoQuery } from "@/src/services/todo";
import { useMemo } from "react";
import { map, sumBy } from "lodash";
import Donut from "../Charts/Donut";

const ChartBarStack = dynamic(() => import("../Charts/BarStack"), {
  ssr: false,
});

const Stat = () => {
  const { data } = useAnalyzeTodoQuery<{
    data: {
      list: [];
      stat: { inprogress: number; all: number; success: number };
    };
  }>({});

  const sumData = useMemo(() => {
    return {
      inprogress: {
        percent: Math.round((data?.stat?.inprogress / data?.stat?.all) * 100),
        total: data?.stat?.inprogress as number,
        title: "In Progress",
      },
      success: {
        percent: Math.round((data?.stat?.success / data?.stat?.all) * 100),
        total: data?.stat?.success as number,
        title: "Success",
      },
    };
  }, [data]);

  const donutData = useMemo(() => {
    return [
      {
        name: "In Progress",
        value: data?.stat.inprogress || 0,
      },
      {
        name: "Success",
        value: data?.stat.success || 0,
      },
    ];
  }, [data]);

  return (
    <Paper sx={{ p: 3 }} className="rounded-[12px] h-full">
      <Typography mb={2} variant="h6" fontSize={18} fontWeight={600}>
        Dashboard
      </Typography>
      <StatGroup data={data?.stat} />
      <Grid container my={2} spacing={2}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper className="min-h-[200px] w-full h-full relative rounded-[12px] border border-solid border-gray-200">
            <Box position="absolute" sx={{ inset: 0 }}>
              <ParentSize>
                {(parent) => (
                  <Donut
                    data={donutData}
                    width={parent.width}
                    height={parent.height}
                  />
                )}
              </ParentSize>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Stack
            className="px-4 py-3 rounded-[12px] border border-solid border-gray-200"
            spacing={3}
          >
            {map(
              sumData,
              (
                item: { percent: number; total: number; title: string },
                index: string
              ) => (
                <Box key={index}>
                  <Typography fontSize={16} fontWeight={900}>
                    {item?.title}
                  </Typography>
                  <Typography
                    fontWeight={800}
                    fontSize={26}
                    color={
                      index === "inprogress" ? "warning.main" : "success.main"
                    }
                  >
                    {item?.percent || 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item?.percent || 0}
                    color={index === "inprogress" ? "warning" : "success"}
                    className="bg-gray-300"
                    sx={{
                      borderRadius: "4px",
                      height: 12,
                      "& .MuiLinearProgress-bar": {
                        backgroundSize: "20px 20px",
                        backgroundImage:
                          "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)",
                      },
                    }}
                  />

                  {/* <Typography variant="body2" fontWeight={700} color="#666">
                    คิดเป็น {Intl.NumberFormat().format(item.total)}
                  </Typography> */}
                </Box>
              )
            )}
          </Stack>
        </Grid>
      </Grid>
      <Box
        minHeight={300}
        position="relative"
        className="border border-solid border-gray-200 rounded-[12px]"
      >
        {data?.list.length > 0 ? (
          <Box position="absolute" sx={{ inset: 0 }}>
            <ParentSize>
              {(parent) => (
                <ChartBarStack
                  data={data?.list}
                  width={parent.width}
                  height={parent.height}
                />
              )}
            </ParentSize>
          </Box>
        ) : (
          <Box
            position="absolute"
            className="inset-0 text-gray-400"
            height="100%"
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            :: NO DATA ::
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Stat;
