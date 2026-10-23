export function formatMessageCount(
  count: number,
  locale: string,
  forms: { one: string; other: string },
): string {
  const rule = new Intl.PluralRules(locale).select(count);
  const template = rule === "one" ? forms.one : forms.other;

  return template.replace(
    "{count}",
    new Intl.NumberFormat(locale).format(count),
  );
}
