import makeSubArrayForSort from "./makeSubArrayForSort"

export default function priceSortAsc(dataToSort) {
  let subArray = makeSubArrayForSort(dataToSort)
  subArray.sort((a, b) => {
    return -Math.sign(a.price - b.price)
  })
  return subArray;
}

