const BACKUP_API_BASE = "https://calcbackend.netlify.app/api";
const PRIMARY_API_BASE =
    "https://6hkhcefyhrrnzjd3siqho25hte0lngbi.lambda-url.eu-north-1.on.aws/api";
const AUTH_ENDPOINT = "/auth";

let primaryAPIFailedAt = null;
const FAILOVER_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token
        ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          }
        : { "Content-Type": "application/json" };
};

async function tryAPI(baseUrl, endpoint, options) {
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
}

export async function fetchWithFallback(
    endpoint,
    options,
    isAuthEndpoint = false
) {
    const primaryBase = isAuthEndpoint
        ? `${PRIMARY_API_BASE}${AUTH_ENDPOINT}`
        : PRIMARY_API_BASE;
    const backupBase = isAuthEndpoint
        ? `${BACKUP_API_BASE}${AUTH_ENDPOINT}`
        : BACKUP_API_BASE;

    const now = Date.now();
    const isInFailover =
        primaryAPIFailedAt && now - primaryAPIFailedAt < FAILOVER_DURATION;

    if (!isInFailover) {
        try {
            const result = await tryAPI(primaryBase, endpoint, options);
            if (primaryAPIFailedAt) {
                console.log("Primary API recovered, exiting failover mode");
                primaryAPIFailedAt = null;
            }
            return result;
        } catch (primaryError) {
            console.warn(
                "Primary API failed, entering failover mode",
                primaryError
            );
            primaryAPIFailedAt = now;
        }
    } else {
        console.log(
            `In failover mode (${Math.round(
                (FAILOVER_DURATION - (now - primaryAPIFailedAt)) / 1000
            )}s remaining)`
        );
    }

    try {
        return await tryAPI(backupBase, endpoint, options);
    } catch (backupError) {
        console.error("Backup API failed:", backupError);
        throw new Error(`Both APIs failed: ${backupError.message}`);
    }
}
