import { createPlugin } from "@backstage/frontend-plugin-api";
import { grafanaApiExtension } from "./alpha/apis";

/**
 * @alpha
 */
export default createPlugin({
  id: "grafana",
  extensions: [grafanaApiExtension],
});
