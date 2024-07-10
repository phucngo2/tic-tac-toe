export const generate2dArray = (
  numberOfRows: number,
  numberOfCols: number,
  fill: string
) => {
  return Array.from({ length: numberOfRows }, () =>
    Array(numberOfCols).fill(fill)
  );
};

export const checkEqual = (...args: string[]) => {
  const first = args[0];
  return args.every((val) => !!val && val === first);
};

export const deepCopy = <T>(arr: T[][]) => {
  let newArr: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push([]);
    for (let j = 0; j < arr[i].length; j++) {
      newArr[i].push(arr[i][j]);
    }
  }
  return newArr;
};
