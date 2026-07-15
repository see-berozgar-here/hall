export function classNames(...tokens) {
  return tokens.filter(Boolean).join(' ');
}
