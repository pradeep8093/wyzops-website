import type { CSSProperties } from "react";

/**
 * Hero visual: an integration + AI layer connecting business systems to the
 * products built on top of them. Pure SVG + CSS (no JS), paused off-screen
 * and static under prefers-reduced-motion.
 */

type Node = { label: string; y: number; color: string };

const systems: Node[] = [
  { label: "CRM", y: 82, color: "#6f97ff" },
  { label: "ERP", y: 160, color: "#6f97ff" },
  { label: "Payments", y: 238, color: "#6f97ff" },
  { label: "Database", y: 316, color: "#6f97ff" },
];

const surfaces: Node[] = [
  { label: "SaaS app", y: 82, color: "#38d9f5" },
  { label: "Web portal", y: 160, color: "#38d9f5" },
  { label: "Mobile", y: 238, color: "#38d9f5" },
  { label: "AI agent", y: 316, color: "#a78bfa" },
];

const HUB = { x: 182, y: 152, w: 116, h: 94 };
const HUB_CY = HUB.y + HUB.h / 2; // 199
const NODE_W = 102;
const NODE_H = 36;
const LEFT_X = 18;
const RIGHT_X = 480 - 18 - NODE_W;

/** Where a node's connection meets the hub edge (fanned around the centre). */
const portY = (y: number) => HUB_CY + (y - HUB_CY) * 0.34;

const leftPath = (y: number) => {
  const x1 = LEFT_X + NODE_W;
  const x2 = HUB.x;
  const mid = (x1 + x2) / 2;
  return `M${x1} ${y} C${mid} ${y} ${mid} ${portY(y)} ${x2} ${portY(y)}`;
};

const rightPath = (y: number) => {
  const x1 = HUB.x + HUB.w;
  const x2 = RIGHT_X;
  const mid = (x1 + x2) / 2;
  return `M${x1} ${portY(y)} C${mid} ${portY(y)} ${mid} ${y} ${x2} ${y}`;
};

const timing = (dur: number, delay: number) => ({ "--dur": `${dur}s`, "--delay": `${delay}s` }) as CSSProperties;

function SystemNode({ node, x }: { node: Node; x: number }) {
  return (
    <g>
      <rect
        x={x}
        y={node.y - NODE_H / 2}
        width={NODE_W}
        height={NODE_H}
        rx={10}
        fill="#0b0e15"
        stroke="rgb(255 255 255 / 0.1)"
      />
      <circle cx={x + 15} cy={node.y} r={3} fill={node.color} />
      <circle cx={x + 15} cy={node.y} r={6} fill={node.color} opacity={0.15} />
      <text x={x + 27} y={node.y + 4} className="fill-fg font-mono" fontSize={11.5}>
        {node.label}
      </text>
    </g>
  );
}

