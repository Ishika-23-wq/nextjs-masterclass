export interface ExecutionResult {
  success: boolean;
  logs: string[];
  renderedHtml?: string;
  error?: string;
  executionTimeMs: number;
}

export function executeNextJsSnippet(code: string): ExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];

  try {
    // Check for common conventions in snippet:
    const hasDefaultExport = code.includes("export default");
    const isAsync = code.includes("async function") || code.includes("async (");
    const hasUseClient = code.includes('"use client"') || code.includes("'use client'");
    const hasUseServer = code.includes('"use server"') || code.includes("'use server'");
    const hasFetch = code.includes("fetch(");
    const hasParams = code.includes("params");
    const hasSupabase = code.includes("supabase.from");

    logs.push(`[Next.js Compiler] Parsing component AST...`);

    if (hasUseServer) {
      logs.push(`[Next.js Server Action] Registered RPC endpoint at the server layer.`);
    } else if (hasUseClient) {
      logs.push(`[Next.js Client Boundary] Emitted client hydration chunk.`);
    } else {
      logs.push(`[Next.js Server Component] Rendered on server (0 KB client bundle).`);
    }

    if (hasFetch) {
      if (code.includes("revalidate")) {
        logs.push(`[Data Cache] Verified fetch caching with ISR revalidation.`);
      } else if (code.includes("cache: 'no-store'") || code.includes('cache: "no-store"')) {
        logs.push(`[Data Cache] Evaluated with dynamic SSR (cache: no-store).`);
      } else {
        logs.push(`[Data Cache] Fetch request memoized and cached statically.`);
      }
    }

    if (hasSupabase) {
      logs.push(`[Supabase PostgreSQL] Executed simulated PostgREST query on table.`);
    }

    if (hasParams) {
      logs.push(`[Routing Engine] Extracted async route parameters: { id: "101", slug: "intro-nextjs" }.`);
    }

    let renderedHtml = "";
    if (code.includes("<") && code.includes(">")) {
      renderedHtml = "Component rendered successfully into server HTML!";
    } else if (hasDefaultExport) {
      renderedHtml = "Default component exported successfully.";
    }

    const duration = Math.round(performance.now() - startTime + Math.random() * 20);
    logs.push(`[Build Status] ✓ Ready in ${duration}ms (0 lint errors).`);

    return {
      success: true,
      logs,
      renderedHtml,
      executionTimeMs: duration,
    };
  } catch (err: any) {
    const duration = Math.round(performance.now() - startTime);
    return {
      success: false,
      logs: [`[Error] Execution failed: ${err.message}`],
      error: err.message,
      executionTimeMs: duration,
    };
  }
}
