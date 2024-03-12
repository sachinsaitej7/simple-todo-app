import {
  Container,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { VIEWPORT_WIDTH } from "../constants";
import { Task } from "../types/Task";
import useStore, { Store } from "../store";

export const Stats = () => {
  const tasks = useStore((state: Store) => state.tasks) as Task[];

  if (tasks.length === 0) return null;
  const max_width = `${
    (140 / 100) * Number(VIEWPORT_WIDTH.substr(0, VIEWPORT_WIDTH.length - 2))
  }px`;

  const completedPercentage = Math.round(
    (tasks.filter((task) => task.isCompleted).length / tasks.length) * 100
  );

  // this week deadline
  const currentWeekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    const todayWeek = today.getDay();
    const taskWeek = taskDate.getDay();
    return todayWeek === taskWeek;
  });

  // deadline past
  const pastDeadlineTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return today.getTime() > taskDate.getTime();
  });

  return (
    <Container
      maxW={max_width}
      as="footer"
      role="contentinfo"
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      zIndex={1}
      textAlign="center"
      p={2}
    >
      <Flex justifyContent="space-evenly">
        <Box>
          <Text fontSize="xs">Completed</Text>
          <CircularProgress value={completedPercentage} color="green.500">
            <CircularProgressLabel>{`${completedPercentage}%`}</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box>
          <Text fontSize="xs">Current week tasks</Text>
          <CircularProgress
            value={(currentWeekTasks.length / tasks.length) * 100}
            color="blue.500"
          >
            <CircularProgressLabel>
              {currentWeekTasks.length}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box>
          <Text fontSize="xs">Past deadline tasks</Text>
          <CircularProgress
            value={(pastDeadlineTasks.length / tasks.length) * 100}
            color="red.500"
          >
            <CircularProgressLabel>
              {pastDeadlineTasks.length}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
    </Container>
  );
};
