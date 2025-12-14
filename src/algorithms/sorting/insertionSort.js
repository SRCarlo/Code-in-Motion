export default function insertionSort(arr) {
  const animations = [];
  const a = [...arr];
  const n = a.length;

  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
      animations.push([...a]);
    }
    a[j + 1] = key;
    animations.push([...a]);
  }
  return animations;
}
