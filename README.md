[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![Discord][discord-shield]][discord-url]


# Kontent.ai React Integration Template

This template can be used to jumpstart your own integration development with Kontent.ai. It contains all the neccessary tools for creating a new [Custom Element](https://kontent.ai/learn/tutorials/develop-apps/integrate/content-editing-extensions/), a UI extension for content editors. 


You can inspire yourself by browsing already created integrations [**here**](https://github.io/topics/kontent-ai-integration).

If you wish to include your integration into the mentioned list, please add the **kontent-ai-integration** topic into your github integration repository. 

Additional information and tutorials can be found on [kontent-ai.github.io](https://kontent-ai.github.io/).

<br />

## Getting Started

The integration is created with [Create React App](https://create-react-app.dev/). 
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

### Important parts of custom elements

#### Link the Custom Element API

Every Kontent.ai custom element needs the [Custom Element API](https://kontent.ai/learn/reference/custom-elements-js-api/) to work properly. You can include it in your `html` file like this. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/public/index.html#L8-L10

##### (Optionally) Include Kontent.ai styles

If you want your custom element to look like a part of the Kontent.ai app, you will need to include the Kontent.ai css styles. You can find them [here in this repository](https://github.com/kontent-ai/custom-element-template-react/blob/main/public/kontent-ai-app-styles.css). You must also include have the [font file](https://github.com/kontent-ai/custom-element-template-react/blob/main/public/kontent-ai-icons-v3.0.1.woff2) next to the styles. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/public/index.html#L5-L7

#### Initialize the custom element

Before you start any interaction with the Kontent.ai app you will need initialize the custom element. You can do that by calling the `init` function of the Custom Element API like so. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/src/IntegrationApp.tsx#L18-L29
And waiting until the callback you passed into the `init` function is called. For example in React you can do that by saving the custom element's configuration in a state, setting it only inside the callback passed to the `init` function.
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
You can find more information about the parameters provided to the callback in [the documentation](https://kontent.ai/learn/reference/custom-elements-js-api/#a-init-method).

#### Disable your element if needed

In certain circumstances the Kontent.ai app might instruct your custom element to display itself in a disabled state. It can happen for example when the edited item is published (therefore cannot be edited) or the current user does not have permission to edit this element.

In order for the custom element to always have up-to-date information about the disabled state, you should:
1) Save the `element.disabled` flag from the argument of the `init` function. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/src/IntegrationApp.tsx#L25
2) Subscribe for the flag changes with [`CustomElement.onDisabledChanged`](https://kontent.ai/learn/reference/custom-elements-js-api/#a-ondisabledchanged-method) function. In React you can do that like so. https://github.com/kontent-ai/custom-element-template-react/blob/e184179039aa705a82722d778e503dfb511f7115/src/IntegrationApp.tsx#L36-L38
3) Use the flag in your custom element to prevent the user from editing anything as the Kontent.ai will refuse to save any changes when your element should be disabled.

#### Save the value

You might also want to save some value of your custom element. The value can only be of type string or null (null represents no value and if the element is required having null as value will fail the item's validation). However, you can easily `JSON.stringify` and conversly `JSON.parse` any [json-serializable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description) value.
To save a value, simply call the [`CustomElement.setValue`](https://kontent.ai/learn/reference/custom-elements-js-api/#a-setvalue-method) and pass it the value.

#### Adjust the height

In some cases the default height of custom elements will not be enough for your element. In that case you can set your custom height with the [`CustomElement.setHeight`](https://kontent.ai/learn/reference/custom-elements-js-api/#a-setheight-method) function. Or dynamically change it as the value changes. In the following React example we update the element's size whenever some value affecting the element's size changes and set the height to the document's height with a minimum of 100px.
```ts
const updateSize = useCallback(() => {
  const newSize = Math.max(document.documentElement.offsetHeight, 100);

  CustomElement.setHeight(Math.ceil(newSize));
}, []);

useLayoutEffect(() => {
  updateSize();
}, [updateSize, currentValue, searchResults]);
```

#### More functions

You can find much more functions available in the Custom Element API in [the reference](https://kontent.ai/learn/reference/custom-elements-js-api/).

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
