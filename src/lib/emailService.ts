const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export const EmailError = {
  NETWORK: "NETWORK",
  API_UNAVAILABLE: "API_UNAVAILABLE",
  REQUEST_FAILED: "REQUEST_FAILED",
} as const;

async function post(endpoint: string, body: Record<string, unknown>) {
  const url = `${API_BASE}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    const err = new Error("Cannot reach the email server.") as Error & { code?: string };
    err.code = EmailError.NETWORK;
    throw err;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(
      (data as { error?: string }).error ||
        (res.status === 404 || res.status === 405
          ? "Email API is not running."
          : "Request failed"),
    ) as Error & { code?: string };
    err.code =
      res.status === 404 || res.status === 405
        ? EmailError.API_UNAVAILABLE
        : EmailError.REQUEST_FAILED;
    throw err;
  }

  return data;
}

export function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  return post("/api/contact", formData);
}

export function sendSubscribeNotification(email: string) {
  return post("/api/subscribe", { email });
}
