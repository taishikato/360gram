export default async (array: any[], callback: (indexValue: any, index: number, array: any[]) => void) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}