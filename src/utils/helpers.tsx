export const getEitherValue = (param1: string, param2 = "-") => {
  return param1 ? param1 : param2;
};