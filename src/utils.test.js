import { it, describe } from "node:test";
import assert from "node:assert/strict";

import { distance, getSortedIndex, interpolatePolyline } from "./utils.ts";

describe("distance()", () => {
	it("works along x", () => {
		assert.strictEqual(distance([0, 0], [0, 5]), 5);
	});
	it("works along y", () => {
		assert.strictEqual(distance([0, 0], [7, 0]), 7);
	});
	it("works on a diagonal", () => {
		assert.strictEqual(distance([0, 0], [5, 4]), Math.sqrt(5 ** 2 + 4 ** 2));
	});
	it("gives positive result in negative direction", () => {
		assert.strictEqual(distance([0, 0], [0, -2]), 2);
	});
});

describe("getSortedIndex()", () => {
	it("works with ints", () => {
		assert.strictEqual(getSortedIndex([0, 1, 2, 3, 4, 7, 12], 5), 5);
	});
	it("works with floats", () => {
		assert.strictEqual(getSortedIndex([0.22, 1.36, 2.2, 3, 4, 7, 12], 3.1), 4);
	});
	it("returns lower index on equal input", () => {
		assert.strictEqual(getSortedIndex([0, 1, 2, 3, 4, 7, 12], 3), 3);
	});
});

describe("interpolatePolyline()", () => {
	it("works along x", () => {
		const t = [
			[0, 0],
			[2, 0],
			[10, 0]
		];
		assert.deepEqual(interpolatePolyline(t, 3), [
			[0, 0],
			[5, 0],
			[10, 0]
		]);
	});

	it("works along y", () => {
		const t = [
			[0, 0],
			[0, 8],
			[0, 10]
		];
		assert.deepEqual(interpolatePolyline(t, 5), [
			[0, 0],
			[0, 2.5],
			[0, 5],
			[0, 7.5],
			[0, 10]
		]);
	});
});
