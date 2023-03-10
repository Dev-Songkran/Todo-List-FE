import { Box, Card, Container, Grid } from "@mui/material";
import Task from "./Todo";
import Stat from "./Stat";

const Dashboard = () => {
  return (
    <Box py={4}>
      <Container maxWidth={false}>
        <Grid container spacing={3} sx={{ minHeight: "calc(100vh - 40px)" }}>
          <Grid item xs={12} md={5} lg={4}>
            <Task />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Stat />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
