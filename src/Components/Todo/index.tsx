import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import TaskForm from "./TodoForm";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { TransitionGroup } from "react-transition-group";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/src/services/todo";
import { map } from "lodash";
import React, { useState } from "react";
import TodoTools from "./TodoTools";
import TodoList from "./TodoList";

const FRUITS = [
  "🍏 Apple",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥥 Coconut",
  "🍉 Watermelon",
];

const Task = () => {
  return (
    <Paper className="rounded-[12px] p-4 min-h-full">
      <Stack spacing={1.5}>
        <TaskForm />
        <TodoTools />
        <TodoList />
      </Stack>
    </Paper>
  );
};

export default Task;
