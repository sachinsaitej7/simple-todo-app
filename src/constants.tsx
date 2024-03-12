export const VIEWPORT_WIDTH: string = "600px";
export const INPUT_PLACEHOLDER: string = "What's up ? ...";
export const TASKS_STORAGE_KEY: string = "tasksStorage";

const categoryIconMap = {
  personal: "🏠",
  work: "🏢",
  shopping: "🛍️",
  others: "🌐",
};

const categoryColorMap = {
  personal: "blue.100",
  work: "pink.100",
  shopping: "green.100",
  others: "gray.100",
};

export const CATEGORY_ICON_MAP: Record<string, string> = categoryIconMap;

export const CATEGORY_COLOR_MAP: Record<string, string> = categoryColorMap;
