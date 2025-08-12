import makeSubArrayForSort from './makeSubArrayForSort'

export default function alfabetSortAsc(dataToSort) {
  if (dataToSort) {
    let subArray = makeSubArrayForSort(dataToSort)

    subArray.sort((a, b) => {
      if (a.type > b.type) {
        return 1
      }
      if (a.type === b.type) {
        return 0
      }
      return -1
    })
    return subArray
  }
  return dataToSort
}
