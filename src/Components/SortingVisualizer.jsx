import React, { useEffect, useState, useRef } from "react";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort.js";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSort.js";
import { getHeapSortAnimations } from "../SortingAlgorithms/heapSort.js";
import { getBubbleSortAnimations } from "../SortingAlgorithms/bubbleSort.js";

const AnimationSpeed = 1;
const NumBars = 220;
const PrimaryColor = "turquoise";
const SecondaryColor = "red";

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const arrayBarsRef = useRef([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < NumBars; i++) {
            newArray.push(randomIntFromInterval(5, 500));
        }
        setArray(newArray);
    };

    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBarsRef.current[barOneIdx].style;
                const barTwoStyle = arrayBarsRef.current[barTwoIdx].style;
                const color = i % 3 === 0 ? SecondaryColor : PrimaryColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * AnimationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBarsRef.current[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * AnimationSpeed);
            }
        }
    };

    const quickSort = () => {
        const animations = getQuickSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const [barOneIdx, barTwoOrHeight] = animations[i];
            const arrayBars = arrayBarsRef.current;
    
            if (typeof barTwoOrHeight === 'number') {
                // This is a height change
                setTimeout(() => {
                    arrayBars[barOneIdx].style.height = `${barTwoOrHeight}px`;
                }, i * AnimationSpeed);
            } else {
                // This is a color change
                const barTwoIdx = barTwoOrHeight;
                const isColorChange = i % 2 === 0;
                const color = isColorChange ? SecondaryColor : PrimaryColor;
    
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * AnimationSpeed);
            }
        }
    };
    
    
    
    
    const heapSort = () => {
        const animations = getHeapSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBarsRef.current[barOneIdx].style;
                const barTwoStyle = arrayBarsRef.current[barTwoIdx].style;
                const color = i % 3 === 0 ? SecondaryColor : PrimaryColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * AnimationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBarsRef.current[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * AnimationSpeed);
            }
        }
    };
    
    
    const bubbleSort = () => {
        const animations = getBubbleSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const [barOneIdx, barTwoOrHeight] = animations[i];
            const arrayBars = arrayBarsRef.current;
    
            if (typeof barTwoOrHeight === 'number') {
                // This is a height change
                setTimeout(() => {
                    arrayBars[barOneIdx].style.height = `${barTwoOrHeight}px`;
                }, i * AnimationSpeed);
            } else {
                // This is a color change
                const barTwoIdx = barTwoOrHeight;
                const isColorChange = i % 2 === 0;
                const color = isColorChange ? SecondaryColor : PrimaryColor;
    
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * AnimationSpeed);
            }
        }
    };
    
    
    
    

    return (
        <div className="absolute left-24">
            <div className="flex justify-center">
                {array.map((value, idx) => (
                    <div
                        className="w-[3px] inline-block mx-[1px]"
                        key={idx}
                        ref={(el) => (arrayBarsRef.current[idx] = el)}
                        style={{
                            backgroundColor: PrimaryColor,
                            height: `${value}px`,
                        }}
                    ></div>
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <button onClick={resetArray}>Generate New Array</button>
                <button onClick={mergeSort}>Merge Sort</button>
                <button onClick={quickSort}>Quick Sort</button>
                <button onClick={heapSort}>Heap Sort</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
            </div>
        </div>
    );
};

export default SortingVisualizer;
