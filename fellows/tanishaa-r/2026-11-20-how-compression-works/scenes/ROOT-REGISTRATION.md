# Registering the HowCompressionWorks scenes in Brutalist

`CmpScenes.tsx` goes in `brutalist.art/runtime/remotion/src/`. Add these two pieces to `runtime/remotion/src/Root.tsx`, then run `./art scene-index`.
This video also uses `MjYourTurn` from `MjScenes.tsx` (see `../2026-11-13-midjourney-seeds/scenes/`).

Import:

```tsx
import {
  CmpHook, cmpHookSchema, CmpHook916, CmpColumns, cmpColumnsSchema, CmpColumns916, CmpRepeat, cmpRepeatSchema, CmpRepeat916, CmpMorse, cmpMorseSchema, CmpMorse916, CmpLossless, cmpLosslessSchema, CmpLossless916, CmpCounting, cmpCountingSchema, CmpCounting916, CmpBlocks, cmpBlocksSchema, CmpBlocks916, CmpPhoto, cmpPhotoSchema, CmpPhoto916,
} from './CmpScenes';
```

Compositions:

```tsx
      <Folder name="HowCompressionWorks">
        <Composition id="CmpHook" component={CmpHook} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpHookSchema} defaultProps={cmpHookSchema.parse({shrinkAt: 0.2, points: []})} />
        <Composition id="CmpHook916" component={CmpHook916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpHookSchema} defaultProps={cmpHookSchema.parse({shrinkAt: 0.2, points: []})} />
        <Composition id="CmpColumns" component={CmpColumns} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpColumnsSchema} defaultProps={cmpColumnsSchema.parse({left: {header: 'a', at: 0.1, items: []}, right: {header: 'b', at: 0.5, items: []}})} />
        <Composition id="CmpColumns916" component={CmpColumns916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpColumnsSchema} defaultProps={cmpColumnsSchema.parse({left: {header: 'a', at: 0.1, items: []}, right: {header: 'b', at: 0.5, items: []}})} />
        <Composition id="CmpRepeat" component={CmpRepeat} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpRepeatSchema} defaultProps={cmpRepeatSchema.parse({source: 'a', line: 'abcabc', literals: 3, back: 3, len: 3, lineAt: 0.1, literalsAt: 0.3, noteAt: 0.5, tailAt: 0.8, tail: ''})} />
        <Composition id="CmpRepeat916" component={CmpRepeat916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpRepeatSchema} defaultProps={cmpRepeatSchema.parse({source: 'a', line: 'abcabc', literals: 3, back: 3, len: 3, lineAt: 0.1, literalsAt: 0.3, noteAt: 0.5, tailAt: 0.8, tail: ''})} />
        <Composition id="CmpMorse" component={CmpMorse} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpMorseSchema} defaultProps={cmpMorseSchema.parse({introAt: 0.05, eAt: 0.2, qAt: 0.5, ruleAt: 0.8})} />
        <Composition id="CmpMorse916" component={CmpMorse916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpMorseSchema} defaultProps={cmpMorseSchema.parse({introAt: 0.05, eAt: 0.2, qAt: 0.5, ruleAt: 0.8})} />
        <Composition id="CmpLossless" component={CmpLossless} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpLosslessSchema} defaultProps={cmpLosslessSchema.parse({rhymeBytes: 424, rhymeZip: 87, randomBytes: 424, randomZip: 435, identical: true, rhymeAt: 0.1, zipAt: 0.3, sameAt: 0.5, randomAt: 0.7, biggerAt: 0.85, footnote: ''})} />
        <Composition id="CmpLossless916" component={CmpLossless916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpLosslessSchema} defaultProps={cmpLosslessSchema.parse({rhymeBytes: 424, rhymeZip: 87, randomBytes: 424, randomZip: 435, identical: true, rhymeAt: 0.1, zipAt: 0.3, sameAt: 0.5, randomAt: 0.7, biggerAt: 0.85, footnote: ''})} />
        <Composition id="CmpCounting" component={CmpCounting} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpCountingSchema} defaultProps={cmpCountingSchema.parse({longAt: 0.1, ruleAt: 0.4, patternAt: 0.7, source: ''})} />
        <Composition id="CmpCounting916" component={CmpCounting916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpCountingSchema} defaultProps={cmpCountingSchema.parse({longAt: 0.1, ruleAt: 0.4, patternAt: 0.7, source: ''})} />
        <Composition id="CmpBlocks" component={CmpBlocks} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpBlocksSchema} defaultProps={cmpBlocksSchema.parse({photo: 'compression/original.png', blocksAt: 0.1, keepAt: 0.4, dropAt: 0.55, colourAt: 0.75})} />
        <Composition id="CmpBlocks916" component={CmpBlocks916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpBlocksSchema} defaultProps={cmpBlocksSchema.parse({photo: 'compression/original.png', blocksAt: 0.1, keepAt: 0.4, dropAt: 0.55, colourAt: 0.75})} />
        <Composition id="CmpPhoto" component={CmpPhoto} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpPhotoSchema} defaultProps={cmpPhotoSchema.parse({tiles: [], testAt: 0.05, footnote: ''})} />
        <Composition id="CmpPhoto916" component={CmpPhoto916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={cmpPhotoSchema} defaultProps={cmpPhotoSchema.parse({tiles: [], testAt: 0.05, footnote: ''})} />
      </Folder>
```

## Assets

Copy `assets/*.png` (output of `demo/compress_demo.py`) to `runtime/remotion/public/compression/`.
