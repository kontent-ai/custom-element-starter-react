import { useCallback, useEffect, useState } from "react";

export const getElement = (elementCodename: string): Promise<ElementValue> => new Promise(resolve => {
  CustomElement.getElementValue(elementCodename, resolve);
});

export const useElements = (elementCodenames: ReadonlyArray<string>) => {
  const [watchedElements, setWatchedElements] = useState<ReadonlyMap<string, ElementValue> | null>(null);

  const updateCodenames = useCallback((changedCodenames: ReadonlyArray<string>) =>
    Promise.all(changedCodenames.map(getElement))
      .then(els => zip(changedCodenames, els))
      .then(newEntries => setWatchedElements(prev => new Map([...prev ?? [], ...newEntries]))),
    []);

  useEffect(() => {
    updateCodenames(elementCodenames);
    // I'd like to avoid forcing users to memoize the elementsCodenames array and the code realy just needs to update when the requested codenames are changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...elementCodenames, updateCodenames]);

  useEffect(() => {
    CustomElement.observeElementChanges(elementCodenames, updateCodenames);
    // I'd like to avoid forcing users to memoize the elementsCodenames array and the code realy just needs to update when the requested codenames are changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, elementCodenames);

  return watchedElements;
};

export const promptToSelectItems = (params: Readonly<{ allowMultiple: boolean }>): Promise<ReadonlyArray<ItemDetail>> =>
  CustomElement.selectItems(params)
    .then(onNonNull(items => CustomElement.getItemDetails(items.map(i => i.id))))
    .then(withFallback<ReadonlyArray<ItemDetail>>([]));

export const promptToSelectAssets = (params: Readonly<{ allowMultiple: boolean; fileType: "all" | "images" }>): Promise<ReadonlyArray<AssetDetail>> =>
  CustomElement.selectAssets(params)
    .then(onNonNull(assets => CustomElement.getAssetDetails(assets.map(a => a.id))))
    .then(withFallback<ReadonlyArray<AssetDetail>>([]));

type ElementValue = string | ReadonlyArray<MultiChoiceOption>;

const zip = <V1, V2>(arr1: ReadonlyArray<V1>, arr2: ReadonlyArray<V2>): ReadonlyArray<[V1, V2]> =>
  arr1
    .slice(0, Math.min(arr1.length, arr2.length))
    .map((el, i) => [el, arr2[i] as V2] as const);

const onNonNull = <V, Res>(fnc: (v: V) => Res) => (v: V | null): Res | null =>
  v === null ? null : fnc(v);

const withFallback = <V>(fallbackValue: V) => (v: V | null) => v === null ? fallbackValue : v;
