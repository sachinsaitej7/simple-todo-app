import * as React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { InputTask } from "./components/InputTask";
import { TaskList } from "./components/TaskList";
import { Wrapper } from "./components/Wrapper";
import { Stats } from "./components/Stats";
import theme from "./theme";
import { useEffect } from "react";
import { TASKS_STORAGE_KEY } from "./constants";
import useStore, { Store } from "./store";

interface AppProps {
  withLocalStorage?: "true" | "false";
}

export const App: React.FC<AppProps> = ({ withLocalStorage = "true" }) => {
  const [tasks, setTasks] = useStore((state: Store) => [
    state.tasks,
    state.setTasks,
  ]);

  useEffect(() => {
    if (withLocalStorage !== "true") return;
    console.log(withLocalStorage);
    const jsonString = localStorage.getItem(TASKS_STORAGE_KEY) || "";
    if (jsonString === "") return;
    setTasks(JSON.parse(jsonString));
  }, [withLocalStorage, setTasks]);

  useEffect(() => {
    if (withLocalStorage !== "true") return;
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, withLocalStorage]);

  return (
    <ChakraProvider theme={theme}>
      <Container px={0}>
        <Wrapper>
          <InputTask />
          <TaskList />
        </Wrapper>
      </Container>

      <Stats />
    </ChakraProvider>
  );
};
