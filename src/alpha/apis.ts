import {
  configApiRef,
  createApiExtension,
  createApiFactory,
  discoveryApiRef,
  identityApiRef,
} from "@backstage/frontend-plugin-api";
import {
  GrafanaApiClient,
  grafanaApiRef,
  UnifiedAlertingGrafanaApiClient,
} from "../api";

/**
 * @alpha
 */
export const grafanaApiExtension = createApiExtension({
  factory: createApiFactory({
    api: grafanaApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      identityApi: identityApiRef,
      configApi: configApiRef,
    },
    factory: ({ discoveryApi, identityApi, configApi }) => {
      const unifiedAlertingEnabled =
        configApi.getOptionalBoolean("grafana.unifiedAlerting") || false;

      if (!unifiedAlertingEnabled) {
        return new GrafanaApiClient({
          discoveryApi: discoveryApi,
          identityApi: identityApi,
          domain: configApi.getString("grafana.domain"),
          proxyPath: configApi.getOptionalString("grafana.proxyPath"),
        });
      }

      return new UnifiedAlertingGrafanaApiClient({
        discoveryApi: discoveryApi,
        identityApi: identityApi,
        domain: configApi.getString("grafana.domain"),
        proxyPath: configApi.getOptionalString("grafana.proxyPath"),
      });
    },
  }),
});
