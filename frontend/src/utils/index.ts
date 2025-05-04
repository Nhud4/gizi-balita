export const clsx = (value: string[]) => {
  if (value.length > 1) {
    return value.join(" ");
  }

  return value[0];
};

export const getYearList = (start: number, end: number): number[] => {
  const years = [];
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
};
