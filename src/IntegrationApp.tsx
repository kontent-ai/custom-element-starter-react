import { FC, useCallback, useEffect, useState } from 'react';

const watchedElementCodename = 'text_element';

export const IntegrationApp: FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [itemName, setItemName] = useState<string | null>(null);
  const [watchedElementValue, setWatchedElementValue] = useState<string | null>(null);
  const [selectedAssetNames, setSelectedAssetNames] = useState<ReadonlyArray<string>>([]);
  const [selectedItemNames, setSelectedItemNames] = useState<ReadonlyArray<string>>([]);
  const [elementValue, setElementValue] = useState<string | null>(null);

  const updateWatchedElementValue = useCallback(() => {
    CustomElement.getElementValue(watchedElementCodename, v => typeof v === 'string' && setWatchedElementValue(v));
  }, []);

  useEffect(() => {
    CustomElement.init((element, context) => {
      if (!isConfig(element.config)) {
        throw new Error('Invalid configuration of the custom element. Please check the documentation.');
      }

      setConfig(element.config);
      setProjectId(context.projectId);
      setIsDisabled(element.disabled);
      setItemName(context.item.name);
      setElementValue(element.value ?? '');
      updateWatchedElementValue();
    });
  }, [updateWatchedElementValue]);

  useEffect(() => {
    CustomElement.setHeight(500);
  }, []);

  useEffect(() => {
    CustomElement.onDisabledChanged(setIsDisabled);
  }, []);

  useEffect(() => {
    CustomElement.observeItemChanges(i => setItemName(i.name));
  }, []);

  useEffect(() => {
    CustomElement.observeElementChanges([watchedElementCodename], updateWatchedElementValue);
  }, [updateWatchedElementValue]);

  const selectAssets = () =>
    CustomElement.selectAssets({ allowMultiple: true, fileType: 'all' })
      .then(ids => CustomElement.getAssetDetails(ids?.map(i => i.id) ?? []))
      .then(assets => setSelectedAssetNames(assets?.map(asset => asset.name) ?? []));

  const selectItems = () =>
    CustomElement.selectItems({ allowMultiple: true })
      .then(ids => CustomElement.getItemDetails(ids?.map(i => i.id) ?? []))
      .then(items => setSelectedItemNames(items?.map(item => item.name) ?? []));

  const updateValue = (newValue: string) => {
    CustomElement.setValue(newValue);
    setElementValue(newValue);
  };

  if (!config || !projectId || elementValue === null || watchedElementValue === null || itemName === null) {
    return null;
  }

  return (
    <>
      <h1>
        This is a great integration with the Kontent.ai app.
      </h1>
      <section>
        projectId: {projectId}; item name: {itemName}
      </section>
      <section>
        configuration: {JSON.stringify(config)}
      </section>
      <section>
        <input value={elementValue} onChange={e => updateValue(e.target.value)} disabled={isDisabled} />
      </section>
      <section>
        This is the watched element: {watchedElementValue}
      </section>
      <section>
        These are your selected asset names: {selectedAssetNames.join(', ')}
        <button onClick={selectAssets}>Select different assets</button>
      </section>
      <section>
        These are your selected item names: {selectedItemNames.join(', ')}
        <button onClick={selectItems}>Select different items</button>
      </section>
    </>
  );
};

IntegrationApp.displayName = 'IntegrationApp';

type Config = Readonly<{
  // expected custom element's configuration
}>;

const isConfig = (v: unknown): v is Config =>
  typeof v === 'object' &&
  v !== null; // check it is the expected configuration
