import type { Message, MessageRole, SeedChat } from "@/i18n/dictionaries/en";

export const storageKey = "vela.chats.v1";

export type ChatModel = "balanced" | "fast";

export type StoredChat = {
  id: string;
  /** Only set when the visitor renames a chat or starts a new one. */
  title?: string;
  /** Messages added at runtime; seed messages live in the dictionary. */
  extra: Message[];
};

export type ChatState = {
  activeId: string;
  chats: Record<string, StoredChat>;
  model: ChatModel;
};

export function createInitialState(seeds: SeedChat[]): ChatState {
  return {
    activeId: seeds[0]?.id ?? "new",
    chats: {},
    model: "balanced",
  };
}

function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Partial<Message>;

  return (
    typeof message.id === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    typeof message.text === "string"
  );
}

/**
 * Reads persisted chats and validates every field. Anything malformed falls
 * back to the seed state instead of breaking the interface.
 */
export function loadState(seeds: SeedChat[]): ChatState {
  const fallback = createInitialState(seeds);

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as Partial<ChatState>;
    const chats: Record<string, StoredChat> = {};

    if (parsed.chats && typeof parsed.chats === "object") {
      for (const [id, value] of Object.entries(parsed.chats)) {
        if (!value || typeof value !== "object") {
          continue;
        }

        const chat = value as Partial<StoredChat>;
        if (!Array.isArray(chat.extra)) {
          continue;
        }

        chats[id] = {
          id,
          title:
            typeof chat.title === "string" && chat.title.trim().length > 0
              ? chat.title.trim().slice(0, 80)
              : undefined,
          extra: chat.extra.filter(isMessage).slice(-200),
        };
      }
    }

    const known = new Set([...seeds.map((seed) => seed.id), ...Object.keys(chats)]);
    const activeId =
      typeof parsed.activeId === "string" && known.has(parsed.activeId)
        ? parsed.activeId
        : fallback.activeId;

    return {
      activeId,
      chats,
      model: parsed.model === "fast" ? "fast" : "balanced",
    };
  } catch {
    return fallback;
  }
}

export function saveState(state: ChatState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Storage can be unavailable in private mode or full; the demo still works.
  }
}

export function clearState(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // Nothing to clear.
  }
}

export function newChatId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `chat-${crypto.randomUUID()}`;
  }

  return `chat-${Date.now().toString(36)}`;
}

export function newMessageId(role: MessageRole): string {
  return `${role}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

/**
 * Builds a conversation title from the first message, cutting on a word
 * boundary so the sidebar never shows a half-finished word.
 */
export function deriveTitle(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 56) {
    return clean;
  }

  const cut = clean.slice(0, 56);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 24 ? cut.slice(0, lastSpace) : cut;

  return `${base.trimEnd()}…`;
}

