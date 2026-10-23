"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary, Message } from "@/i18n/dictionaries/en";
import {
  clearState,
  createInitialState,
  deriveTitle,
  loadState,
  newChatId,
  newMessageId,
  saveState,
  type ChatModel,
  type ChatState,
} from "@/lib/chat-store";
import { buildReply } from "@/lib/reply";
import { Composer } from "./composer";
import { Sidebar, type ChatListItem } from "./sidebar";
import { Thread } from "./thread";
import { Topbar } from "./topbar";

export function ChatApp({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const seeds = dict.chats;
  const [state, setState] = useState<ChatState>(() => createInitialState(seeds));
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [pendingChatId, setPendingChatId] = useState<string | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");

  const timerRef = useRef<number | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  // Persisted chats are read after mount: the server has no access to
  // localStorage, so doing it during render would break hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
    setState(loadState(seeds));
    setHydrated(true);
  }, [seeds]);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [state, hydrated]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const seedIds = useMemo(() => new Set(seeds.map((seed) => seed.id)), [seeds]);

  const items = useMemo<ChatListItem[]>(() => {
    const fromSeeds = seeds.map((seed) => ({
      id: seed.id,
      title: state.chats[seed.id]?.title ?? seed.title,
    }));

    const fromVisitor = Object.values(state.chats)
      .filter((chat) => !seedIds.has(chat.id))
      .map((chat) => ({
        id: chat.id,
        title: chat.title ?? dict.sidebar.newChat,
      }));

    return [...fromSeeds, ...fromVisitor];
  }, [seeds, seedIds, state.chats, dict.sidebar.newChat]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return items;
    }

    return items.filter((item) => {
      if (item.title.toLowerCase().includes(needle)) {
        return true;
      }

      const seed = seeds.find((entry) => entry.id === item.id);
      const extra = state.chats[item.id]?.extra ?? [];

      return [...(seed?.messages ?? []), ...extra].some((message) =>
        message.text.toLowerCase().includes(needle),
      );
    });
  }, [items, query, seeds, state.chats]);

  const activeSeed = seeds.find((seed) => seed.id === state.activeId);
  const activeStored = state.chats[state.activeId];
  const activeTitle =
    activeStored?.title ?? activeSeed?.title ?? dict.sidebar.newChat;

  const messages = useMemo(
    () => [
      ...(activeSeed?.messages ?? []),
      ...(activeStored?.extra ?? []),
    ],
    [activeSeed, activeStored],
  );

  const focusComposer = () => {
    requestAnimationFrame(() => {
      const element = composerRef.current;
      if (!element) {
        return;
      }

      element.focus();
      element.setSelectionRange(element.value.length, element.value.length);
    });
  };

  const handleNewChat = () => {
    const activeIsEmpty =
      !seedIds.has(state.activeId) &&
      (activeStored?.extra.length ?? 0) === 0 &&
      !activeStored?.title;

    if (activeIsEmpty) {
      setDraft("");
      setMobileOpen(false);
      setRenaming(false);
      focusComposer();
      return;
    }

    const id = newChatId();
    setState((previous) => ({
      ...previous,
      activeId: id,
      chats: {
        ...previous.chats,
        [id]: { id, extra: [] },
      },
    }));
    setDraft("");
    setMobileOpen(false);
    setRenaming(false);
    focusComposer();
  };

  const handleSelect = (id: string) => {
    setState((previous) => ({ ...previous, activeId: id }));
    setDraft("");
    setMobileOpen(false);
    setRenaming(false);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text || pendingChatId) {
      return;
    }

    const chatId = state.activeId;
    const userMessage: Message = {
      id: newMessageId("user"),
      role: "user",
      text,
    };

    setState((previous) => {
      const existing = previous.chats[chatId] ?? { id: chatId, extra: [] };
      const isSeed = seedIds.has(chatId);

      return {
        ...previous,
        chats: {
          ...previous.chats,
          [chatId]: {
            ...existing,
            title:
              !isSeed && !existing.title ? deriveTitle(text) : existing.title,
            extra: [...existing.extra, userMessage],
          },
        },
      };
    });

    setDraft("");
    setPendingChatId(chatId);

    const delay = state.model === "fast" ? 350 : 950;

    timerRef.current = window.setTimeout(() => {
      const reply: Message = {
        id: newMessageId("assistant"),
        role: "assistant",
        text: buildReply(text, dict),
      };

      setState((previous) => {
        const existing = previous.chats[chatId] ?? { id: chatId, extra: [] };

        return {
          ...previous,
          chats: {
            ...previous.chats,
            [chatId]: {
              ...existing,
              extra: [...existing.extra, reply],
            },
          },
        };
      });

      setPendingChatId(null);
      timerRef.current = null;
    }, delay);
  };

  const handleSuggestion = (prompt: string) => {
    setDraft(prompt);
    focusComposer();
  };

  const handleStartRename = () => {
    setTitleDraft(activeTitle);
    setRenaming(true);
  };

  const handleSaveRename = () => {
    const title = titleDraft.trim();
    if (!title) {
      setRenaming(false);
      return;
    }

    setState((previous) => {
      const existing = previous.chats[previous.activeId] ?? {
        id: previous.activeId,
        extra: [],
      };

      return {
        ...previous,
        chats: {
          ...previous.chats,
          [previous.activeId]: { ...existing, title: title.slice(0, 80) },
        },
      };
    });
    setRenaming(false);
  };

  const handleReset = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setPendingChatId(null);
    clearState();
    setState(createInitialState(seeds));
    setDraft("");
    setQuery("");
    setRenaming(false);
  };

  const handleModelChange = (model: ChatModel) => {
    setState((previous) => ({ ...previous, model }));
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-paper">
      <Sidebar
        dict={dict}
        items={filteredItems}
        activeId={state.activeId}
        query={query}
        onQueryChange={setQuery}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
        onReset={handleReset}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Topbar
          dict={dict}
          locale={locale}
          title={activeTitle}
          messageCount={messages.length}
          renaming={renaming}
          titleDraft={titleDraft}
          onTitleDraftChange={setTitleDraft}
          onStartRename={handleStartRename}
          onSaveRename={handleSaveRename}
          onCancelRename={() => setRenaming(false)}
          onOpenMenu={() => setMobileOpen(true)}
        />

        <Thread
          dict={dict}
          messages={messages}
          pending={pendingChatId === state.activeId}
          onSuggestion={handleSuggestion}
        />

        <Composer
          dict={dict}
          value={draft}
          onChange={setDraft}
          onSubmit={handleSend}
          disabled={pendingChatId !== null}
          model={state.model}
          onModelChange={handleModelChange}
          textareaRef={composerRef}
        />
      </main>
    </div>
  );
}
