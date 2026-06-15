export interface TocLeaf {
  navTitle: string;
  target: string;
}

export interface TocGroup {
  navTitle: string;
  target?: string;
  children?: readonly TocLeaf[];
}

export function flattenTocTargets(groups: readonly TocGroup[]): string[] {
  const targets: string[] = [];
  for (const group of groups) {
    if (group.target) targets.push(group.target);
    if (group.children) {
      for (const child of group.children) targets.push(child.target);
    }
  }
  return targets;
}
