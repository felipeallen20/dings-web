import type {
  Product,
  ProductOption,
  ProductOptionGroup,
} from "@/types/menu";
import type { SelectedOptionGroup } from "@/types/cart";

export type ProductSelections = Record<string, string[]>;

export function getModifierGroups(
  product: Product,
): ProductOptionGroup[] {
  return product.modifierGroups ?? [];
}

export function hasModifierGroups(product: Product): boolean {
  return getModifierGroups(product).length > 0;
}

export function createDefaultSelections(
  groups: ProductOptionGroup[],
): ProductSelections {
  const selections: ProductSelections = {};

  for (const group of groups) {
    if (group.type === "single" && group.required && group.min !== 0) {
      selections[group.id] = [group.options[0]?.id].filter(
        (id): id is string => Boolean(id),
      );
      continue;
    }

    selections[group.id] = [];
  }

  return selections;
}

export function findOption(
  groups: ProductOptionGroup[],
  groupId: string,
  optionId: string,
): ProductOption | undefined {
  return groups
    .find((group) => group.id === groupId)
    ?.options.find((option) => option.id === optionId);
}

export function toggleOption(
  selections: ProductSelections,
  group: ProductOptionGroup,
  optionId: string,
): ProductSelections {
  const current = selections[group.id] ?? [];

  if (group.type === "single") {
    return {
      ...selections,
      [group.id]: [optionId],
    };
  }

  const isSelected = current.includes(optionId);

  if (!isSelected && group.max !== undefined && current.length >= group.max) {
    return selections;
  }

  return {
    ...selections,
    [group.id]: isSelected
      ? current.filter((id) => id !== optionId)
      : [...current, optionId],
  };
}

export function isGroupLimitReached(
  group: ProductOptionGroup,
  selections: ProductSelections,
): boolean {
  if (group.type !== "multiple" || group.max === undefined) return false;
  return (selections[group.id] ?? []).length >= group.max;
}

export function getMissingGroupIds(
  groups: ProductOptionGroup[],
  selections: ProductSelections,
): string[] {
  return groups
    .filter((group) => {
      if (!group.required) return false;
      const selected = selections[group.id] ?? [];
      const min = group.min ?? 1;
      return selected.length < min;
    })
    .map((group) => group.id);
}

export function getModifierTotal(
  groups: ProductOptionGroup[],
  selections: ProductSelections,
): number {
  let total = 0;

  for (const group of groups) {
    for (const optionId of selections[group.id] ?? []) {
      total += findOption(groups, group.id, optionId)?.priceDelta ?? 0;
    }
  }

  return total;
}

export function getUnitPrice(
  groups: ProductOptionGroup[],
  selections: ProductSelections,
  basePrice: number,
): number {
  return basePrice + getModifierTotal(groups, selections);
}

export function buildSelectionSummary(
  groups: ProductOptionGroup[],
  selections: ProductSelections,
): SelectedOptionGroup[] {
  return groups
    .map((group) => ({
      groupId: group.id,
      groupName: group.name,
      optionNames: (selections[group.id] ?? [])
        .map(
          (optionId) =>
            findOption(groups, group.id, optionId)?.name ?? optionId,
        )
        .filter((name) => name.length > 0),
    }))
    .filter((entry) => entry.optionNames.length > 0);
}