"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/*
hw 32
1) function intersection(set1: Set<number>, set2: Set<number>): number[]{
    todo write function returning array of common numbers between 2 sets
    that is the numbers  existing in both sets
    return [];
}
2) function sbtract (set1: Set<number>, set2: Set<number>): number[]{
   todo write function returning array of numbers from set1 that don't exist in set 2
    return [];
}
3) type Occurrency = {
    str: string;
    count: number
}
function getSortedOccurrences(array: string[]); Occurrency[] {
todo  write function returning array of occurrences each occurrency contains string from given array and
how many times it occurres in the array
a result array should be sorted in the descending order of the occurrences and ascending order of the string
example: the given array is ["lmn", "ab", "a", "cd", "lmn", "cd", "lmn"]
result: [{str: "lmn", count: 3}, {str: "cd", count: 2}, {str: "a", count: 1}, {str: "ab", count: 1}]
implementation notes: to use Map<string, number>

    return [];
}
*/
//Task1
const s1 = new Set([1, 2, 3, 4, 5]);
const s2 = new Set([1, 3, 5, 7]);
function intersection(set1, set2) {
    const res = [];
    set1.forEach(e1 => set2.has(e1) && res.push(e1));
    return res;
}
let task1 = intersection(s1, s2);
console.log(task1);
//Task2
function sbtract(set1, set2) {
    const arr = [];
    set1.forEach(e1 => set2.has(e1) || arr.push(e1));
    set2.forEach(e2 => set1.has(e2) || arr.push(e2));
    const res = Array.from(new Set(arr));
    return res;
}
let task2 = sbtract(s1, s2);
console.log(task2);
//Task3
const arr3 = ["lmn", "ab", "a", "cd", "lmn", "cd", "lmn"];
function getSortedOccurrences(array) {
    let resMap = new Map();
    array.forEach(e1 => {
        let count = 0;
        array.forEach(e2 => {
            e1 == e2 && resMap.set(e1, ++count);
        });
    });
    const result = Array.from(resMap);
    const res = [];
    result.forEach(r => res.push({ str: r[0], count: r[1] }));
    return _.orderBy(res, ["count", "str"], ["desc", "asc"]);
}
let task3 = getSortedOccurrences(arr3);
console.log(task3);
