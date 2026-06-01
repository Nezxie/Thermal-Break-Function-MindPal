# Thermal Break Detection

## Overview

This solution identifies thermal break locations in rail segments assuming a maximum continuous rail length of **500 inches**.
Output is an array of coordinates `{ x: number, y: number }` where thermal breaks are required.
Rail segments are grouped by their `y` coordinate and analyzed independently. Only segments of type `rail` are considered - elements of type `other` are ignored.

## How to use
### Instalation 
```
npm install
```
### Build
```
npm run build
```
### Tests
```
npm run test
```
### Usage

```ts
import findThermalBreaks from './src/findThermalBreaks';

const breaks = findThermalBreaks(inputData);

console.log(breaks);
```
Input data should be structured as an array of Segments, ex:
```
[
  { x1: -1, x2: 136.13, y: 8.93, type: 'rail' },
  { x: 167, y: 54.08, type: 'other' }
]
```
## Rules

- Rails are grouped by `y`.
- Consecutive rails are considered continuous when:

  ```
  Math.abs(previous.x2 - current.x1) <= 1e-6
    ```
- The continuous length is calculated as the sum of segment lengths:
  ```
  segmentLength = x2 - x1
  ```
- A thermal break is placed at the end of the previous segment (previous.x2) when adding the next segment would cause the accumulated continuous length to exceed 500 inches.

- Input ordering is not assumed - rails are sorted by x1 (starting point) within each y group before processing.
