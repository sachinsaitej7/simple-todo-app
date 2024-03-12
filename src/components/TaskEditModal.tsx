// edit modal
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Switch,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

import { Task } from "../types/Task";
import CategoryFilter from "./CategoryFilter";
import useStore, { Store } from "../store";

interface TaskEditModalProps {
  id: string;
  onClose: () => void;
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  id,
  onClose,
}) => {
  const tasks = useStore((state: Store) => state.tasks) as Task[];
  const updateTask = useStore((state: Store) => state.updateTask);
  const currentTask = tasks.find((task) => task.id === id) || ({} as Task);
  const [task, setTask] = useState<Task>({ ...currentTask });

  const onChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (key === "isCompleted") {
        setTask({ ...task, [key]: e.target.checked });
        return;
      }
      if (key === "dueDate") {
        const timestamp = new Date(e.target.value).getTime();
        return setTask({ ...task, [key]: timestamp });
      }
      setTask({ ...task, [key]: e.target.value });
    };

  const onSave = () => {
    if (task.name === "") return;
    updateTask(task);
    onClose();
  };

  const dueDate = new Date(task.dueDate)
    .toISOString()
    .split("T")[0]
    .split("-")
    .join("-");

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size={window.innerWidth < 768 ? "xs" : "sm"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="name">Name*</FormLabel>
            <Input
              id="name"
              value={task.name}
              onChange={onChange("name")}
              isRequired
            />
          </FormControl>
          <Flex
            my={4}
            flexDirection={window.innerWidth < 768 ? "column" : "row"}
          >
            <Box mr={2}>
              <FormLabel htmlFor="dueDate">Due Date</FormLabel>
              <Input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={onChange("dueDate")}
              />
            </Box>
            <Flex
              my={window.innerWidth < 768 ? 2 : 0}
              justifyContent="space-between"
            >
              <FormControl mr={2}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <CategoryFilter
                  id="category"
                  value={task.category}
                  onChange={(value: string) => {
                    setTask({ ...task, category: value });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="isCompleted" mb="0">
                  Mark as Complete
                </FormLabel>
                <Switch
                  id="isCompleted"
                  onChange={onChange("isCompleted")}
                  isChecked={task.isCompleted}
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
