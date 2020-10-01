export const useGrid = ({x = 0, y = 0, width = 1, height = 1}) => {
  return {
    gridColumnStart: x,
    gridColumnEnd: `span ${width}`,
    gridRowStart: y,
    gridRowEnd: `span ${height}`
  };
}