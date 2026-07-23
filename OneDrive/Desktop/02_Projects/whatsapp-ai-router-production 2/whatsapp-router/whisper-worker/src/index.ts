// PATCH talk — Cloudflare Whisper STT worker
// Audio in -> transcript out. Free tier via Workers AI.

interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    try {
      let audioArrayBuffer: ArrayBuffer;

      if (request.method === "POST") {
        audioArrayBuffer = await request.arrayBuffer();
      } else {
        const audioUrl = new URL(request.url).searchParams.get("audio");
        if (!audioUrl) {
          return new Response(JSON.stringify({ error: "Missing audio URL or body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const audioRes = await fetch(audioUrl, {
          headers: { "User-Agent": "PATCH-talk/1.0" },
          redirect: "follow",
        });

        if (!audioRes.ok) {
          return new Response(JSON.stringify({
            error: `Failed to fetch audio: ${audioRes.status}`,
            url: audioUrl,
          }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }
        audioArrayBuffer = await audioRes.arrayBuffer();
      }

      const audioBytes = [...new Uint8Array(audioArrayBuffer)];

      let result: any;
      try {
        result = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {
          audio: new Uint8Array(audioArrayBuffer),
        });
      } catch (aiErr: any) {
        return new Response(JSON.stringify({
          error: "AI.run failed",
          detail: aiErr.message,
          audioSize: audioArrayBuffer.byteLength,
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(result.text || "", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "X-Powered-By": "PATCH talk",
        },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

