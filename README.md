[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![Discord][discord-shield]][discord-url]


# Kontent.ai React Custom Element Starter

This starter can be used to jumpstart your own custom element development with Kontent.ai. It contains all the necessary tools for creating a new [Custom Element](https://kontent.ai/learn/docs/custom-elements), a UI extension for content editors.

You can inspire yourself by browsing already created integrations [**here**](https://github.com/topics/kontent-ai-integration).

If you wish to include your integration into the mentioned list, please add the **kontent-ai-integration** topic into your github integration repository. 

Additional Kontent.ai GitHub resources and tutorials can be found on [kontent-ai.github.io](https://kontent-ai.github.io/).

# Getting Started

## Running the project

The integration is created with [Vite](https://vitejs.dev/). 

1. Install dependencies with `npm ci`.
2. Run a local development server with `npm run dev`.
3. To deploy the element you can use the output of running `npm run build` command that you can find in the `dist` folder.

See [Vite guide](https://vitejs.dev/guide/#command-line-interface) for more available commands.

## Define your Element's API

There are two main things that you'll need to define.
* What configuration will your custom element need. (This is provided in the configuration when adding the custom element into a content type)
* What value will the custom element save. In what format (the value needs to be serialized into string).

You can define the shape of your configuration in the `src/customElement/config.ts` file along with a validation function that will show the user an error when the provided configuration is not valid.

In the same way you can define the shape of your value in the `src/customElement/value.ts` file along with a parsing function from a string. Usually, the most flexible format is json serialized into the string.

## Define your Element's height handling

The width of the custom element is always the full width of the editing element in the Kontent.ai app. However, the height can be defined by the element itself.
In the `src/main.tsx` file you can find the usage of the `CustomElementContext` where you can define the height of your element.
It can either be a specific size in pixels, `"default"` to use the default value or `"dynamic"` to resize the element based on the height of the element's body element.

## Write your Element

You can start building the element in the `src/IntegrationApp.tsx` file where you can find example usage of several utilities defined in this repository that might come in useful.

## Utilities in this repository

### useConfig

Use this hook to get the configuration provided for this custom element.
The configuration will be valid based on the validation function you defined in `src/customElement/config.ts` and will be of the `Config` type also defined in the file.

### useValue

Use this hook to get the current value of the element and a function to update the value.
The value will be parsed using the function defined in `src/customElement/value.ts` and will be of the `Value` type also defined in the file.
Example:
```ts
const [value, setValue] = useValue();
```

### useIsDisabled

This hook indicates whether your element should appear disabled. (e.g. when the item is published or the user doesn't have permission to modify the item)
It subscribes to changes so the returned value will always be up-to-date.

### useEnvironmentId

Returns the environment id of this element's content item.

### useItemInfo

Gets information about the element's content item. 
See the `ItemDetail` type in the `src/customElement/types/customElement.d.ts` file for details of available item information.

### useVariantInfo

Gets the element's language id and codename.

### useElements

Use this hook to get values of the specified elements (accepts element codenames). 
The hook subscribes to element changes so the returned values will always be up-to-date.

### promptToSelectItems

Use this function to prompt the user to select content items.
You can specify whether they should select only one or several.
The function returns details of the selected items.

### promptToSelectAssets

Use this function to prompt the user to select assets.
You can specify whether they should select only one or several and whether they should only select images or any asset.
The function returns details of the selected assets.

# Structure of the Custom Element

## Static resources in the `index.html` file

Every Kontent.ai custom element needs the [Custom Element API](https://kontent.ai/learn/reference/custom-elements-js-api/) to work properly.
This custom element is no exception and you can find it linked in the `index.html` template in the root of the repository.

Additionally, you can find there linked a CSS file from the `public` folder.
This contains Kontent.ai styling that you can leverage to make your custom element look similar to the rest of the Kontent.ai app.
It also includes Kontent.ai font.

## `CustomElementContext`

This is the core of the connection to the Custom Element API.
You can find here the call to the `CustomElement.init` function that initializes the custom element and populates the React context with useful information like the element's value, config and so on.
It also handles handles height of the custom element using the supplied prop `height`.

## `selectors.ts`

Here you can find the implementation of most of the wrappers around the Custom Element API.

# Contributing

For Contributing please see  [`CONTRIBUTING.md`](CONTRIBUTING.md) for more information.

# License

Distributed under the MIT License. See [`LICENSE.md`](./LICENSE.md) for more information.


[contributors-shield]: https://img.shields.io/github/contributors/kontent-ai/custom-element-starter-react.svg?style=for-the-badge
[contributors-url]: https://github.com/kontent-ai/custom-element-starter-react/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kontent-ai/custom-element-starter-react.svg?style=for-the-badge
[forks-url]: https://github.com/kontent-ai/custom-element-starter-react/network/members
[stars-shield]: https://img.shields.io/github/stars/kontent-ai/custom-element-starter-react.svg?style=for-the-badge
[stars-url]: https://github.com/kontent-ai/custom-element-starter-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/kontent-ai/custom-element-starter-react.svg?style=for-the-badge
[issues-url]:https://github.com/kontent-ai/custom-element-starter-react/issues
[license-shield]: https://img.shields.io/github/license/kontent-ai/custom-element-starter-react.svg?style=for-the-badge
[license-url]:https://github.com/kontent-ai/custom-element-starter-react/blob/master/LICENSE.md
[discord-shield]: https://img.shields.io/discord/821885171984891914?color=%237289DA&label=Kontent.ai%20Discord&logo=discord&style=for-the-badge
[discord-url]: https://discord.com/invite/SKCxwPtevJ
