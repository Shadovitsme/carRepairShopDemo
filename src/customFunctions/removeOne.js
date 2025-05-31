export function RemoveOne(count, article) {
    count--;
    if (count <= 1) {
        count = 1;
    }
    document.cookie = article + "=" + count + ";path=/;";
    return count;
}
