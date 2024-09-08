export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, start, end, animations) {
    if (start >= end) {
        animations.push([true, start]); // Mark sorted index
        return;
    }
    
    const pivotIdx = partition(array, start, end, animations);
    
    quickSortHelper(array, start, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, end, animations);
}

function partition(array, start, end, animations) {
    const pivotValue = array[start];
    let pivotIndex = start;
    let left = start + 1;
    let right = end;
    
    animations.push([start, start]); // Highlight pivot
    
    while (right >= left) {
        animations.push([left, right]); // Highlight current elements
        if (array[right] < pivotValue && array[left] > pivotValue) {
            animations.push([left, right, true]); // Swap elements
            [array[left], array[right]] = [array[right], array[left]];
            animations.push([left, array[left]]);
            animations.push([right, array[right]]);
        }
        
        if (array[right] >= pivotValue) right--;
        if (array[left] <= pivotValue) left++;
    }
    
    animations.push([pivotIndex, right]); // Highlight pivot placement
    if (pivotIndex !== right) {
        animations.push([pivotIndex, right, true]); // Swap pivot
        [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];
        animations.push([pivotIndex, array[pivotIndex]]);
        animations.push([right, array[right]]);
    }
    
    return right;
}
