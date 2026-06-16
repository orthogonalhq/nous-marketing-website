# Mockup 02 chat text component audit

Date: 2026-05-25

## Scope

This audit compares the text components used in #2's current left message pane against #1's homepage chat text system.

Files audited:

- #1 source layout and text flow: `src/components/product-mockups/homepage-chat-section-mockup.tsx`
- Shared conversation primitives: `src/components/mockups/conversation/conversation-primitives.tsx`
- #2 current helper conversation: `src/components/product-mockups/saved-workflow-companion-panel.tsx`
- #2 layout shell: `src/components/product-mockups/saved-workflow-run-wireframe-mockup.tsx`
- Relevant tokens: `src/styles/tokens/components.css`

## 01 chat text source of truth

The completed #1 chat transcript is not a stack of independent cards. It is a controlled text flow:

1. **Optional user message bubble**
   - `MessageBubble role="user"`
   - Right aligned with `self-end`.
   - Used for the user's prompt only.

2. **Assistant response article**
   - Rendered by `StructuredAssistantResponse`.
   - Uses a flat article, not a message bubble/card shell:
     - `flex flex-col self-stretch`
     - `text-xs leading-[var(--nous-leading-drawer)]`
     - `text-[var(--nous-drawer-body-fg-strong)]`

3. **Working/status row**
   - A compact status line such as `Worked for 8s`.
   - It has a subtle bottom divider and metadata color.
   - It is not a bordered rounded card.

4. **Assistant prose blocks**
   - Paragraph groups use `WorkingBlock` / `WorkingParagraph`.
   - Spacing comes from:
     - `--nous-assistant-response-section-gap`
     - `--nous-assistant-response-paragraph-gap`
   - Text is plain, low-chrome prose.

5. **Tool calls / execution details**
   - In #1, tool-call details sit inline because the chat is the active execution surface.
   - In #2, the workflow graph is the execution surface, so chat should not render tool calls.

6. **Final answer / proposal**
   - The final prose appears as plain paragraphs.
   - The proposal card is the main card-like object in the text flow.

7. **Composer**
   - Uses compact `CommandComposer` once the conversation is active.
   - This part of #2 is directionally close to #1.

## Current #2 chat text implementation

#2 currently renders helper content in `SavedWorkflowCompanionChat` as:

1. Plain intro prose for the helper opening sentence.
2. `AssistantResponseFlow` for the inline status/prose response.
3. `RunningWorkflow` as a purple workflow execution disclosure.
4. `ProposalCard` as the primary approval card-like response item.
5. Compact `CommandComposer`.

This now uses the shared assistant-response flow primitive instead of a card stack, which is much closer to #1's text anatomy.

## Mismatch findings

### 1. #2 uses message bubbles where #1 uses a flat assistant article

#2 previously put intro text inside `MessageBubble role="assistant"`. That specific issue has been corrected: the opening text now renders as plain prose.

#1's primary assistant response is not a bubble. It is a full-width, flat text article with prose sections and inline tool/proposal elements.

Impact:

- Before the fix, #2 read as stacked cards inside the left pane.
- #1 reads as a single assistant response stream.
- Removing the intro bubble corrected the first source of excess chrome.

### 2. #2 `WorkingPanel` is card-like, while #1's working area is inline

#2 previously used `WorkingPanel`, which renders:

- rounded border
- assistant-card background
- header row
- body inside a separate card shell

#1's working state is an inline accordion/status section inside the assistant article:

- no enclosing rounded assistant card
- one metadata status row
- prose blocks below

Impact:

- #2 doubles up card chrome: intro bubble + thinking card + proposal card.
- The visual weight is wrong for #1 alignment.

Status:

- Fixed. #2 now uses `AssistantResponseFlow` and `AssistantResponseSection` instead of `WorkingPanel` for the worked/thinking area.
- The status row is inline, and the thinking/prose text sits in the same assistant response flow.

### 3. #2 adds app/header metadata inside the text body

#2 previously included app/status/title metadata inside the first assistant message bubble. That has been replaced with plain prose:

- `Andrew, I have started working on your meal prep plan for the week...`

