import { Box, Text, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Task } from "../types/Task";
import { TaskCard } from "./Task";

import FilterBar from "./FilterBar";

import useStore, { Store } from "../store";

export const TaskList = () => {
  const tasks = useStore((state: Store) => state.tasks);
  const filterValues = useStore((state: Store) => state.filterValues);

  // filter tasks based on filterValues.category and filterValues.sortBy
  const filteredTasks = tasks
    .filter((task: Task) => {
      if (filterValues.category.includes("all")) return true;
      return filterValues.category.includes(task.category);
    })
    .sort((a: Task, b: Task) => {
      if (filterValues.sortBy === "createdAt") {
        return a.createdAt - b.createdAt;
      }
      if (filterValues.sortBy === "dueDate") {
        return a.dueDate - b.dueDate;
      }
      if (filterValues.sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  console.log(filteredTasks, "filteredTasks");

  return (
    <Box my={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          Tasks
        </Text>
        <FilterBar />
      </Flex>
      <Divider my={2} />
      <Box overflowY="auto" h="65vh" px={2} pb={10}>
        {filteredTasks.map((task: Task) => {
          return <TaskCard id={task.id} key={task.id} />;
        })}
      </Box>
    </Box>
  );
};
