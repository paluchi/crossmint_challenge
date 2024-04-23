export default (matrix: string[][]): void => {
  const matrixAsObjects = matrix.map((row) => {
    const rowObject = {} as any;
    row.forEach((element, colIndex) => {
      rowObject[`Column ${colIndex}`] = element;
    });
    return rowObject;
  });
  console.table(matrixAsObjects);
};
