#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  trapstreet-eval installer
# ─────────────────────────────────────────────────────────────────────────────
#  What this script does, exhaustively:
#    • Downloads 3 files (SKILL.md, questions.json, grade.py) from a pinned
#      GitHub release tag.
#    • Verifies each file against a SHA-256 checksum from the same release.
#    • Copies them into:  ~/.claude/skills/trapstreet-eval/
#    • Marks grade.py executable.
#
#  What this script DOES NOT do:
#    • No sudo. No system-wide changes. No package installs.
#    • Does not modify shell rc files (.zshrc, .bashrc, .profile, …).
#    • Does not create launch agents, daemons, cron jobs, or login items.
#    • Does not phone home, collect telemetry, or read files outside its dest.
#    • Does not change permissions or ownership outside its dest.
#
#  Source-of-truth release:
#    https://github.com/AntiNoise-ai/trapstreet-eval-demo/releases
#  Security policy & verification instructions:
#    https://github.com/AntiNoise-ai/trapstreet/blob/main/SECURITY.md
#
#  Uninstall:
#    rm -rf ~/.claude/skills/trapstreet-eval
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

VERSION="${TRAPSTREET_VERSION:-v0.1.0}"
REPO="${TRAPSTREET_REPO:-AntiNoise-ai/trapstreet-eval-demo}"
DEST="${TRAPSTREET_DEST:-$HOME/.claude/skills/trapstreet-eval}"
BASE_URL="${TRAPSTREET_BASE_URL:-https://github.com/${REPO}/releases/download/${VERSION}}"

FILES=(SKILL.md questions.json grade.py)

# ─── helpers ─────────────────────────────────────────────────────────────────

err()  { printf '\033[31merror:\033[0m %s\n' "$*" >&2; exit 1; }
info() { printf '\033[36m→\033[0m %s\n' "$*"; }
ok()   { printf '\033[32m✓\033[0m %s\n' "$*"; }

have() { command -v "$1" >/dev/null 2>&1; }

fetch() {  # fetch URL → dest path
  local url="$1" dest="$2"
  if have curl; then
    curl -fsSL --proto '=https' --tlsv1.2 "$url" -o "$dest"
  elif have wget; then
    wget -q "$url" -O "$dest"
  else
    err "need curl or wget on PATH"
  fi
}

sha256() {  # print hex digest of $1
  if   have sha256sum; then sha256sum   "$1" | awk '{print $1}'
  elif have shasum;    then shasum -a 256 "$1" | awk '{print $1}'
  else err "need sha256sum or shasum on PATH"
  fi
}

# ─── banner ──────────────────────────────────────────────────────────────────

info "trapstreet-eval ${VERSION}"
info "source: https://github.com/${REPO} (tag ${VERSION})"
info "dest:   ${DEST}"
echo

# ─── local-clone path ────────────────────────────────────────────────────────
# If you cloned the repo and are running ./skill/install.sh, copy from the
# adjacent trapstreet-eval/ directory. Skipped if TRAPSTREET_FORCE_REMOTE=1.
#
# Important: only resolve the local source when BASH_SOURCE[0] is a real file
# on disk. When piped via `curl | bash`, BASH_SOURCE[0] is empty and would
# otherwise resolve to $PWD — which would let an attacker who controls a
# `trapstreet-eval/` directory in the user's CWD bypass checksum verification.

LOCAL_SRC=""
if [[ -n "${BASH_SOURCE[0]:-}" && -f "${BASH_SOURCE[0]}" ]]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  [[ -d "$SCRIPT_DIR/trapstreet-eval" ]] && LOCAL_SRC="$SCRIPT_DIR/trapstreet-eval"
fi

if [[ -n "$LOCAL_SRC" && "${TRAPSTREET_FORCE_REMOTE:-0}" != "1" ]]; then
  info "local clone detected → installing from $LOCAL_SRC"
  mkdir -p "$DEST"
  for f in "${FILES[@]}"; do
    [[ -f "$LOCAL_SRC/$f" ]] || err "missing in local clone: $f"
    install -m 644 "$LOCAL_SRC/$f" "$DEST/$f"
  done
  chmod +x "$DEST/grade.py"
  ok "installed from local clone"
  ok "run /trapstreet-eval in any Claude Code session"
  exit 0
fi

# ─── verified-remote path ────────────────────────────────────────────────────

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

info "fetching SHA256SUMS"
fetch "${BASE_URL}/SHA256SUMS" "$TMP/SHA256SUMS"

for f in "${FILES[@]}"; do
  info "fetching $f"
  fetch "${BASE_URL}/${f}" "$TMP/$f"
done

info "verifying checksums"
for f in "${FILES[@]}"; do
  expected="$(awk -v want="$f" '
    {
      name = $2
      sub(/^\*/, "", name)
      if (name == want) { print $1; exit }
    }
  ' "$TMP/SHA256SUMS")"
  [[ -n "$expected" ]] || err "no checksum for $f in SHA256SUMS"
  actual="$(sha256 "$TMP/$f")"
  if [[ "$actual" != "$expected" ]]; then
    err "checksum mismatch for $f
    expected: $expected
    actual:   $actual
  Do NOT install. Report at: https://github.com/${REPO}/security/advisories/new"
  fi
  ok "$f"
done

info "installing to $DEST"
mkdir -p "$DEST"
for f in "${FILES[@]}"; do
  install -m 644 "$TMP/$f" "$DEST/$f"
done
chmod +x "$DEST/grade.py"

echo
ok "installed trapstreet-eval ${VERSION} to ${DEST}"
ok "run /trapstreet-eval in any Claude Code session"
echo
echo "uninstall: rm -rf $DEST"