#1's transcript does not put app-header/status metadata inside a chat bubble. It shows conversational prose and status rows as part of the assistant response flow.

Impact:

- This specific opening line no longer feels like a notification card.
- The app-header hierarchy has been removed from the transcript text.

### 4. #2 splits a single assistant response into multiple sibling components

#2 previous stack:

```tsx
<CompanionMessage />
<WorkingThinkingCard />
<CompanionToolCalls />
<ApprovalProposalCard />
```

#1 stack:

```tsx
<StructuredAssistantResponse>
  status row
  working prose
  final prose
   running workflow disclosure
   proposal card
</StructuredAssistantResponse>
```

Impact:

- Before the fix, #2 spacing and rhythm were driven by transcript item gaps.
- #2 now uses assistant-response section gaps within one response flow, matching #1 more closely.

### 5. The shared primitives needed an assistant response text flow

`MessageBubble`, `WorkingPanel`, `ToolCallList`, and `ProposalCard` are useful, but they do not cover #1's main assistant article pattern. For #2 specifically, `ToolCallList` should not render in chat because the workflow graph owns execution visibility. A workflow-specific disclosure is appropriate because the running unit is the saved workflow, not a chat tool call.

The missing primitive was a reusable assistant response/text-flow primitive derived from `StructuredAssistantResponse`:

- flat response article
- status row
- section/prose rhythm
- optional inline execution details for chat-owned work
- optional final/proposal section

Status:

- Added `AssistantResponseFlow` and `AssistantResponseSection` to `src/components/mockups/conversation/conversation-primitives.tsx`.
- Added `RunningWorkflow`, modeled after `ToolCallList` but using a purple workflow treatment and workflow icon.
- Exported them through `src/components/mockups/conversation/index.ts`.
- Removed chat tool-call rendering from #2; workflow progress is represented by the workflow graph plus the workflow-specific disclosure.

### 6. #2's left pane width makes card-heavy text feel cramped

The left pane uses `--nous-home-chat-sidebar-width` (`364px`). #1's transcript width is `610px`.

Using full card shells inside a 364px pane increases density. #1's text flow can tolerate the narrower pane better if it is mostly flat prose with only the proposal card as the primary card object.

## What is already correct

- The #2 active render path no longer uses app chrome.
- Messages are now on the left.
- It is no longer an asset/nav sidebar.
- Helper-only view is now server-rendered.
- #2 already uses the correct token families for message type, composer, and proposals.
- The compact composer is broadly aligned with #1.

## Recommended fix

### High-confidence fix

Create and use a shared assistant response flow primitive, for example:

```tsx
<AssistantResponseFlow status="Workflow ran for 4s" statusMeta="Waiting for approval">
  <AssistantResponseSection>
    <p>Andrew, I have started working on your meal prep plan for the week...</p>
    <p>You’re out Tuesday evening...</p>
  </AssistantResponseSection>
  <RunningWorkflow ... />
  <AssistantResponseSection>
    <p>I planned five dinners around your week...</p>
  </AssistantResponseSection>
  <ProposalCard ... />
</AssistantResponseFlow>
```

Target location:

- `src/components/mockups/conversation/conversation-primitives.tsx`

Status: **Done.**

Then update #2:

- Remove `MessageBubble` from the helper intro. **Done.**
- Remove `WorkingPanel` from the helper thinking state. **Done.**
- Render helper content as one flat assistant response flow. **Done.**
- Do not render chat tool calls for #2 because the workflow graph is the execution surface. **Done.**
- Render a running workflow component instead of a tool-call component. **Done.**
- Keep `ProposalCard` as the only major card-like text element. **Done.**
- Keep compact `CommandComposer`. **Done.**

### Optional follow-up

If #2 needs a small helper identity label, render it as a subtle line outside the assistant text flow, not inside a message bubble. For #1 parity, prefer omitting the label unless the scenario needs it.

## Severity

High for visual fidelity.

The highest-severity text anatomy issues found in this audit have been addressed: the helper intro is plain prose, the work card has been replaced by an inline assistant response flow, and the proposal card is now the primary remaining card-like object in the chat text area.
