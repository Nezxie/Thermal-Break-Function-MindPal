import { describe, expect, test } from 'vitest'
import findThermalBreaks from '../src/findThermalBreaks.js'
import type {Segment} from '../src/findThermalBreaks.js'

const INPUT_DATA: Segment[] = [
{ x1: -1, x2: 136.13, y: 8.93, type: 'rail' },
{ x1: 136.13, x2: 273.25, y: 8.93, type: 'rail' },
{ x1: 339.25, x2: 507.25, y: 8.93, type: 'rail' },
{ x1: 507.25, x2: 581.8, y: 8.93, type: 'rail' },
{ x1: 581.8, x2: 749.8, y: 8.93, type: 'rail' },
{ x1: 815.8, x2: 918.85, y: 8.93, type: 'rail' },
{ x1: 918.85, x2: 1021.9, y: 8.93, type: 'rail' },
{ x1: -1, x2: 167, y: 54.08, type: 'rail' },
{ x1: 167, x2: 335, y: 54.08, type: 'rail' },
{ x1: 335, x2: 503, y: 54.08, type: 'rail' },
{ x1: 503, x2: 671, y: 54.08, type: 'rail' },
{ x1: 671, x2: 839, y: 54.08, type: 'rail' },
{ x1: 839, x2: 854.9, y: 54.08, type: 'rail' },
{ x1: 854.9, x2: 1022.9, y: 54.08, type: 'rail' },
{ x1: -1, x2: 167, y: 80.87, type: 'rail' },
{ x1: 167, x2: 335, y: 80.87, type: 'rail' },
{ x1: 335, x2: 503, y: 80.87, type: 'rail' },
{ x1: 503, x2: 671, y: 80.87, type: 'rail' },
{ x1: 671, x2: 839, y: 80.87, type: 'rail' },
{ x1: 839, x2: 854.9, y: 80.87, type: 'rail' },
{ x1: 854.9, x2: 1022.9, y: 80.87, type: 'rail' },
{ x: 136.13, y: 8.93, type: 'other' },
{ x: 507.25, y: 8.93, type: 'other' },
{ x: 581.8, y: 8.93, type: 'other' },
{ x: 918.85, y: 8.93, type: 'other' },
{ x: 167, y: 54.08, type: 'other' },
{ x: 335, y: 54.08, type: 'other' },
{ x: 503, y: 54.08, type: 'other' },
{ x: 671, y: 54.08, type: 'other' },
{ x: 839, y: 54.08, type: 'other' },
{ x: 854.9, y: 54.08, type: 'other' },
{ x: 167, y: 80.87, type: 'other' },
{ x: 335, y: 80.87, type: 'other' },
{ x: 503, y: 80.87, type: 'other' },
{ x: 671, y: 80.87, type: 'other' },
{ x: 839, y: 80.87, type: 'other' },
{ x: 854.9, y: 80.87, type: 'other' }
] as const;

const EXACT500_DATA: Segment[] = [
        { x1: 0, x2: 250, y: 1, type: "rail" },
        { x1: 250, x2: 500, y: 1, type: "rail" }
    ] as const;

const EMPTY_DATA: Segment[] = [] as const;

const UNSORTED_DATA: Segment[] = [
  { x1: 300, x2: 600, y: 1, type: 'rail' },
  { x1: 0, x2: 300, y: 1, type: 'rail' },
] as const;

const SINGLE_SEGMENT_DATA: Segment[] = [
  { x1: 0, x2: 700, y: 1, type: 'rail' },
] as const;

const GAP_DATA: Segment[] = [
  { x1: 0, x2: 300, y: 1, type: 'rail' },
  { x1: 400, x2: 800, y: 1, type: 'rail' },
] as const;

const PRECISION_DATA: Segment[] = [
  { x1: 0, x2: 300, y: 1, type: 'rail' },
  { x1: 300.0000005, x2: 600.0000005, y: 1, type: 'rail' },
] as const;

describe("findThermalBreaks function:",() => {
  
  test("Empty data set returns empty", () => {   
    expect(findThermalBreaks(EMPTY_DATA)).toEqual([]);
  });

    test("Does not place a break at exactly 500", () => {   
      expect(findThermalBreaks(EXACT500_DATA)).toEqual([]);
    });

    test("Manages unsorted data", () => {   
      expect(findThermalBreaks(UNSORTED_DATA)).toEqual([
        { "x": 300, "y": 1 }
      ]);
    });

      test("Does not break a single 'too long' segment", () => {   
      expect(findThermalBreaks(SINGLE_SEGMENT_DATA)).toEqual([]);
    });

    test("Detects gaps between segments", () => {   
      expect(findThermalBreaks(GAP_DATA)).toEqual([]);
    });
   
    test("Considers continuity at precision edgecase", () => {   
      expect(findThermalBreaks(PRECISION_DATA)).toEqual([
        { "x": 300, "y": 1 }
      ]);
    });

    test('Provided data set test', () => {
      expect(findThermalBreaks(INPUT_DATA)).toEqual([
      { "x": 335, "y": 54.08 },
      { "x": 671, "y": 54.08 },
      { "x": 335, "y": 80.87 },
      { "x": 671, "y": 80.87 }
        ])  
    })
})
