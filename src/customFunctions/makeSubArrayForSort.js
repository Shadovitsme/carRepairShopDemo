export default function makeSubArrayForSort(data) {
  let subArray = Array.isArray(data) ? data : Object.values(data)
  return subArray
}
