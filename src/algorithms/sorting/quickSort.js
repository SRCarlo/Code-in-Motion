export default function quickSort(arr) {
  const animations = [];
  const a = [...arr];

  function quickSortRecursive(array, start, end) {
    if (start >= end) return;

    const pivot = array[end];
    let i = start;
    for (let j = start; j < end; j++) {
      if (array[j] < pivot) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        animations.push([...a]);
      }
    }
    [array[i], array[end]] = [array[end], array[i]];
    animations.push([...a]);

    quickSortRecursive(array, start, i - 1);
    quickSortRecursive(array, i + 1, end);
  }

  quickSortRecursive(a, 0, a.length - 1);
  return animations;
}
