import React from "react";
import { CATEGORY_ICON_MAP } from "../constants";
import { Select } from "@chakra-ui/react";

interface CategoryFilterProps {
  value: string;
  id?: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter(props: CategoryFilterProps) {
  const { value, onChange } = props;

  return (
    <Select
      variant="filled"
      maxW="80px"
      value={value}
      id={props.id}
      onChange={(e) => onChange(e.target.value)}
    >
      {["personal", "work", "shopping", "others"].map((category: string) => {
        return (
          <option key={category} value={category}>
            {CATEGORY_ICON_MAP[category]}
          </option>
        );
      })}
    </Select>
  );
}
