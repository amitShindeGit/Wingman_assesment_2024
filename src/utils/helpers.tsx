export const getEitherValue = (param1: string, param2 = "-") => {
  return param1 ? param1 : param2;
};

export const getSortOrder = (order: "asc" | "desc" | "") => {
  if (order === "") {
    return "asc";
  } else if (order === "asc") {
    return "desc";
  } else {
    return "";
  }
};
