import { getDataMode } from "@/lib/data-mode/getDataMode";
import { DataModeSwitch } from "./DataModeSwitch";

/** The data mode switch with the mode of this request. Reads cookies, so render it inside Suspense. */
export async function DataModeControls() {
  return <DataModeSwitch mode={await getDataMode()} />;
}
