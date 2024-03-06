import { useState } from 'react';
import { useConfig, useIsDisabled, useItemInfo, useEnvironmentId, useValue, useVariantInfo } from './customElement/CustomElementContext';
import { promptToSelectAssets, promptToSelectItems, useElements } from './customElement/selectors';

export const IntegrationApp = () => {
  const [selectedAssetNames, setSelectedAssetNames] = useState<ReadonlyArray<string>>([]);
  const [selectedItemNames, setSelectedItemNames] = useState<ReadonlyArray<string>>([]);

  // use this to access/modify this element's value
  const [elementValue, setElementValue] = useValue();
  // get whether this element should be disabled
  const isDisabled = useIsDisabled();
  // this custom element's configuration (defined in the content type in the Kontent.ai app)
  const config = useConfig();
  const projectId = useEnvironmentId();
  const item = useItemInfo();
  const variant = useVariantInfo();

  // use this to get (updated) value of other elements in this item, the elements must be allowed in the content type (see https://kontent.ai/learn/docs/custom-elements)
  const watchedElementsValues = useElements([config.textElementCodename]);

  const selectAssets = () =>
    // use this to prompt the user to select assets, the selected assets' details will be returned in the promise
    promptToSelectAssets({ allowMultiple: true, fileType: "images" })
      .then(assets => setSelectedAssetNames(assets?.map(asset => asset.name) ?? []));

  const selectItems = () =>
    // use this to prompt the user to select items, the selected items' details will be returned in the promise
    promptToSelectItems({ allowMultiple: true })
      .then(items => setSelectedItemNames(items?.map(item => item.name) ?? []));

  return (
    <div>
      <h2>Build your custom element here.</h2>
      <button onClick={selectAssets}>Select an asset</button>
      <h2>Selected assets</h2>
      <section>{selectedAssetNames.join(", ")}</section>

      <h2>Loaded data</h2>
      <section>
        {JSON.stringify({
          selectedAssetNames,
          selectedItemNames,
          elementValue,
          setElementValue,
          isDisabled,
          config,
          projectId,
          item,
          variant,
          watchedElementsValues,
          selectAssets,
          selectItems,
        })}
      </section>
    </div>
  );
};

IntegrationApp.displayName = 'IntegrationApp';
