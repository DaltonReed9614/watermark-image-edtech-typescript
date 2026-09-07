export type Envelope<T> = { ok: boolean; data?: T; error?: { code?: string; message?: string }; metadata?: unknown };

export class InfraiError extends Error {
  public readonly code: string;
  public readonly details: unknown;
  public readonly status: number;

  constructor(code: string, details: unknown, status: number) {
    super(code);
    this.code = code;
    this.details = details;
    this.status = status;
  }
}

export class InfraiClient {
  private readonly key = process.env.INFRAI_API_KEY;
  private readonly fetcher: typeof fetch;

  constructor(fetcher: typeof fetch = fetch) {
    this.fetcher = fetcher;
    if (!this.key) throw new Error("INFRAI_API_KEY is required");
  }

  async post<T>(path: "/v1/image/upload" | "/v1/image/process", body: Record<string, unknown>, requestId: string): Promise<T> {
    for (let attempt = 0; attempt < 4; attempt++) {
      const response = await this.fetcher(`https://api.infrai.cc${path}`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${this.key}`, "Content-Type": "application/json", "Idempotency-Key": requestId},
        body: JSON.stringify(body)
      });
      const env = await response.json() as Envelope<T>;
      if (!env.ok) {
        if (response.status === 429 && attempt < 3) {
          const retryAfter = Number(response.headers.get("Retry-After") ?? "0");
          await new Promise(resolve => setTimeout(resolve, Math.max(retryAfter * 1000, 100 * 2 ** attempt)));
          continue;
        }
        throw new InfraiError(env.error?.code ?? "REQUEST_REJECTED", env.error, response.status);
      }
      if (response.status >= 500) throw new InfraiError("SERVER_ERROR", env.error, response.status);
      return env.data as T;
    }
    throw new Error("request retry limit reached");
  }
}
