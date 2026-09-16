import type { Metadata } from "next";
import { DocsToc } from "@/components/docs/docs-toc";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

export const metadata: Metadata = {
  title: "React Native & Expo — PXUI",
  description:
    "Setup and integration guide for using PXUI icons in React Native, Expo, and mobile applications with react-native-svg.",
};

const tocItems = [
  { id: "overview", title: "React Native Integration" },
  { id: "installation", title: "Installation & Dependencies" },
  { id: "api-consistency", title: "Identical API Contract" },
  { id: "platform-differences", title: "Platform Differences" },
  { id: "expo-setup", title: "Expo Configuration" },
];

export default function ReactNativeDocsPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            MOBILE INTEGRATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            React Native & Expo
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI provides native mobile rendering using <code className="font-mono text-xs text-[#cc785c]">react-native-svg</code>, preserving the identical 24×24 integer geometry across iOS and Android.
          </p>
        </div>

        {/* 1. Installation */}
        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Installation & Dependencies
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            React Native SVG rendering requires the peer dependency <code className="font-mono text-xs text-[#cc785c]">react-native-svg</code>:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs space-y-2">
            <div className="text-[#8e8b82] text-[10px]">STANDARD REACT NATIVE</div>
            <SyntaxHighlighter
              code="npm install @pxui/react-native react-native-svg"
              language="bash"
              theme="dark"
              showWrapToggle={true}
            />
          </div>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs space-y-2">
            <div className="text-[#8e8b82] text-[10px]">EXPO MANAGED WORKFLOW</div>
            <SyntaxHighlighter
              code="npx expo install @pxui/react-native react-native-svg"
              language="bash"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 2. Identical API Contract */}
        <section id="api-consistency" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Identical Component Contract
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            In accordance with PXUI API principles, component names remain 100% identical between web and native. You never write platform-divergent names like <code className="font-mono text-xs line-through text-red-500">PXNativeHome</code> or <code className="font-mono text-xs line-through text-red-500">PXIconHomeNative</code>.
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`import { View, StyleSheet } from "react-native";
import { PXIconHome, PXIconSearch } from "@pxui/react-native";

export function TabBar() {
  return (
    <View style={styles.tabBar}>
      <PXIconHome size={24} color="#141413" />
      <PXIconSearch size={24} color="#8e8b82" />
    </View>
  );
}`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 3. Platform Differences */}
        <section id="platform-differences" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Platform Differences
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            While the 24×24 integer geometry is identical, mobile platforms differ from web browsers in several key technical areas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-1.5">
              <span className="font-bold text-[#cc785c]">NO CSS KEYFRAMES</span>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                CSS animations are not supported in React Native. Use <code className="font-mono text-[10px]">react-native-reanimated</code> or transform style props for mobile motion.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-1.5">
              <span className="font-bold text-[#5db872]">ACCESSIBILITY PROPS</span>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Use <code className="font-mono text-[10px]">accessibilityLabel</code> and <code className="font-mono text-[10px]">accessible=&#123;true&#125;</code> instead of DOM ARIA attributes.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Expo Setup */}
        <section id="expo-setup" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Expo Configuration
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            In Expo Go or prebuilt development clients, icons require zero native configuration. Simply install via <code className="font-mono text-xs text-[#cc785c]">npx expo install</code> and start rendering immediately.
          </p>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
