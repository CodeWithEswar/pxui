"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PXIconFileCode } from "@/components/icons";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

export function DocsSection() {
  return (
    <section id="docs" className="py-20 border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card rounded-full font-mono text-xs text-foreground shadow-2xs">
            <PXIconFileCode size={14} className="text-primary" />
            <span>Developer Reference Manual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-normal tracking-tight text-foreground">
            Technical guidelines and public contract.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-sans leading-relaxed">
            Detailed specifications for consuming, customizing, and extending PXUI pixel icons across modern React and React Native codebases.
          </p>
        </div>

        <Tabs defaultValue="standards" className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-6 h-auto p-1 bg-muted/40 border border-border rounded-lg gap-1">
            <TabsTrigger
              value="standards"
              className="text-xs font-sans font-medium rounded-md py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-2xs"
            >
              Standards
            </TabsTrigger>
            <TabsTrigger
              value="quickstart"
              className="text-xs font-sans font-medium rounded-md py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-2xs"
            >
              Quickstart
            </TabsTrigger>
            <TabsTrigger
              value="react"
              className="text-xs font-sans font-medium rounded-md py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-2xs"
            >
              React API
            </TabsTrigger>
            <TabsTrigger
              value="native"
              className="text-xs font-sans font-medium rounded-md py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-2xs"
            >
              React Native
            </TabsTrigger>
            <TabsTrigger
              value="motion"
              className="text-xs font-sans font-medium rounded-md py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-2xs"
            >
              Animations
            </TabsTrigger>
            <TabsTrigger
              value="a11y"
              className="text-xs font-sans font-medium rounded-md py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-2xs"
            >
              Accessibility
            </TabsTrigger>
          </TabsList>

          {/* Section 3.1 Design Standards Tab */}
          <TabsContent value="standards" className="p-6 md:p-8 border border-border bg-card rounded-lg mt-4 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-foreground">3.1 Core Visual Standards</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-border text-[11px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="p-2 font-bold">Attribute</th>
                    <th className="p-2 font-bold">Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-sans">
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Primary grid</td>
                    <td className="p-2">24 × 24 (canonical source of truth)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Secondary review sizes</td>
                    <td className="p-2">16 × 16, 20 × 20, 24 × 24, 32 × 32, 48 × 48</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Coordinates</td>
                    <td className="p-2">Integer-aligned by default; avoid unnecessary fractional geometry</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Stroke / module</td>
                    <td className="p-2">Consistent 1–2 pixel visual module</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Curves</td>
                    <td className="p-2">Stepped pixel curves; avoid generic smooth vector curvature</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Diagonals</td>
                    <td className="p-2">Deliberate stair-step construction</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Color</td>
                    <td className="p-2"><code>currentColor</code> by default; no embedded UI color</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Background</td>
                    <td className="p-2">Transparent background</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Default motion</td>
                    <td className="p-2">Off (static by default)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-semibold text-primary">Variants</td>
                    <td className="p-2">Outline first; Filled where semantically useful</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Quickstart Tab */}
          <TabsContent value="quickstart" className="p-6 border border-border/80 bg-background mt-4 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-foreground">1. Install via shadcn Registry</h3>
            <p className="text-muted-foreground font-sans text-xs leading-relaxed">
              In any Next.js project with shadcn/ui configured, run the following command to install an icon:
            </p>
            <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 border border-border select-all">
              <SyntaxHighlighter
                code="npx shadcn@latest add http://localhost:3000/r/px-home.json"
                language="bash"
                theme="dark"
                showWrapToggle={true}
              />
            </div>
            <h3 className="text-sm font-bold text-foreground pt-2">2. Import and Use</h3>
            <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 border border-border select-all">
              <SyntaxHighlighter
                code={`import { PXIconHome } from "@pxui/react";

export default function Nav() {
  return <PXIconHome size={24} color="currentColor" />;
}`}
                language="tsx"
                theme="dark"
                showWrapToggle={true}
              />
            </div>
          </TabsContent>

          {/* React API Tab (Section 3.11) */}
          <TabsContent value="react" className="p-6 border border-border/80 bg-background mt-4 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-foreground">3.11 PixelIconProps Contract</h3>
            <p className="text-muted-foreground font-sans text-xs leading-relaxed">
              Every PXUI icon implements the unified <code className="text-foreground">PixelIconProps</code> interface:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-border text-[11px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="p-2 font-bold">Prop</th>
                    <th className="p-2 font-bold">Type</th>
                    <th className="p-2 font-bold">Default</th>
                    <th className="p-2 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-2 text-primary">size</td>
                    <td className="p-2 text-muted-foreground">number | string</td>
                    <td className="p-2">24</td>
                    <td className="p-2 font-sans">Width & height in px or css string (&quot;24&quot;, &quot;1.5rem&quot;).</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">color</td>
                    <td className="p-2 text-muted-foreground">string</td>
                    <td className="p-2">&quot;currentColor&quot;</td>
                    <td className="p-2 font-sans">Fill color. Inherits surrounding text color.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">strokeWidth</td>
                    <td className="p-2 text-muted-foreground">number</td>
                    <td className="p-2">undefined</td>
                    <td className="p-2 font-sans">Controlled stroke width where geometry supports it.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">animated</td>
                    <td className="p-2 text-muted-foreground">boolean</td>
                    <td className="p-2">false</td>
                    <td className="p-2 font-sans">Enables stepped micro-animation. Static by default.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">animation</td>
                    <td className="p-2 text-muted-foreground">AnimationName</td>
                    <td className="p-2">undefined</td>
                    <td className="p-2 font-sans">Specifies selected animation (&quot;ring&quot;, &quot;pulse&quot;, &quot;spin&quot;).</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">duration</td>
                    <td className="p-2 text-muted-foreground">number</td>
                    <td className="p-2">undefined</td>
                    <td className="p-2 font-sans">Animation duration expressed in milliseconds (e.g. 600).</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">delay</td>
                    <td className="p-2 text-muted-foreground">number</td>
                    <td className="p-2">undefined</td>
                    <td className="p-2 font-sans">Optional animation delay in milliseconds.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">loop</td>
                    <td className="p-2 text-muted-foreground">boolean</td>
                    <td className="p-2">true</td>
                    <td className="p-2 font-sans">Controls whether the animation repeats.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">trigger</td>
                    <td className="p-2 text-muted-foreground">&quot;auto&quot; | &quot;hover&quot; | &quot;click&quot; | &quot;focus&quot; | &quot;controlled&quot;</td>
                    <td className="p-2">&quot;auto&quot;</td>
                    <td className="p-2 font-sans">Interaction trigger for animation playback.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">filled</td>
                    <td className="p-2 text-muted-foreground">boolean</td>
                    <td className="p-2">false</td>
                    <td className="p-2 font-sans">Enables filled variant only when supported.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">title</td>
                    <td className="p-2 text-muted-foreground">string</td>
                    <td className="p-2">undefined</td>
                    <td className="p-2 font-sans">Accessible SVG title tag.</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-primary">aria-label</td>
                    <td className="p-2 text-muted-foreground">string</td>
                    <td className="p-2">undefined</td>
                    <td className="p-2 font-sans">Screen reader label. Omitting marks aria-hidden=&quot;true&quot;.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-xs font-bold text-foreground pt-2">Usage Examples</h4>
            <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 border border-border select-all">
              <SyntaxHighlighter
                code={`// Basic static icon
<PXIconBell />

// Specific size
<PXIconBell size={32} />

// Explicit animation
<PXIconBell animated />

// Configured animation
<PXIconBell animated animation="wiggle" duration={600} trigger="hover" loop={false} />`}
                language="tsx"
                theme="dark"
                showWrapToggle={true}
              />
            </div>
          </TabsContent>

          {/* React Native Tab */}
          <TabsContent value="native" className="p-6 border border-border/80 bg-background mt-4 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-foreground">React Native with react-native-svg</h3>
            <p className="text-muted-foreground font-sans text-xs leading-relaxed">
              PXUI canonical icons compile cleanly to <code className="text-foreground">react-native-svg</code> with identical silhouettes and property parity:
            </p>
            <div className="p-3 rounded-xl bg-neutral-950 text-neutral-200 border border-border select-all">
              <SyntaxHighlighter
                code={`import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PXIconBell = ({ size = 24, color = '#000000', filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M11 2h2v2h2a5 5 0 0 1 5 5v5l2 2v2H2v-2l2-2V9a5 5 0 0 1 5-5h2V2zm-5 14h12v-7a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v7zm4 3h4v1a2 2 0 0 1-4 0v-1z" fill={color} />
  </Svg>
);`}
                language="tsx"
                theme="dark"
                showWrapToggle={true}
              />
            </div>
          </TabsContent>

          {/* Motion Tab */}
          <TabsContent value="motion" className="p-6 border border-border/80 bg-background mt-4 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-foreground">3.12 & 3.13 Animation Engine & Families</h3>
            <p className="text-muted-foreground font-sans text-xs leading-relaxed">
              PXUI rejects smooth vector easing curves that disrupt the pixel silhouette. All animations are strictly stepped:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground font-sans text-xs">
              <li><strong>Stepped Transitions:</strong> Using CSS <code className="text-foreground">steps(4)</code> and discrete frame keyframes.</li>
              <li><strong>Static by default:</strong> No icon ever animates unless <code className="text-foreground">animated={'{true}'}</code> is explicitly enabled.</li>
              <li><strong>prefers-reduced-motion:</strong> Automatically suppressed when the user requests reduced motion in system preferences.</li>
            </ul>

            <h4 className="text-xs font-bold text-foreground pt-2">Animation Families</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 border border-border/60 bg-muted/20">
                <span className="font-bold text-foreground">State</span>
                <span className="text-[10px] text-muted-foreground block">open, close, check, error, success</span>
              </div>
              <div className="p-2.5 border border-border/60 bg-muted/20">
                <span className="font-bold text-foreground">Directional</span>
                <span className="text-[10px] text-muted-foreground block">download, upload, forward, back</span>
              </div>
              <div className="p-2.5 border border-border/60 bg-muted/20">
                <span className="font-bold text-foreground">Attention</span>
                <span className="text-[10px] text-muted-foreground block">ring, pulse, beat, shake, wiggle</span>
              </div>
              <div className="p-2.5 border border-border/60 bg-muted/20">
                <span className="font-bold text-foreground">Loop</span>
                <span className="text-[10px] text-muted-foreground block">spin, orbit, loading ticker</span>
              </div>
            </div>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="a11y" className="p-6 border border-border/80 bg-background mt-4 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-foreground">Accessibility Contract</h3>
            <p className="text-muted-foreground font-sans text-xs leading-relaxed">
              Follow these simple rules to ensure accessible interfaces:
            </p>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-muted/20 border border-border/50">
                <span className="text-foreground font-bold block mb-1">Decorative Icon (Default)</span>
                <p className="text-muted-foreground font-sans text-xs mb-2">When accompanied by visible text (e.g. inside a button):</p>
                <code className="text-primary">&lt;Button&gt;&lt;PXIconTrash /&gt; Delete&lt;/Button&gt;</code>
                <p className="text-[10px] text-muted-foreground mt-1 font-sans">PXUI automatically adds <code className="text-foreground">aria-hidden=&quot;true&quot;</code>.</p>
              </div>

              <div className="p-3 bg-muted/20 border border-border/50">
                <span className="text-foreground font-bold block mb-1">Icon-Only Button (Semantic)</span>
                <p className="text-muted-foreground font-sans text-xs mb-2">When the icon alone conveys the action:</p>
                <code className="text-primary">&lt;PXIconSettings aria-label=&quot;Settings&quot; /&gt;</code>
                <p className="text-[10px] text-muted-foreground mt-1 font-sans">PXUI applies <code className="text-foreground">role=&quot;img&quot;</code> and passes the accessible label.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
