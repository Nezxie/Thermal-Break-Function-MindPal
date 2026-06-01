/*
Output should be an array of coordinates { x: number, y: number } where thermal breaks
are required.
*/

/*

The goal is to identify continuous rail segments grouped by their 'y' coordinate.
Continuous rails are those where each segment starts exactly where the previous ends
(x1 == previous x2, with a tolerance of 10^-6 to account for floating-point
precision).
The service should detect where thermal breaks need to be placed.
Thermal breaks should be placed only at the end of a rail segment (at its x2
coordinate).
Specifically, a thermal break must be located at the x2 of the last rail segment
before the accumulated continuous length would exceed 500 inches [1 270 cm].
If the continuous length crosses 500 inches [1 270 cm] within a segment,
the break is assigned to the end of the previous segment.
The input also contains 'other' type points,
your solution should ignore 'other' points when calculating continuous segments.

*/