export const CONTACT_TIMEOUT_MS = 25_000;

export async function sendContact(endpoint, payload, fetchImpl = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);
  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) {
      const error = new Error("Contact request failed");
      error.code = result.code || "DELIVERY_FAILED";
      throw error;
    }
  } catch (error) {
    if (error.name === "AbortError" || error instanceof TypeError) {
      const uncertain = new Error("Delivery could not be confirmed", { cause: error });
      uncertain.code = "DELIVERY_UNCONFIRMED";
      throw uncertain;
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
