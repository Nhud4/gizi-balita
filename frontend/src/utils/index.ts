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

export const generateNoColumn = (
  meta: Meta | undefined,
  index: number,
  size: number
): number => {
  if (!meta) return 1;
  const page = meta?.page as number;
  const no = page === 1 ? index + 1 : size * (page - 1) + index + 1;
  return no;
};

export const formatTotal = (number: number): string => {
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(number)
    .replace(",00", "");
  return result.replace("Rp", "");
};
