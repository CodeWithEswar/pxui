"use client";

import * as React from "react";
import Link from "next/link";
import { PXUILogo } from "@/components/brand";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#2e2c28] bg-[#181715] text-[#a09d96] py-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Row: Brand & Mission */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-12 border-b border-[#252320]">
          <div className="space-y-3 max-w-sm">
            <PXUILogo variant="horizontal" size="md" markVariant="coral" badge="v1.0.0" className="[&_span]:text-[#faf9f5]" />
            <p className="text-xs text-[#a09d96] leading-relaxed">
              The pixel-native icon system and developer registry for considered interfaces. Built with integer geometry and shadcn/ui distribution.
            </p>
          </div>

          {/* 4-Column Directory */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            {/* Product */}
            <div className="space-y-3">
              <span className="font-medium text-[#faf9f5] block">Product</span>
              <ul className="space-y-2">
                <li>
                  <Link href="/icons" className="hover:text-[#faf9f5] transition-colors">
                    Icons Workspace
                  </Link>
                </li>
                <li>
                  <Link href="/animated" className="hover:text-[#faf9f5] transition-colors">
                    Animated Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-[#faf9f5] transition-colors">
                    Brand Icons
                  </Link>
                </li>
                <li>
                  <Link href="/playground" className="hover:text-[#faf9f5] transition-colors">
                    Interactive Playground
                  </Link>
                </li>
              </ul>
            </div>

            {/* Registry */}
            <div className="space-y-3">
              <span className="font-medium text-[#faf9f5] block">Registry</span>
              <ul className="space-y-2">
                <li>
                  <Link href="/registry" className="hover:text-[#faf9f5] transition-colors">
                    shadcn Registry Guide
                  </Link>
                </li>
                <li>
                  <a href="/r/px-home.json" target="_blank" className="hover:text-[#faf9f5] transition-colors">
                    Raw JSON Artifacts
                  </a>
                </li>
                <li>
                  <Link href="/docs/getting-started" className="hover:text-[#faf9f5] transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="hover:text-[#faf9f5] transition-colors">
                    Release Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Documentation */}
            <div className="space-y-3">
              <span className="font-medium text-[#faf9f5] block">Documentation</span>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/react" className="hover:text-[#faf9f5] transition-colors">
                    React Reference
                  </Link>
                </li>
                <li>
                  <Link href="/docs/react-native" className="hover:text-[#faf9f5] transition-colors">
                    React Native & Expo
                  </Link>
                </li>
                <li>
                  <Link href="/docs/animation" className="hover:text-[#faf9f5] transition-colors">
                    Animation System
                  </Link>
                </li>
                <li>
                  <Link href="/docs/accessibility" className="hover:text-[#faf9f5] transition-colors">
                    Accessibility Standards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ecosystem & Legal */}
            <div className="space-y-3">
              <span className="font-medium text-[#faf9f5] block">Ecosystem & Legal</span>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/design-principles" className="hover:text-[#faf9f5] transition-colors">
                    Design Principles
                  </Link>
                </li>
                <li>
                  <Link href="/docs/contributing" className="hover:text-[#faf9f5] transition-colors">
                    Contributing Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/legal/license" className="hover:text-[#faf9f5] transition-colors">
                    License
                  </Link>
                </li>
                <li>
                  <Link href="/legal/brand-policy" className="hover:text-[#faf9f5] transition-colors">
                    Brand Policy & Trademarks
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a09d96]">
          <p>© {new Date().getFullYear()} PXUI. Designed with warm editorial precision.</p>
          <div className="flex items-center gap-6">
            <span>24×24 Canonical Grid</span>
            <span>·</span>
            <span>Zero Runtime Overhead</span>
            <span>·</span>
            <span className="text-[#cc785c]">shadcn Native</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
