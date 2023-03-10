import { useClearTodoMutation } from "@/src/services/todo";
import { Button, Stack } from "@mui/material";
import { IconCheck, IconTrash } from "@tabler/icons-react";

const TodoTools = () => {
  const [clearTodo] = useClearTodoMutation();

  return (
    <Stack justifyContent="flex-end" direction="row" spacing={1.5}>
      <Button
        color="warning"
        variant="outlined"
        className="rounded-full"
        startIcon={<IconCheck size={14} />}
        sx={(theme) => ({
          textTransform: "none",
        })}
        size="small"
        onClick={() => clearTodo(false)}
      >
        Clear Completed
      </Button>
      <Button
        color="error"
        variant="outlined"
        className="rounded-full"
        startIcon={<IconTrash size={14} />}
        sx={(theme) => ({
          textTransform: "none",
        })}
        size="small"
        onClick={() => clearTodo(true)}
      >
        Clear All
      </Button>
    </Stack>
  );
};

export default TodoTools;
