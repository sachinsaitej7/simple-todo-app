import { AddIcon } from "@chakra-ui/icons";
import { Flex, FormControl, IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { INPUT_PLACEHOLDER } from "../constants";
import { Task } from "../types/Task";
import { MotionBox } from "./Motions";
import CategoryFilter from "./CategoryFilter";

import useStore, { Store } from "../store";

export const InputTask = () => {
  const addTask = useStore((state: Store) => state.addTask);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("personal");

  const taskInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const taskAddHandler = (e: any) => {
    e.preventDefault();
    if (!name) return;
    addTask(new Task(name, category));
    setName("");
  };

  return (
    <MotionBox whileHover={{ scale: 1.05 }}>
      <form onSubmit={taskAddHandler} autoComplete="off">
        <FormControl id="taskinput" my={4}>
          <Flex style={{ gap: "4px" }}>
            <Input
              onChange={taskInputHandler}
              mr={2}
              variant="filled"
              placeholder={INPUT_PLACEHOLDER}
              value={name}
            />
            <CategoryFilter value={category} onChange={setCategory} />
            <IconButton
              aria-label="done"
              icon={<AddIcon />}
              size="md"
              variant="solid"
              type="submit"
            />
          </Flex>
        </FormControl>
      </form>
    </MotionBox>
  );
};
