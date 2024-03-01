declare const CustomElement: {
  init: (callback: (element: ElementInfo, context: Context) => void) => void;
  setValue: (newValue: string | null | Readonly<{ value: string | null; searchableValue: string | null }>) => void;
  onDisabledChanged: (callback: (isDisabled: boolean) => void) => void;
  setHeight: (height: number) => void;
  getElementValue: (elementCodename: string, callback: (elementValue: string | ReadonlyArray<MultiChoiceOption>) => void) => void;
  observeElementChanges: (elementCodenames: ReadonlyArray<string>, callback: (changedElementCodenames: ReadonlyArray<string>) => void) => void;
  observeItemChanges: (callback: (newItemDetails: ItemChangedDetails) => void) => void;
  selectAssets: (config: Readonly<{ allowMultiple: boolean; fileType: 'all' | 'images' }>) => Promise<ReadonlyArray<IdReference> | null>;
  getAssetDetails: (assetIds: ReadonlyArray<string>) => Promise<ReadonlyArray<AssetDetail> | null>;
  selectItems: (config: Readonly<{ allowMultiple: boolean }>) => Promise<ReadonlyArray<IdReference> | null>;
  getItemDetails: (itemIds: ReadonlyArray<string>) => Promise<ReadonlyArray<ItemDetail> | null>;
};

type ItemDetail = Readonly<{
  id: string;
  codename: string;
  name: string;
  collection: IdReference;
  type: IdReference;
}>;

type AssetDetail = Readonly<{
  id: string;
  descriptions: ReadonlyArray<AssetDescription>;
  fileName: string;
  imageHeight: number;
  imageWidth: number;
  name: string;
  size: number;
  thumbnailUrl: string;
  title: string;
  type: string;
  url: string;
}>;

type AssetDescription = Readonly<{
  language: Readonly<{
    id: string;
    codename: string;
  }>;
  description: string;
}>;

type ItemChangedDetails = Readonly<{
  name: string;
  codename: string;
  collection: IdReference;
}>;

type ElementInfo = Readonly<{
  config: Readonly<Record<string, unknown>> | null;
  disabled: boolean;
  value: string | null;
}>;

type Context = Readonly<{
  projectId: string;
  item: Readonly<{
    id: string;
    codename: string;
    name: string;
    collection: IdReference;
  }>;
  variant: Readonly<{
    id: string;
    codename: string;
  }>;
}>;

type IdReference = Readonly<{
  id: string;
}>

type MultiChoiceOption = Readonly<{
  id: string;
  name: string;
  codename: string;
}>;
