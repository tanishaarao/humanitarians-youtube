# Registering the MidjourneyPrompts scenes in Brutalist

`PrmScenes.tsx` goes in `brutalist.art/runtime/remotion/src/`. Add these two pieces to `runtime/remotion/src/Root.tsx`, then run `./art scene-index`.
This video also uses `MjYourTurn` from `MjScenes.tsx` (see `../2026-11-13-midjourney-seeds/scenes/`).

Import:

```tsx
import {
  PrmThought, prmThoughtSchema, PrmThought916, PrmExample, prmExampleSchema, PrmExample916, PrmSlider, prmSliderSchema, PrmSlider916, PrmSeven, prmSevenSchema, PrmSeven916, PrmScript, prmScriptSchema, PrmScript916, PrmBuild, prmBuildSchema, PrmBuild916, PrmTips, prmTipsSchema, PrmTips916, PrmNext, prmNextSchema, PrmNext916,
} from './PrmScenes';
```

Compositions:

```tsx
      <Folder name="MidjourneyPrompts">
        <Composition id="PrmThought" component={PrmThought} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmThoughtSchema} defaultProps={prmThoughtSchema.parse({points: []})} />
        <Composition id="PrmThought916" component={PrmThought916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmThoughtSchema} defaultProps={prmThoughtSchema.parse({points: []})} />
        <Composition id="PrmExample" component={PrmExample} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmExampleSchema} defaultProps={prmExampleSchema.parse({guideAt: 0.1, shortLabel: '', shortAt: 0.2, longLabel: '', longAt: 0.4, longPrompt: 'a', shortPrompt: 'b', exampleAt: 0.6, source: ''})} />
        <Composition id="PrmExample916" component={PrmExample916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmExampleSchema} defaultProps={prmExampleSchema.parse({guideAt: 0.1, shortLabel: '', shortAt: 0.2, longLabel: '', longAt: 0.4, longPrompt: 'a', shortPrompt: 'b', exampleAt: 0.6, source: ''})} />
        <Composition id="PrmSlider" component={PrmSlider} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmSliderSchema} defaultProps={prmSliderSchema.parse({fewerAt: 0.2, lessAt: 0.4, rightAt: 0.7, fewer: '', less: '', right: ''})} />
        <Composition id="PrmSlider916" component={PrmSlider916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmSliderSchema} defaultProps={prmSliderSchema.parse({fewerAt: 0.2, lessAt: 0.4, rightAt: 0.7, fewer: '', less: '', right: ''})} />
        <Composition id="PrmSeven" component={PrmSeven} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmSevenSchema} defaultProps={prmSevenSchema.parse({items: [{text: 'subject', at: 0.2}], guessAt: 0.7, guess: '', source: ''})} />
        <Composition id="PrmSeven916" component={PrmSeven916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmSevenSchema} defaultProps={prmSevenSchema.parse({items: [{text: 'subject', at: 0.2}], guessAt: 0.7, guess: '', source: ''})} />
        <Composition id="PrmScript" component={PrmScript} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmScriptSchema} defaultProps={prmScriptSchema.parse({label: '', labelAt: 0.1, lines: ['a b'], marks: []})} />
        <Composition id="PrmScript916" component={PrmScript916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmScriptSchema} defaultProps={prmScriptSchema.parse({label: '', labelAt: 0.1, lines: ['a b'], marks: []})} />
        <Composition id="PrmBuild" component={PrmBuild} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmBuildSchema} defaultProps={prmBuildSchema.parse({start: 'a', startAt: 0.05, answeredAt: 0.3, note: '', parts: []})} />
        <Composition id="PrmBuild916" component={PrmBuild916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmBuildSchema} defaultProps={prmBuildSchema.parse({start: 'a', startAt: 0.05, answeredAt: 0.3, note: '', parts: []})} />
        <Composition id="PrmTips" component={PrmTips} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmTipsSchema} defaultProps={prmTipsSchema.parse({cards: []})} />
        <Composition id="PrmTips916" component={PrmTips916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmTipsSchema} defaultProps={prmTipsSchema.parse({cards: []})} />
        <Composition id="PrmNext" component={PrmNext} durationInFrames={450} fps={30} width={1920} height={1080}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmNextSchema} defaultProps={prmNextSchema.parse({headAt: 0.05, steps: []})} />
        <Composition id="PrmNext916" component={PrmNext916} durationInFrames={450} fps={30} width={1080} height={1920}
          calculateMetadata={({props}) => ({durationInFrames: Math.ceil(((props as any).durationSeconds ?? 15) * 30)})}
          schema={prmNextSchema} defaultProps={prmNextSchema.parse({headAt: 0.05, steps: []})} />
      </Folder>
```

## Assets

Needs `icons/logos/midjourney/midjourney-01.svg` and `icons/logos/claude/claude-01.svg` copied to `runtime/remotion/public/logos/<name>/`.
