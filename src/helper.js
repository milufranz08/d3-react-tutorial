export const generateData = (width, height) => {
    return Array(25).fill(0).map(() => ([
        Math.floor(Math.random() * width) + 1,
        Math.floor(Math.random() * height) + 1
      ]))
}