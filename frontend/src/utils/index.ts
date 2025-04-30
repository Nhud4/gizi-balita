export const clsx = (value: string[]) => {
  if (value.length > 1) {
    return value.join(" ");
  }

  return value[0];
};
