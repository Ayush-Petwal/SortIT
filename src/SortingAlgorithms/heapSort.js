export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const n = array.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        animations.push([0, i]); // Swap root with the last element
        animations.push([0, i]);
        animations.push([0, array[i]]);
        animations.push([i, array[0]]);
        swap(array, 0, i);

        // Call heapify on the reduced heap
        heapify(array, i, 0, animations);
    }
    return animations;
}

function heapify(array, n, i, animations) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        animations.push([i, largest]); // Compare and swap
        animations.push([i, largest]);
        animations.push([i, array[largest]]);
        animations.push([largest, array[i]]);
        swap(array, i, largest);

        // Recursively heapify the affected sub-tree
        heapify(array, n, largest, animations);
    }
}

function swap(array, idx1, idx2) {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}
