import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/src/services/todo";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { map } from "lodash";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";

const TodoList = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: todos } = useGetTodosQuery({ refetchOnMountOrArgChange: true });
  const [updateTodo] = useUpdateTodoMutation();

  const [deleteTo] = useDeleteTodoMutation();

  const handleConfirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteId(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteTo(deleteId);
    handleClose();
  };

  return (
    <>
      <List sx={{ overflow: "auto", maxHeight: "570px", height: "100%" }}>
        <TransitionGroup>
          {map(todos, (item, index) => (
            <Collapse key={index}>
              <ListItem
                sx={(theme) => ({
                  overflow: "hidden",
                  p: 0,
                  my: 0.5,
                  borderRadius: 2,
                  bgcolor:
                    item.status === "success"
                      ? "#bbecbd"
                      : theme.palette.grey["50"],
                })}
                secondaryAction={
                  <IconButton
                    size="small"
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={(e) => {
                      handleConfirmDelete(e);
                      setDeleteId(item.id);
                    }}
                  >
                    <IconX size={16} />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() =>
                    updateTodo({
                      id: item.id,
                      status:
                        item.status === "success" ? "in-progress" : "success",
                    })
                  }
                >
                  <Typography
                    sx={{
                      textDecoration:
                        item.status === "success" ? "line-through" : "unset",
                    }}
                  >
                    {item.description}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>คุณต้องการลบข้อมูลนี้ใช่หรือไม่!?</Typography>
          <Stack
            spacing={2}
            direction="row"
            mt={1.5}
            justifyContent="space-between"
          >
            <Button
              fullWidth
              variant="contained"
              className="rounded-full"
              color="error"
              onClick={handleDelete}
            >
              ใช่
            </Button>
            <Button
              onClick={handleClose}
              fullWidth
              className="rounded-full"
              color="secondary"
            >
              ไม่ใช่
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default TodoList;
