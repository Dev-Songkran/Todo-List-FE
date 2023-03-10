import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  IconChecklist,
  IconChecks,
  IconClock,
  IconTrash,
} from "@tabler/icons-react";
import { map } from "lodash";
import { FC } from "react";

interface StatGroupProps {
  data?: {
    all: number | string;
    success: number | string;
    inprogress: number | string;
  };
}

const Heading: { [key: string]: { label: string; icon: JSX.Element } } = {
  all: {
    label: "All",
    icon: (
      <Box className="bg-blue-50 text-blue-600 p-4 rounded-lg w-14 h-14">
        <IconChecklist stroke={1} />
      </Box>
    ),
  },
  success: {
    label: "Success",
    icon: (
      <Box className="bg-green-50 text-green-600 p-4 rounded-lg w-14 h-14">
        <IconChecks stroke={1} />
      </Box>
    ),
  },
  inprogress: {
    label: "In Progress",
    icon: (
      <Box className="bg-yellow-50 text-yellow-600 p-4 rounded-lg w-14 h-14">
        <IconClock stroke={1} />
      </Box>
    ),
  },
};

const StatGroup: FC<StatGroupProps> = ({ data }) => {
  return (
    <Stack className=" -m-2" direction="row" flexWrap="wrap">
      {map(data, (item, index) => (
        <Paper
          key={index}
          className="p-4 m-2 min-w-[240px] flex-1 rounded-[12px] border border-solid border-gray-200"
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            {Heading[index]?.icon}
            <Box>
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant="body1"
                fontSize={14}
                fontWeight={600}
              >
                {Heading[index]?.label}
              </Typography>
              <Typography variant="h6" fontSize={20} fontWeight={800}>
                {item}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}

      {/* <Grid xs={6} sm={4} md={4} item>
        <Paper className="py-3 px-5 rounded-[12px] border border-solid border-gray-200">
          <Typography variant="body1" fontSize={14} fontWeight={600}>
            In Progress
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight={800}>
            1,000
          </Typography>
        </Paper>
      </Grid>
      <Grid xs={6} sm={4} md={4} item>
        <Paper className="py-3 px-5 rounded-[12px] border border-solid border-gray-200">
          <Typography variant="body1" fontSize={14} fontWeight={600}>
            Success
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight={800}>
            1,000
          </Typography>
        </Paper>
      </Grid> */}
    </Stack>
  );
};

export default StatGroup;
