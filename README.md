# react-native-cloud-ca

Cloud CA SDK

## Installation

```sh
yarn add react-native-cloud-ca
or
npm install react-native-cloud-ca
```

## Usage

```js
import { useSdkSetup } from 'react-native-cloud-ca';

// ...
const [setupSdkResponse, setupSdkError, onSetupSDK] = useSdkSetup();
// ...
onSetupSDK({baseUrl: "http://"});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
