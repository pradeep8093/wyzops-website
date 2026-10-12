import type { CSSProperties } from "react";

/**
 * AI section visual: an agent reasoning with an LLM, drawing on memory/RAG,
 * and calling business tools through an MCP layer.
 */

const tools = ["kb.search", "crm.lookup", "db.query", "email.send", "tickets.create", "api.call"];

const AGENT = { x: 110, y: 200, r: 44 };
const MCP = { x: 196, y: 184, w: 62, h: 32 };
const TOOL_W = 138;
const TOOL_H = 36;
const TOOL_X = 480 - 14 - TOOL_W;
const toolY = (i: number) => 62 + i * 55;
const port = (y: number) => 200 + (y - 200) * 0.09;

const toolPath = (y: number) => {
  const x1 = MCP.x + MCP.w;
  const mid = (x1 + TOOL_X) / 2;
  return `M${x1} ${port(y)} C${mid + 4} ${port(y)} ${mid - 4} ${y} ${TOOL_X} ${y}`;
};

const timing = (dur: number, delay: number) => ({ "--dur": `${dur}s`, "--delay": `${delay}s` }) as CSSProperties;

export function AgentDiagram() {
  return (
    <svg
      viewBox="0 0 480 380"
      role="img"
      aria-labelledby="agent-diagram-title agent-diagram-desc"
      className="block h-auto w-full"
    >
      <title id="agent-diagram-title">AI agent architecture</title>
      <desc id="agent-diagram-desc">
        An AI agent plans with a large language model, retrieves context from memory and a knowledge base, and calls
        business tools — knowledge search, CRM, database, email, ticketing and internal APIs — through Model Context
        Protocol.
      </desc>

      <defs>
        <linearGradient id="agent-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#38d9f5" />
        </linearGradient>
        <radialGradient id="agent-fill" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#231a45" />
          <stop offset="1" stopColor="#0c0e17" />
        </radialGradient>
        <radialGradient id="agent-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <text x={TOOL_X} y={26} className="fill-subtle font-mono" fontSize={9.5} letterSpacing="0.14em">
        TOOLS
      </text>
      <text x={MCP.x + MCP.w / 2} y={26} textAnchor="middle" className="fill-subtle font-mono" fontSize={9.5} letterSpacing="0.14em">
        PROTOCOL
      </text>

      {/* Base lines */}
      <g fill="none" stroke="rgb(255 255 255 / 0.11)">
        {tools.map((t, i) => (
          <path key={t} d={toolPath(toolY(i))} />
        ))}
        <path d={`M${AGENT.x + AGENT.r} 200 H${MCP.x}`} stroke="rgb(167 139 250 / 0.35)" />
        <path d={`M${AGENT.x} 84 V${AGENT.y - AGENT.r}`} stroke="rgb(126 162 255 / 0.35)" />
        <path d={`M${AGENT.x} ${AGENT.y + AGENT.r} V316`} className="flow-march" stroke="rgb(56 217 245 / 0.45)" />
      </g>

      {/* Packets */}
      <g fill="none" strokeWidth={2} strokeLinecap="round">
        {tools.map((t, i) => (
          <path
            key={`p-${t}`}
            d={toolPath(toolY(i))}
            pathLength={100}
            stroke="#a78bfa"
            className="flow-packet"
            style={timing(2.6 + (i % 3) * 0.4, 0.3 + i * 0.55)}
          />
        ))}
        {[1, 3, 4].map((i) => (
          <path
            key={`r-${i}`}
            d={toolPath(toolY(i))}
            pathLength={100}
            stroke="#38d9f5"
            className="flow-packet-reverse"
            style={timing(3.2, 1.6 + i * 0.4)}
          />
        ))}
        <path
          d={`M${AGENT.x + AGENT.r} 200 H${MCP.x}`}
          pathLength={100}
          stroke="#c4b5fd"
          className="flow-packet"
          style={timing(1.8, 0)}
        />
        <path
          d={`M${AGENT.x} 84 V${AGENT.y - AGENT.r}`}
          pathLength={100}
          stroke="#7ea2ff"
          className="flow-packet"
          style={timing(2.2, 0.5)}
        />
        <path
          d={`M${AGENT.x} 84 V${AGENT.y - AGENT.r}`}
          pathLength={100}
          stroke="#7ea2ff"
          className="flow-packet-reverse"
          style={timing(2.2, 1.6)}
        />
      </g>

      {/* LLM */}
      <g>
        <rect x={AGENT.x - 62} y={40} width={124} height={44} rx={12} fill="#0b0e15" stroke="rgb(126 162 255 / 0.35)" />
        <text x={AGENT.x} y={59} textAnchor="middle" className="fill-fg" fontSize={12.5} fontWeight={600}>
          LLM
        </text>
        <text x={AGENT.x} y={74} textAnchor="middle" className="fill-subtle font-mono" fontSize={9}>
          reason · plan
        </text>
      </g>

      {/* Memory */}
      <g>
        <rect x={AGENT.x - 62} y={316} width={124} height={44} rx={12} fill="#0b0e15" stroke="rgb(56 217 245 / 0.3)" />
        <text x={AGENT.x} y={335} textAnchor="middle" className="fill-fg" fontSize={12.5} fontWeight={600}>
          Memory
        </text>
        <text x={AGENT.x} y={350} textAnchor="middle" className="fill-subtle font-mono" fontSize={9}>
          context · rag
        </text>
      </g>

      {/* Agent */}
      <circle cx={AGENT.x} cy={AGENT.y} r={92} fill="url(#agent-glow)" />
      <circle
        className="spin-slow"
        cx={AGENT.x}
        cy={AGENT.y}
        r={60}
        fill="none"
        stroke="rgb(196 181 253 / 0.3)"
        strokeDasharray="3 7"
      />
      <circle className="pulse-ring" cx={AGENT.x} cy={AGENT.y} r={AGENT.r} fill="none" stroke="rgb(167 139 250 / 0.5)" />
      <circle cx={AGENT.x} cy={AGENT.y} r={AGENT.r} fill="url(#agent-fill)" stroke="url(#agent-stroke)" strokeWidth={1.5} />
      <path
        d={`M${AGENT.x} ${AGENT.y - 22} l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6z`}
        fill="#c4b5fd"
      />
      <text x={AGENT.x} y={AGENT.y + 12} textAnchor="middle" className="fill-fg" fontSize={13} fontWeight={600}>
        Agent
      </text>
      <text x={AGENT.x} y={AGENT.y + 26} textAnchor="middle" className="fill-subtle font-mono" fontSize={8.5}>
        orchestrates
      </text>

      {/* MCP */}
      <rect x={MCP.x} y={MCP.y} width={MCP.w} height={MCP.h} rx={9} fill="#120f22" stroke="url(#agent-stroke)" strokeWidth={1.25} />
      <text x={MCP.x + MCP.w / 2} y={MCP.y + 20} textAnchor="middle" className="font-mono" fontSize={11} fontWeight={600} fill="#ddd6fe">
        MCP
      </text>

      {/* Tools */}
      {tools.map((t, i) => {
        const y = toolY(i);
        const [ns, verb] = t.split(".");
        return (
          <g key={`n-${t}`}>
            <circle cx={TOOL_X} cy={y} r={2.5} fill="#0b0e15" stroke="rgb(255 255 255 / 0.3)" />
            <rect x={TOOL_X + 6} y={y - TOOL_H / 2} width={TOOL_W - 6} height={TOOL_H} rx={10} fill="#0b0e15" stroke="rgb(255 255 255 / 0.1)" />
            <rect x={TOOL_X + 16} y={y - 4} width={8} height={8} rx={2} fill="none" stroke="#38d9f5" strokeOpacity={0.7} />
            <text x={TOOL_X + 32} y={y + 4} className="font-mono" fontSize={11}>
              <tspan className="fill-fg">{ns}</tspan>
              <tspan className="fill-subtle">.</tspan>
              <tspan fill="#c4b5fd">{verb}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export const agentTrace = [
  { kind: "›", label: 'agent.run("Prepare renewal briefs for this week")', status: "" },
  { kind: "mcp", label: "crm.lookup", status: "ok" },
  { kind: "mcp", label: "db.query", status: "ok" },
  { kind: "rag", label: "kb.search", status: "ok" },
  { kind: "llm", label: "draft briefs", status: "ok" },
  { kind: "✓", label: "ready for human review", status: "" },
];
