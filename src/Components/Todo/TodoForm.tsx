import { useAddTodoMutation } from "@/src/services/todo";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

const TaskForm = () => {
  const [description, setDescription] = useState<string>("");
  const [createTodo] = useAddTodoMutation();
  const handleSubmit = () => {
    if (!description) return;
    createTodo({ description });
    setDescription("");
  };
  return (
    <Paper className="flex relative">
      <InputBase
        className="rounded-full bg-gray-100 px-4 py-2 w-full"
        sx={{ flex: 1 }}
        placeholder="New Task"
        inputProps={{ "aria-label": "add task" }}
        onChange={(e) => setDescription(e.currentTarget.value)}
        value={description}
        onKeyDown={(e) => (e.code === "Enter" ? handleSubmit() : null)}
      />
      <Box className="absolute right-3 top-0 bottom-0 flex items-center">
        <Button
          size="small"
          className="rounded-full capitalize opacity-80 hover:opacity-100"
          startIcon={<IconPlus size={16} stroke={3} />}
          variant="contained"
          onClick={handleSubmit}
        >
          add
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;
