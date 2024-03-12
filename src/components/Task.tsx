import { CheckIcon, TimeIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Text, Box, Flex } from "@chakra-ui/react";
import { TargetAndTransition } from "framer-motion/types/types";
import React, { useState } from "react";
import { Task } from "../types/Task";
import { MotionFlex } from "./Motions";

import { CATEGORY_ICON_MAP, CATEGORY_COLOR_MAP } from "../constants";
import { TaskEditModal } from "./TaskEditModal";
import useStore, { Store } from "../store";

interface TaskCardProps {
  id: string;
}

const UNSELECTED_OPACITY = 0.8;

const initialFieldAnimate: TargetAndTransition = {
  scale: [1, 1.025, 1],
  opacity: [0, 0.1, 0.2, 0.3, 0.4, UNSELECTED_OPACITY],
  transition: { duration: 0.2 },
};

const deleteFieldAnimate: TargetAndTransition = {
  scale: [1, 0.95],
  opacity: [1, UNSELECTED_OPACITY, 0.2, 0.1],
  transition: { duration: 0.25, ease: "easeInOut" },
};

const completedProps = {
  textDecoration: "line-through",
  opacity: 0.5,
};

export const TaskCard: React.FC<TaskCardProps> = ({ id }) => {
  const tasks = useStore((state: Store) => state.tasks) as Task[];
  const removeTask = useStore((state: Store) => state.removeTask);
  const updateTask = useStore((state: Store) => state.updateTask);

  const [editing, setEditing] = useState<boolean>(false);
  const [fieldAnimate, setFieldAnimate] = useState(initialFieldAnimate);

  const currentTask = tasks.find((task) => task.id === id);

  if (!currentTask) return null;

  return (
    <MotionFlex
      animate={fieldAnimate}
      opacity="0"
      scale="1"
      onHoverStart={() => {
        if (fieldAnimate.opacity !== 1)
          setFieldAnimate({ ...fieldAnimate, opacity: 1, scale: 1.025 });
      }}
      onHoverEnd={() => {
        if (fieldAnimate.opacity !== UNSELECTED_OPACITY)
          setFieldAnimate({
            ...fieldAnimate,
            opacity: UNSELECTED_OPACITY,
            scale: 1,
          });
      }}
      alignItems="center"
      justifyContent="space-between"
      borderRadius="md"
      boxShadow="md"
      p={2}
      my={2}
      w="100%"
      initial="rest"
      bg={CATEGORY_COLOR_MAP[currentTask.category]}
    >
      <Flex alignItems="center" style={{ gap: "4px" }}>
        <Text fontSize="2xl" width="28px" pr={1}>
          {CATEGORY_ICON_MAP[currentTask.category]}
        </Text>
        <Box>
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            style={currentTask.isCompleted ? completedProps : {}}
            wordBreak="break-word"
          >
            {currentTask.name}
          </Text>

          <Flex alignItems="center">
            <TimeIcon pr={1} />
            <Text
              fontSize="xs"
              style={currentTask.isCompleted ? completedProps : {}}
            >
              {new Date(currentTask.dueDate).toLocaleDateString()}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box>
        {!currentTask.isCompleted ? (
          <IconButton
            aria-label="done"
            icon={<CheckIcon />}
            size="md"
            variant="ghost"
            onClick={() => {
              updateTask({ ...currentTask, isCompleted: true });
            }}
          />
        ) : null}
        <IconButton
          aria-label="edit"
          icon={<EditIcon />}
          size="md"
          variant="ghost"
          onClick={() => {
            setEditing(true);
          }}
        />
        <IconButton
          aria-label="close"
          icon={<DeleteIcon />}
          colorScheme="red"
          size="md"
          variant="ghost"
          onClick={() => {
            setFieldAnimate(deleteFieldAnimate);
            setTimeout(() => {
              removeTask(currentTask.id);
            }, 250);
          }}
        />
      </Box>
      {editing && (
        <TaskEditModal
          id={id}
          onClose={() => {
            setEditing(false);
          }}
        />
      )}
    </MotionFlex>
  );
};
