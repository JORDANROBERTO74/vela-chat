/**
 * English dictionary. It defines the shape every other locale must implement:
 * `Dictionary` is derived from this object, so a missing key in another locale
 * is a type error rather than a blank space in production.
 */

export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  text: string;
};

export type SeedChat = {
  id: string;
  title: string;
  messages: Message[];
};

export type ReplyIntent = "summarize" | "brainstorm" | "plan" | "generic";

const chats: SeedChat[] = [
  {
    id: "spring-launch",
    title: "Spring campaign brief",
    messages: [
      {
        id: "spring-launch-1",
        role: "user",
        text: "Help me shape the launch brief for the spring campaign. We have three weeks and a small budget.",
      },
      {
        id: "spring-launch-2",
        role: "assistant",
        text: "Three weeks is enough if we keep the scope narrow. I would structure the brief around one promise, one audience and one channel.\n\n1. Promise: the single sentence a customer should remember.\n2. Audience: the group most likely to act in week one.\n3. Channel: the one place we can show up consistently for three weeks.\n\nDraft those three lines and I will turn them into a one-page brief.",
      },
    ],
  },
  {
    id: "design-review",
    title: "Notes from the design review",
    messages: [
      {
        id: "design-review-1",
        role: "user",
        text: "Turn my scattered notes into a short summary I can send to the team.",
      },
      {
        id: "design-review-2",
        role: "assistant",
        text: "Here is a compact version:\n\n• The new navigation tested well, but the labels need another pass.\n• Two flows still lose people at the confirmation step.\n• The team agreed to freeze visuals on Friday and fix copy next week.\n\nWant a shorter version for chat, or a slightly more formal one for email?",
      },
    ],
  },
  {
    id: "reading-list",
    title: "Weekend reading list",
    messages: [
      {
        id: "reading-list-1",
        role: "user",
        text: "Suggest a short reading list about calm technology.",
      },
      {
        id: "reading-list-2",
        role: "assistant",
        text: "Three directions rather than three titles:\n\n1. The ethics of attention: why products compete for focus, and what a calmer default could look like.\n2. The craft of slow interfaces: motion, pacing and silence as design materials.\n3. A fiction chaser: something long and absorbing that has nothing to do with work.\n\nTell me which direction you want and I will suggest specific pieces.",
      },
    ],
  },
  {
    id: "pricing-rewrite",
    title: "Pricing page rewrite",
    messages: [
      {
        id: "pricing-rewrite-1",
        role: "user",
        text: "Rewrite the pricing page intro so it sounds human, not corporate.",
      },
      {
        id: "pricing-rewrite-2",
        role: "assistant",
        text: "Try leading with the decision, not the feature list:\n\n“Pick the plan that matches how often you will use Vela. You can change it later; nothing is locked in.”\n\nThen let each plan card answer one question: who it is for, what it includes, and when it makes sense to move up. Keep the fine print below the cards.",
      },
    ],
  },
  {
    id: "onboarding-emails",
    title: "Onboarding email sequence",
    messages: [
      {
        id: "onboarding-emails-1",
        role: "user",
        text: "Outline a five-email onboarding sequence for a new user.",
      },
      {
        id: "onboarding-emails-2",
        role: "assistant",
        text: "A five-email sequence with one job each:\n\n1. Welcome: confirm the choice and set expectations.\n2. First win: one small action that produces a visible result.\n3. Habit: show the weekly use case.\n4. Doubt: answer the most common reason people stop.\n5. Invitation: ask for feedback or an upgrade, not both.\n\nSend them on days 0, 1, 3, 7 and 14.",
      },
    ],
  },
  {
    id: "quiet-research",
    title: "Research plan: quiet software",
    messages: [
      {
        id: "quiet-research-1",
        role: "user",
        text: "Draft a short research plan for a study on quiet software.",
      },
      {
        id: "quiet-research-2",
        role: "assistant",
        text: "A small study can still be useful:\n\n• Question: what makes an interface feel calm without feeling empty?\n• Method: five 30-minute interviews plus a diary study over one week.\n• Artifact: a one-page matrix of friction, pace and interruption.\n\nRecruit people who already use focus modes, and ask about the moments they turn notifications off.",
      },
    ],
  },
];

export const en = {
  meta: {
    title: "Vela — A quieter place to think",
    description:
      "A calm, bilingual chat workspace for shaping ideas, summaries and plans. A front-end demo with simulated replies.",
  },
  common: {
    brand: "Vela",
    tagline: "A quieter place to think",
    skip: "Skip to chat",
    close: "Close menu",
    language: "Language",
    demo: "Demo",
  },
  sidebar: {
    newChat: "New chat",
    searchLabel: "Search conversations",
    searchPlaceholder: "Search",
    recent: "Recent",
    noResults: "No conversations found.",
    reset: "Reset demo",
    resetQuestion: "Delete all local chats?",
    resetConfirm: "Reset",
    cancel: "Cancel",
    collapse: "Collapse sidebar",
    expand: "Expand sidebar",
  },
  topbar: {
    openMenu: "Open menu",
    rename: "Rename conversation",
    renameLabel: "Conversation title",
    save: "Save",
    cancel: "Cancel",
    messages: {
      one: "{count} message",
      other: "{count} messages",
    },
    user: {
      name: "Alex Rivera",
      initials: "AR",
    },
  },
  thread: {
    assistant: "Vela",
    you: "You",
    typing: "Vela is typing",
    messageFrom: "Message from {name}",
  },
  empty: {
    title: "What are we thinking about?",
    subtitle: "A quieter place to shape an idea, a summary or a plan.",
    suggestions: {
      summarize: {
        label: "Summarize a document",
        prompt: "Summarize the key points of this document:",
      },
      brainstorm: {
        label: "Brainstorm ideas",
        prompt: "Help me brainstorm ideas for",
      },
      plan: {
        label: "Draft a plan",
        prompt: "Create a step-by-step plan for",
      },
    },
  },
  composer: {
    placeholder: "Ask anything…",
    send: "Send message",
    hint: "Enter to send · Shift + Enter for a new line",
    disclaimer: "Demo · replies are simulated and stay in your browser.",
    model: "Model",
    models: {
      balanced: "Balanced",
      fast: "Fast",
    },
  },
  replies: {
    summarize:
      "Here is a compact summary you can reuse:\n\n• The goal is clear and the scope is small enough to finish.\n• Two dependencies need an owner before work starts.\n• The next checkpoint is a short review, not a full launch.\n\nWant this as a single paragraph instead of bullets?",
    brainstorm:
      "A few directions worth exploring:\n\n1. Start with the smallest version that still feels complete.\n2. Borrow a format from another field and adapt it.\n3. Ask what you would cut if you had half the time.\n\nPick one and I will expand it into a short outline.",
    plan:
      "A simple plan to start:\n\n1. Write the outcome in one sentence.\n2. List the three steps that make it visible.\n3. Put the first step on the calendar this week.\n\nTell me the deadline and I will tighten the sequence.",
    generic:
      "Let us make it concrete. Write the goal in one sentence, name who it is for, and pick the constraint that matters most. From there I can help you draft an outline, a summary or a plan.",
  },
  chats,
};

export type Dictionary = typeof en;
