# ERP Design-System vs shadcn/ui — Consolidation Evaluation

## Summary

The ERP design-system (`modules/erp/design-system/components/`) is **80%+ re-export layer** over shadcn/ui. Only 5 components contain real custom logic. The rest are pass-through wrappers that add indirection without value.

## Audit Results

| Component | Type | Action |
|-----------|------|--------|
| alert | Re-export of `@/components/ui/alert` | **Remove** — import from `@/components/ui/alert` directly |
| animations | Custom framer-motion variants | **Promoted** to `src/lib/motion.ts` |
| avatar | Re-export of `@/components/ui/avatar` | **Remove** — import from shadcn directly |
| badge | Re-export + `statusBadgeVariants` | **Keep** variants in `src/lib/variants.ts`, remove re-export |
| button | Re-export + `customButtonVariants` | **Keep** variants in `src/lib/variants.ts`, remove re-export |
| card | Custom `StatCard` with motion | **Promoted** to `src/components/shared/stat-card.tsx` |
| command-palette | Re-export of `@/components/ui/command` | **Remove** |
| date-picker | Re-export of calendar + popover | **Remove** |
| dropdown | Re-export of dropdown-menu | **Remove** |
| file-upload | Custom drop zone | **Promoted** to `src/components/shared/file-upload.tsx` |
| form-field | Custom with `useId` + `htmlFor` | **Promoted** to `src/lib/form-helpers.tsx` (AccessibleField) |
| input | Re-export + `inputVariants` | **Keep** variants in `src/lib/variants.ts`, remove re-export |
| modal | Custom dialog wrapper | **Keep** — has real logic |
| rich-text | Placeholder (empty) | **Remove** — use lazy-mdx-editor instead |
| select | Re-export of shadcn select | **Remove** |
| separator | Re-export of shadcn separator | **Remove** |
| skeleton | Re-export of shadcn skeleton | **Remove** |
| spinner | Custom spinner | **Promoted** to `src/components/shared/spinner.tsx` |
| switch | Re-export of shadcn switch | **Remove** |
| table | Custom table wrapper | **Keep** — has real logic |
| tabs | Re-export of shadcn tabs | **Remove** |
| tooltip | Re-export of shadcn tooltip | **Remove** |

## Recommended Migration Path

1. ✅ **Phase 3 (done)**: Promote reusable custom components to `src/components/shared/` and `src/lib/`
2. **Phase 4**: Update ERP imports to use `@/components/ui/` directly for re-exported components
3. **Phase 5**: Remove the ERP design-system re-export layer entirely, keeping only the 3 components with real logic (modal, table, badge variants)

## Impact

- **~20 import paths** across ERP pages need updating (currently import from `@/modules/erp/design-system`)
- **0 breaking changes** for other modules (CRM, Finance, Marketing don't use ERP design-system)
- **Estimated bundle impact**: Neutral (tree-shaking already eliminates unused re-exports)
- **Maintainability gain**: Single source of truth for component APIs instead of 2 layers
