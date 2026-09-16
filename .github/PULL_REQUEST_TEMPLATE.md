## PXUI Pull Request

### Affected Domains (Section 13.21)
Please check all domains impacted by this change:
- [ ] **Geometry / Visual**: Grid alignment, optical correction, silhouette, family consistency, filled state
- [ ] **Metadata / Naming**: Canonical lowercase-kebab-case, `PXIcon*` naming, aliases, tags, taxonomy
- [ ] **Compiler / Platform**: Canonical IR, React, React Native, SVG, deterministic output
- [ ] **Registry**: shadcn Registry JSON schema, component file generation, dependencies
- [ ] **Animation**: Stepped integer frames, reduced-motion overrides, state transitions
- [ ] **Brand**: Trademark notice, official source reference, monochrome/color policy
- [ ] **Accessibility**: Decorative vs semantic usage, ARIA attributes, contrast ratios, touch targets

### Verification Checklist (Section 15)
- [ ] All canonical icons conform strictly to the 24×24 integer coordinate space.
- [ ] Component names use the strict `PXIcon*` prefix (rejecting `PX*`, `Pixel*`, `*Icon`).
- [ ] `npm test` passes with 100% success rate across all quality gates.
- [ ] `npm run validate:determinism` guarantees byte-identical generated output.
- [ ] Changeset added if public package APIs or canonical definitions were modified.
