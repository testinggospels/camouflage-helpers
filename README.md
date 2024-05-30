# Camouflage Helpers

Camouflage helpers are a set of handy handlebar helpers that help you easily create the Camouflage mocks. They form the backbone of each protocol. You can build your mocks without them, but helpers add advanced features to your mocks. You can choose the protocol specific package that you need to download, helpers are included with each module.

Learn more about camouflage helpers in the [docs](https://testinggospels.github.io/camouflage-docs)

## Install Helpers

```bash
npx jsr add @camouflage/helpers
```

Note: update your `package.json` to use `"type": "module"`

## Usage

```javascript
import Helpers from "@camouflage/helpers";

const helpers = new Helpers();
const todaysDate = helpers.parse("{{now format='yyyy-MM-dd'}}");
console.log(todaysDate); // 2023-12-21
```
