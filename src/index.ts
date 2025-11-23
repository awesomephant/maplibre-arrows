import { type Color, type Map } from "maplibre-gl";
import type { ArrowSpec, Config, JsonArrow } from "./types";

import { quadraticToPoints } from "./utils";
import { makeGeoJSON } from "./makeGeoJSON";

class MaplibreArrows {
	arrows: ArrowSpec[];
	placeBelow: string;
	layerIdPrefix: string;
	sourceId: string;
	map: Map;
	private lineColors: string[];
	private jsonData: JsonArrow[];

	constructor(map: Map, config: Config) {
		this.map = map;
		this.placeBelow = config.placeBelow || "";
		this.layerIdPrefix = config.layerIdPrefix || "maplibre-arrows";
		this.sourceId = config.sourceId || "mapilbre-arrows";
		this.arrows = config.arrows || [];

		this.jsonData = this.computeJsonData(this.arrows);

		this.lineColors = Array.from(
			new Set(
				this.arrows.map((a) => {
					return a.lineColor || "black";
				})
			)
		);

		this.map.on("load", () => {
			this.addSource();
			this.addLayers();
		});

		this.map.on("zoom", () => {
			this.updateSource();
		});
	}

	private computeJsonData(arrows: ArrowSpec[]) {
		return arrows.map((a) => {
			const points = a.layout === "straight" ? a.points : quadraticToPoints(a.points);
			return {
				width: a.lineWidth || 10,
				headScale: a.headScale || [1.25, 1.5],
				color: a.lineColor || "black",
				points
			} as JsonArrow;
		});
	}

	private addSource() {
		const data = makeGeoJSON(this.jsonData, this.map);
		this.map.addSource(this.sourceId, { type: "geojson", lineMetrics: true, data });
	}

	private updateSource() {
		const data = makeGeoJSON(this.jsonData, this.map);
		this.map?.getSource(this.sourceId)?.setData(data);
	}

	private addLayers() {
		this.map.addLayer(
			{
				id: `${this.layerIdPrefix}_heads`,
				source: this.sourceId,
				filter: ["==", "kind", "arrow-head"],
				type: "fill",
				paint: { "fill-color": ["get", "color"] }
			},
			this.placeBelow
		);

		this.lineColors.forEach((c) => {
			this.map.addLayer(
				{
					id: `${this.layerIdPrefix}_tails_${c}`,
					source: this.sourceId,
					filter: ["all", ["==", "kind", "arrow-tail"], ["==", "color", c]],
					type: "line",
					paint: {
						"line-gradient": ["interpolate", ["linear"], ["line-progress"], 0, "transparent", 0.25, c],
						"line-width": ["get", "width"]
					}
				},
				this.placeBelow
			);
		});
	}
}

globalThis.maplibreArrows = MaplibreArrows;
export default MaplibreArrows;
