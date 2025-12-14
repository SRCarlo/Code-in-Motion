export default function mergeSort(arr) {
  const animations = [];
  const a = [...arr];

  function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) result.push(left.shift());
      else result.push(right.shift());
    }
    return result.concat(left, right);
  }

  function mergeSortRecursive(array) {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = mergeSortRecursive(array.slice(0, mid));
    const right = mergeSortRecursive(array.slice(mid));
    const merged = merge(left, right);
    animations.push([...merged]);
    return merged;
  }

  mergeSortRecursive(a);
  return animations;
}
