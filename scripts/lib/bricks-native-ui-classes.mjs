import { PFZ_BRICKS_UI_CLASS } from "./bricks-native-catalog.mjs";

/**
 * Merge Profuzion’s cross-site “native type” hook with user/BEM classes.
 * @param {string} elementName - Bricks `name` (e.g. `section`, `text`, `html`)
 * @param {string} [userClasses]
 */
export function mergeBricksUiClasses(elementName, userClasses = "") {
  const hook = PFZ_BRICKS_UI_CLASS[elementName];
  const u = typeof userClasses === "string" ? userClasses.trim() : "";
  if (!hook) return u;
  return u ? `${hook} ${u}` : hook;
}
