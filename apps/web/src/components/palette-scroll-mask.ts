export function bindPaletteScrollMask(list: HTMLElement): () => void {
  const updateMaskState = () => {
    const isScrollable = list.scrollHeight > list.clientHeight + 1;

    if (!isScrollable) {
      list.dataset.scrollable = "false";
      list.dataset.scrollTop = "false";
      list.dataset.scrollBottom = "false";
      return;
    }

    const atTop = list.scrollTop <= 1;
    const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;

    list.dataset.scrollable = "true";
    list.dataset.scrollTop = atTop ? "false" : "true";
    list.dataset.scrollBottom = atBottom ? "false" : "true";
  };

  const onScroll = () => updateMaskState();
  const onMutation = () => {
    window.requestAnimationFrame(updateMaskState);
  };

  list.addEventListener("scroll", onScroll, { passive: true });

  const resizeObserver = new ResizeObserver(updateMaskState);
  resizeObserver.observe(list);

  const mutationObserver = new MutationObserver(onMutation);
  mutationObserver.observe(list, {
    childList: true,
    characterData: true,
    subtree: true
  });

  updateMaskState();
  window.requestAnimationFrame(updateMaskState);

  return () => {
    list.removeEventListener("scroll", onScroll);
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  };
}
