import { it, describe, mock, snapshot } from "node:test";
import assert from "node:assert/strict";

import { makeGeoJSON } from "./makeGeoJSON.ts";

describe("makeGeoJSON", () => {
	const mapMock = {
		project: mock.fn((coords) => {
			return coords;
		}),
		unproject: mock.fn((coords) => {
			return {
				toArray: mock.fn(() => {
					return coords;
				})
			};
		})
	};

	it("returns empty GeoJSON if map is falsy", () => {
		const result = makeGeoJSON([], null);
		assert.deepEqual(result, { type: "FeatureCollection", features: [] });
	});

	it("returns expected GeoJSON", (t) => {
		const arrows = [
			{
				width: 10,
				points: [
					[0, 0],
					[10, 10]
				],
				headScale: [1, 1],
				color: "red"
			}
		];

		t.assert.snapshot(makeGeoJSON(arrows, mapMock));
	});
});
