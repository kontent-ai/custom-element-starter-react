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