export function SystemDiagram() {
  return (
    <div
      data-anim
      className="relative [contain:layout_paint] rounded-[1.75rem] border border-line bg-white/[0.02] p-1.5 shadow-[0_40px_120px_-40px_rgb(79_125_255/0.35)]"
    >
      <div className="relative overflow-hidden rounded-[1.375rem] border border-line bg-[rgb(8_10_15/0.85)]">
        <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-subtle">
          <span>system-map</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-emerald-400" />
            example
          </span>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="bg-dots mask-radial absolute inset-0 opacity-70" />
          <svg
            viewBox="0 0 480 392"
            role="img"
            aria-labelledby="system-diagram-title system-diagram-desc"
            className="relative block h-auto w-full"
          >
            <title id="system-diagram-title">WyzOps system map</title>
            <desc id="system-diagram-desc">
              An integration and AI layer connecting business systems — CRM, ERP, payments and databases — to the
              products built on them: a SaaS app, a web portal, a mobile app and an AI agent.
            </desc>

            <defs>
              <linearGradient id="hub-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6f97ff" />
                <stop offset="0.5" stopColor="#9b7bff" />
                <stop offset="1" stopColor="#38d9f5" />
              </linearGradient>
              <radialGradient id="hub-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#4f7dff" stopOpacity="0.28" />
                <stop offset="1" stopColor="#4f7dff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Column labels */}
            <text x={LEFT_X} y={40} className="fill-subtle font-mono" fontSize={9.5} letterSpacing="0.14em">
              SYSTEMS
            </text>
            <text
              x={480 - 18}
              y={40}
              textAnchor="end"
              className="fill-subtle font-mono"
              fontSize={9.5}
              letterSpacing="0.14em"
            >
              PRODUCTS
            </text>

            {/* Orbits behind the hub */}
            <circle cx={240} cy={HUB_CY} r={118} fill="url(#hub-glow)" />
            <circle cx={240} cy={HUB_CY} r={84} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 6" />
            <circle
              className="spin-slow"
              cx={240}
              cy={HUB_CY}
              r={108}
              fill="none"
              stroke="rgb(147 180 255 / 0.14)"
              strokeDasharray="1 10"
            />

            {/* Base connections */}
            <g fill="none" stroke="rgb(255 255 255 / 0.11)" strokeWidth={1}>
              {systems.map((n) => (
                <path key={`l-${n.label}`} d={leftPath(n.y)} />
              ))}
              {surfaces.map((n) => (
                <path key={`r-${n.label}`} d={rightPath(n.y)} />
              ))}
              <path d={`M240 86 V${HUB.y}`} className="flow-march" stroke="rgb(167 139 250 / 0.45)" />
              <path d={`M240 ${HUB.y + HUB.h} V308`} className="flow-march" stroke="rgb(167 139 250 / 0.45)" />
            </g>

            {/* Data packets */}
            <g fill="none" strokeWidth={2} strokeLinecap="round">
              {systems.map((n, i) => (
                <path
                  key={`lp-${n.label}`}
                  d={leftPath(n.y)}
                  pathLength={100}
                  stroke="#7ea2ff"
                  className="flow-packet"
                  style={timing(2.8 + i * 0.35, i * 0.7)}
                />
              ))}
              {surfaces.map((n, i) => (
                <path
                  key={`rp-${n.label}`}
                  d={rightPath(n.y)}
                  pathLength={100}
                  stroke={n.color}
                  className="flow-packet"
                  style={timing(3 + ((i + 2) % 4) * 0.3, 1.2 + i * 0.6)}
                />
              ))}
              <path
                d={rightPath(surfaces[3].y)}
                pathLength={100}
                stroke="#a78bfa"
                className="flow-packet-reverse"
                style={timing(3.4, 2.6)}
              />
              <path
                d={leftPath(systems[0].y)}
                pathLength={100}
                stroke="#7ea2ff"
                className="flow-packet-reverse"
                style={timing(3.6, 3.1)}
              />
            </g>

            {/* Ports */}
            <g fill="#0b0e15" stroke="rgb(255 255 255 / 0.3)">
              {systems.map((n) => (
                <circle key={`pl-${n.label}`} cx={LEFT_X + NODE_W} cy={n.y} r={2.5} />
              ))}
              {surfaces.map((n) => (
                <circle key={`pr-${n.label}`} cx={RIGHT_X} cy={n.y} r={2.5} />
              ))}
            </g>

            {/* Nodes */}
            {systems.map((n) => (
              <SystemNode key={n.label} node={n} x={LEFT_X} />
            ))}
            {surfaces.map((n) => (
              <SystemNode key={n.label} node={n} x={RIGHT_X} />
            ))}

            {/* Hub */}
            <rect
              className="pulse-ring"
              x={HUB.x}
              y={HUB.y}
              width={HUB.w}
              height={HUB.h}
              rx={18}
              fill="none"
              stroke="rgb(147 180 255 / 0.35)"
              style={{ "--delay": "0.4s" } as CSSProperties}
            />
            <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx={18} fill="#0d1019" stroke="url(#hub-stroke)" strokeWidth={1.25} />
            <g transform={`translate(${240 - 11} ${HUB.y + 18})`}>
              <path
                d="M2 3 5.6 12.4 11 6 16.4 12.4 20 3"
                fill="none"
                stroke="url(#hub-stroke)"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <text x={240} y={HUB.y + 54} textAnchor="middle" className="fill-fg" fontSize={13} fontWeight={600} letterSpacing="-0.01em">
              WyzOps layer
            </text>
            <text x={240} y={HUB.y + 72} textAnchor="middle" className="fill-subtle font-mono" fontSize={9.5}>
              apis · events · ai
            </text>

            {/* API + AI chips */}
            <g className="float-y">
              <rect x={166} y={58} width={148} height={28} rx={8} fill="#0b0e15" stroke="rgb(255 255 255 / 0.12)" />
              <text x={240} y={76} textAnchor="middle" className="font-mono" fontSize={10.5}>
                <tspan className="fill-brand-sky">POST</tspan>
                <tspan className="fill-fg"> /v1/orders </tspan>
                <tspan fill="#34d399">201</tspan>
              </text>
            </g>
            <g className="float-y" style={{ "--delay": "-3s" } as CSSProperties}>
              <rect x={156} y={308} width={168} height={28} rx={8} fill="#0b0e15" stroke="rgb(167 139 250 / 0.3)" />
              <text x={240} y={326} textAnchor="middle" className="font-mono" fontSize={10.5}>
                <tspan fill="#c4b5fd">agent</tspan>
                <tspan className="fill-muted">.tool_call(</tspan>
                <tspan className="fill-fg">crm</tspan>
                <tspan className="fill-muted">)</tspan>
              </text>
            </g>

            {/* Legend */}
            <g className="font-mono" fontSize={9.5}>
              {[
                { label: "integrations", color: "#7ea2ff", x: 138 },
                { label: "products", color: "#38d9f5", x: 241 },
                { label: "ai", color: "#a78bfa", x: 322 },
              ].map((item) => (
                <g key={item.label}>
                  <circle cx={item.x} cy={370} r={3} fill={item.color} />
                  <text x={item.x + 9} y={373.5} className="fill-subtle">
                    {item.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
