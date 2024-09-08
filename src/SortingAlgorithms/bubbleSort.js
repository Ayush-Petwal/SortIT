export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSort(array.slice(), animations);  // Make a copy of the array to avoid modifying the original
    return animations;
}

function bubbleSort(array, animations) {
    let n = array.length;
    let sorted = false;
    let round = 0;

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < n - 1 - round; i++) {
            // Add animations for comparison
            animations.push([i, i + 1]); // Indices being compared
            animations.push([i, i + 1]); // Reset colors

            if (array[i] > array[i + 1]) {
                // Add animations for swap
                animations.push([i, array[i + 1]]); // Update value for array[i]
                animations.push([i + 1, array[i]]); // Update value for array[i + 1]

                // Swap elements
                [array[i], array[i + 1]] = [array[i + 1], array[i]];

                sorted = false;
                // Add the new array state to animations
                animations.push(array.slice()); // New state after the swap
                animations.push([]); // Optional empty array to signify end of swap
            }
        }
        // Mark the end of the current round
        animations.push([true, n - 1 - round]);
        round++;
    }
}
