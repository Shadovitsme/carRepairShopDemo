export function AddOneItem(count, article) {
  count++
  document.cookie = article + '=' + count + ';path=/;'
  return count
}
