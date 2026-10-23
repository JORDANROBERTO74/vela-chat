import type { Dictionary, ReplyIntent } from "@/i18n/dictionaries/en";

const patterns: { intent: Exclude<ReplyIntent, "generic">; test: RegExp }[] = [
  {
    intent: "summarize",
    test: /resum|síntesis|sintesis|summar|key points|puntos clave/i,
  },
  {
    intent: "brainstorm",
    test: /brainstorm|idear|ideas?|opciones|options/i,
  },
  {
    intent: "plan",
    test: /plan|roadmap|steps?|pasos?|planificar/i,
  },
];

export function detectIntent(text: string): ReplyIntent {
  for (const { intent, test } of patterns) {
    if (test.test(text)) {
      return intent;
    }
  }

  return "generic";
}

/**
 * Deterministic, local reply. This demo never calls a model: the answer is
 * picked from the active locale's templates based on the message's intent.
 */
export function buildReply(text: string, dict: Dictionary): string {
  return dict.replies[detectIntent(text)];
}
