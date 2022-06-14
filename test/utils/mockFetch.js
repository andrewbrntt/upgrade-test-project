export default async function mockFetch(url, config) {
  switch (url) {
    case "http://localhost:3001/api/colors": {
      return {
        ok: true,
        status: 200,
        json: async () => ["black", "blue", "green", "red", "white"],
      };
    }
    case "http://localhost:3001/api/submit": {
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
