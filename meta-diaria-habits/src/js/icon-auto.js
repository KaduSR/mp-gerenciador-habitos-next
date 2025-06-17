import Fuse from "fuse.js";
import { iconKeywords } from "./icon-data";

const fuse = new Fuse(iconKeywords, {
  keys: ["keywords"],
  threshold: 0.3,
});

export function getIconFromText(text) {
  const result = fuse.search(text);
  return result.length > 0 ? result[0].item.icon : "circle";
}
