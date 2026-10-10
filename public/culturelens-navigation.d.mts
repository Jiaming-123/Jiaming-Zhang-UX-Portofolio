export function chapterAtPosition(chapters: { id: string; top: number }[], readingLine: number): string;
export function setupChapterNavigation(root: HTMLElement, onActive: (id: string) => void): () => void;
