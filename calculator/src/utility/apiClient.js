const BACKUP_API_BASE = "https://calcbackend.netlify.app/api";
const PRIMARY_API_BASE = "https://6hkhcefyhrrnzjd3siqho25hte0lngbi.lambda-url.eu-north-1.on.aws/api";
const AUTH_ENDPOINT = "/auth";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
};

export async function fetchWithFallback(endpoint, options, isAuthEndpoint = false) {
  const primaryBase = isAuthEndpoint ? `${PRIMARY_API_BASE}${AUTH_ENDPOINT}` : PRIMARY_API_BASE;
  const backupBase = isAuthEndpoint ? `${BACKUP_API_BASE}${AUTH_ENDPOINT}` : BACKUP_API_BASE;

  try {
    const primaryResponse = await fetch(`${primaryBase}${endpoint}`, options);
    if (primaryResponse.ok) return await primaryResponse.json();
    throw new Error('Primary API failed');
  } catch (primaryError) {
    console.warn('Primary API failed, trying backup...', primaryError);
    try {
      const backupResponse = await fetch(`${backupBase}${endpoint}`, options);
      if (!backupResponse.ok) throw new Error(await backupResponse.text());
      return await backupResponse.json();
    } catch (backupError) {
      console.error('Backup API also failed:', backupError);
      throw new Error(`Both APIs failed: ${backupError.message}`);
    }
  }
}