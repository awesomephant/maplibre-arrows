import { type Map, type PointLike } from "maplibre-gl";
import { type JsonArrow } from "./types.ts";

const makeGeoJSON = (ars: JsonArrow[] = [], map: Map) => {
	if (!map) return { type: "FeatureCollection", features: [] } as GeoJSON.GeoJSON;

	const tails = ars.map((arrow, i) => {
		return {
			type: "Feature",
			geometry: { type: "LineString", coordinates: arrow.points },
			properties: { width: arrow.width, kind: "arrow-tail", id: i, color: arrow.color }
		};
	});

	const heads = ars.map((arrow, i) => {
		const a = Object.values(map.project(arrow.points[arrow.points.length - 1])) as PointLike;
		const b = Object.values(map.project(arrow.points[arrow.points.length - 2])) as PointLike;

		const ab = [b[0] - a[0], b[1] - a[1]];
		const d = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]);
		const t = [-ab[1] / d, ab[0] / d];
		const s = [arrow.width * arrow.headScale[0], arrow.width * arrow.headScale[1]];

		const coordinates = [
			map.unproject(a).toArray(),
			map.unproject([a[0] + t[0] * s[0], a[1] + t[1] * s[0]]).toArray(),
			map.unproject([a[0] - (ab[0] / d) * s[0], a[1] - (ab[1] / d) * s[1]]).toArray(),
			map.unproject([a[0] - t[0] * s[0], a[1] - t[1] * s[0]]).toArray()
		];

		return {
			type: "Feature",
			geometry: { type: "Polygon", coordinates: [coordinates] },
			properties: { kind: "arrow-head", id: ars.length + i, color: arrow.color }
		};
	});

	return {
		type: "FeatureCollection",
		features: [...tails, ...heads]
	} as GeoJSON.GeoJSON;
};

export { makeGeoJSON };
