[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![Discord][discord-shield]][discord-url]


# Kontent.ai React Integration Template

This template can be used to jumpstart your own custom element development with Kontent.ai. It contains all the necessary tools for creating a new [Custom Element](https://kontent.ai/learn/tutorials/develop-apps/integrate/content-editing-extensions/), a UI extension for content editors. 

You can inspire yourself by browsing already created integrations [**here**](https://github.com/topics/kontent-ai-integration).

If you wish to include your integration into the mentioned list, please add the **kontent-ai-integration** topic into your github integration repository. 

Additional Kontent.ai GitHub resources and tutorials can be found on [kontent-ai.github.io](https://kontent-ai.github.io/).

<br />

## Getting Started

The integration is created with [Create React App](https://create-react-app.dev/). 

This template aims to showcase the possibilities. It is storing the data from the displayed input, it is observing another text element specified in the configuration, and displays the context provided by the Kontent.ai app.

It is also showcasing how you can select other content items as well as assets within the custom element.
First you will need to install npm dependencies with `npm install`. 
Then use `npm run build` to build the integration or `npm run start` to start a local development server. 
See https://create-react-app.dev/docs/available-scripts for more scripts.

### Configuration

The element requires a sample configuration with one property like the one below, to showcase config handling.
```json
{
  "textElementCodename": "<Codename of a text element that this custom element can read>"
}
```

## Structure of the Kontent.ai Custom Element

### Link the Custom Element API

Every Kontent.ai custom element needs the [Custom Element API](https://kontent.ai/learn/reference/custom-elements-js-api/) to work properly. You should include it in your `html` file like this: https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/public/index.html#L8-L10

#### (Optionally) Include Kontent.ai styles

If you want your custom element to look like a part of the Kontent.ai app, you'll need to include the Kontent.ai CSS file. You can find it [here in this repository](https://github.com/kontent-ai/custom-element-template-react/blob/main/public/kontent-ai-app-styles.css). You have to include the [font file](https://github.com/kontent-ai/custom-element-template-react/blob/main/public/kontent-ai-icons-v3.0.1.woff2) as well. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/public/index.html#L5-L7

### Initialize the custom element

Before you start any interaction with the Kontent.ai app, you'll need **initialize the custom element**. You can do that by calling the `init` function from the provided API like so https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/src/IntegrationApp.tsx#L18-L29
and waiting until the callback you passed into the `init` function is called. You'll receive the custom element configuration object of your specification, as well as additional context - more on that in [the documentation](https://kontent.ai/learn/reference/custom-elements-js-api/#a-init-method). 
You can leverage state in React to store the important configuration while setting it inside of the initialization callback. 

```ts
const [config, setConfig] = useState<Config | null>(null);

useEffect(() => {
  CustomElement.init((element, context) => {
    if (!isValidConfig(element.config)) {
      throw new Error('Not the config this element expects');
    }
    setConfig(element.config);
    // more logic
  });
}, []);
```

### Disable your element if needed

In certain circumstances, the Kontent.ai app might instruct your custom element to display itself in a **disabled state**. Disabled state means that the value of your element cannot be changed. This can happen when the edited item is published (therefore cannot be edited), or the current user does not have permission to edit the custom element.

In order for the custom element to always have up-to-date information about the disabled state, you should:
1) Save the `element.disabled` flag from the argument of the `init` function. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/src/IntegrationApp.tsx#L25
2) Subscribe for the flag changes with [`CustomElement.onDisabledChanged`](https://kontent.ai/learn/reference/custom-elements-js-api/#a-ondisabledchanged-method) function. In React you can do that like so. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/src/IntegrationApp.tsx#L36-L38
3) Use the flag in your custom element to prevent the user from editing anything as the Kontent.ai will refuse to save any changes when your element should be disabled.

### Set the value

You might also want to set the value of your custom element. The value can only be of type string or null (null represents no value and if the element is required having null as value will fail the item's validation). However, you can easily `JSON.stringify` and conversly `JSON.parse` any [json-serializable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description) the saved value.
To save a value, simply call the [`CustomElement.setValue`](https://kontent.ai/learn/reference/custom-elements-js-api/#a-setvalue-method) and pass it the value.
This value is accessible through the Delivery API, and can be used and rendered on your website, or in your application.

### Adjust the height

In some cases, the default height of custom elements will not be enough for the application you are trying to render inside of it. In that case, you can set your custom height with the [`CustomElement.setHeight`](https://kontent.ai/learn/reference/custom-elements-js-api/#a-setheight-method) function. This resize function can be  changed as the required height value itself changes, which helps you omit the unpleasant scrolling of the iframe your element is rendered in. 
In the following React example we update the element's size whenever some value affecting the element's size changes and set the height to the document's height with a minimum of 100px.

```ts
const updateSize = useCallback(() => {
  const newSize = Math.max(document.documentElement.offsetHeight, 100);

  CustomElement.setHeight(Math.ceil(newSize));
}, []);

useLayoutEffect(() => {
  updateSize();
}, [updateSize, currentValue, searchResults]);
```

### More functions

You can find all of the available Custom Element functions in our [Custom Element API reference](https://kontent.ai/learn/reference/custom-elements-js-api/).

## Contributing

For Contributing please see  [`CONTRIBUTING.md`](CONTRIBUTING.md) for more information.

## License

Distributed under the MIT License. See [`LICENSE.md`](./LICENSE.md) for more information.


[contributors-shield]: https://img.shields.io/github/contributors/kontent-ai/integration-template-react.svg?style=for-the-badge
[contributors-url]: https://github.com/kontent-ai/integration-template-react/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kontent-ai/integration-template-react.svg?style=for-the-badge
[forks-url]: https://github.com/kontent-ai/integration-template-react/network/members
[stars-shield]: https://img.shields.io/github/stars/kontent-ai/integration-template-react.svg?style=for-the-badge
[stars-url]: https://github.com/kontent-ai/integration-template-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/kontent-ai/integration-template-react.svg?style=for-the-badge
[issues-url]:https://github.com/kontent-ai/integration-template-react/issues
[license-shield]: https://img.shields.io/github/license/kontent-ai/integration-template-react.svg?style=for-the-badge
[license-url]:https://github.com/kontent-ai/integration-template-react/blob/master/LICENSE.md
[discord-shield]: https://img.shields.io/discord/821885171984891914?color=%237289DA&label=Kontent.ai%20Discord&logo=discord&style=for-the-badge
[discord-url]: https://discord.com/invite/SKCxwPtevJ
