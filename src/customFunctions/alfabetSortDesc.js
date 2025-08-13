import makeSubArrayForSort from './makeSubArrayForSort'

export default function alfabetSortDesc(dataToSort, whatSort) {
  whatSort = whatSort ? whatSort : 'type'

  if (dataToSort) {
    let subArray = makeSubArrayForSort(dataToSort)

    subArray.sort((a, b) => {
      if (a[whatSort] < b[whatSort]) {
        return 1
      }
      if (a[whatSort] == b[whatSort]) {
        return 0
      }
      return -1
    })
    return subArray
  }
  return dataToSort
}
