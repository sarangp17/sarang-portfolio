export function openLink(url) {
  const w = window.open(url, '_blank');
  if (w) {
    try { w.opener = null; } catch { /* ignore */ }
  } else {
    window.location.href = url;
  }
}
