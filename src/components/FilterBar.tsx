import React from "react";

import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Button,
  IconButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "@chakra-ui/react";

import { CATEGORY_ICON_MAP } from "../constants";
import useStore, { Store } from "../store";

import { FaFilter, FaUndo, FaRedo } from "react-icons/fa";

const SORT_BY_MAP: Record<string, string> = {
  createdAt: "Created",
  dueDate: "Due Date",
  name: "Name",
};

export default function FilterBar() {
  const undoStack = useStore((state: Store) => state.undoStack);
  const redoStack = useStore((state: Store) => state.redoStack);
  const undo = useStore((state: Store) => state.undo);
  const redo = useStore((state: Store) => state.redo);
  const filterValues = useStore((state: Store) => state.filterValues) as {
    category: string[];
    sortBy: string;
  };
  const setFilterValues = useStore((state: Store) => state.setFilterValues);

  console.log(filterValues, "filterValues");

  const onChange = (type: "sort" | "category") => (value: string) => {
    if (type === "category") {
      if (value === "all") {
        setFilterValues({ category: ["all"] });
        return;
      }
      if (filterValues.category.includes(value)) {
        setFilterValues({
          category: filterValues.category.filter((c) => c !== value),
        });
      } else {
        setFilterValues({
          category: [
            ...filterValues.category.filter((c) => c !== "all"),
            value,
          ],
        });
      }
      return;
    }
    if (type === "sort") {
      setFilterValues({
        sortBy: value,
      });
      return;
    }
  };

  const activeFilterState =
    !filterValues.category.includes("all") ||
    filterValues.sortBy !== "createdAt";

  return (
    <Flex style={{ gap: "8px" }}>
      <IconButton
        aria-label="undo"
        icon={<FaUndo />}
        variant="ghost"
        colorScheme={undoStack.length > 0 ? "green" : "gray"}
        onClick={() => undo()}
      />
      <IconButton
        aria-label="redo"
        icon={<FaRedo />}
        variant="ghost"
        colorScheme={redoStack.length > 0 ? "green" : "gray"}
        onClick={() => redo()}
      />
      <Menu closeOnSelect={false} placement="bottom-end">
        <MenuButton
          as={Button}
          px={3}
          py={1}
          size={32}
          colorScheme={activeFilterState ? "green" : "gray"}
        >
          <FaFilter />
        </MenuButton>
        <MenuList minWidth="200px">
          <MenuOptionGroup
            title="Sort By"
            type="radio"
            value={filterValues.sortBy}
          >
            {["createdAt", "dueDate", "name"].map((sort) => (
              <MenuItemOption
                key={sort}
                value={sort}
                onClick={() => onChange("sort")(sort)}
              >
                {SORT_BY_MAP[sort]}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup
            title="Filter By Category"
            type="checkbox"
            value={filterValues.category}
          >
            {["All", "Work", "Personal", "Shopping", "Others"].map(
              (category) => (
                <MenuItemOption
                  key={category}
                  onClick={() =>
                    onChange("category")(category.toLocaleLowerCase())
                  }
                  value={category.toLocaleLowerCase()}
                >
                  {`${
                    CATEGORY_ICON_MAP[category.toLocaleLowerCase()] || "   "
                  } ${category}`}
                </MenuItemOption>
              )
            )}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
