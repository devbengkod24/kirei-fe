import { afterEach, describe, expect, it, vi } from "vitest";
import { customFetch, toApiUrl } from "./mutator";

type Result = { data: unknown; status: number; headers: Headers };

// A Response body can be read once, so each call gets a fresh copy.
function stubFetch(response: Response) {
  const fetchMock = vi.fn().mockImplementation(async () => response.clone());
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function sentInit(fetchMock: ReturnType<typeof vi.fn>): RequestInit {
  return fetchMock.mock.calls[0][1] as RequestInit;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("toApiUrl", () => {
  it("prefixes relative paths with the Laravel base URL", () => {
    expect(toApiUrl("/api/rooms")).toBe("http://localhost:8000/api/rooms");
    expect(toApiUrl("api/rooms")).toBe("http://localhost:8000/api/rooms");
  });

  it("leaves absolute URLs alone", () => {
    expect(toApiUrl("https://example.test/api")).toBe("https://example.test/api");
  });
});

describe("customFetch", () => {
  it("sends the Sanctum cookie and asks for JSON", async () => {
    const fetchMock = stubFetch(json({ data: [] }));

    await customFetch("/api/rooms", { method: "GET" });

    const init = sentInit(fetchMock);
    expect(fetchMock.mock.calls[0][0]).toBe("http://localhost:8000/api/rooms");
    expect(init.credentials).toBe("include");
    expect(new Headers(init.headers).get("Accept")).toBe("application/json");
    expect(init.cache).toBe("no-store");
  });

  it("keeps the caller's cache settings", async () => {
    const fetchMock = stubFetch(json({}));

    await customFetch("/api/rooms", { next: { revalidate: 60 } });

    expect(sentInit(fetchMock).cache).toBeUndefined();
  });

  it("returns a 422 instead of throwing, so forms can map the errors", async () => {
    const body = { message: "Data tidak valid.", errors: { name: ["Nama wajib diisi."] } };
    stubFetch(json(body, 422));

    const result = await customFetch<Result>("/api/rooms", { method: "POST" });

    expect(result.status).toBe(422);
    expect(result.data).toEqual(body);
  });

  it("returns no data for 204", async () => {
    stubFetch(new Response(null, { status: 204 }));

    const result = await customFetch<Result>("/api/rooms/1", { method: "DELETE" });

    expect(result).toMatchObject({ status: 204, data: undefined });
  });

  it("sends the XSRF token on writes, but not on reads", async () => {
    vi.stubGlobal("document", { cookie: "other=1; XSRF-TOKEN=abc%3D%3D" });
    const fetchMock = stubFetch(json({}));

    await customFetch("/api/rooms", { method: "post" });
    await customFetch("/api/rooms", { method: "GET" });

    expect(new Headers(sentInit(fetchMock).headers).get("X-XSRF-TOKEN")).toBe("abc==");
    expect(new Headers((fetchMock.mock.calls[1][1] as RequestInit).headers).has("X-XSRF-TOKEN")).toBe(false);
  });
});
