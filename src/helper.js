export const generateData = () => {
    return Array(25).fill(0).map(() => ([
        Math.floor(Math.random() * 100) + 1,
        Math.floor(Math.random() * 100) + 1
      ]))
}