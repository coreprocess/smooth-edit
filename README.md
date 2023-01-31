# smooth-edit

![npm version](https://badgen.net/npm/v/smooth-edit?icon=npm&label)
![GitHub checks](https://badgen.net/github/checks/teamrevin/smooth-edit/publish?icon=github&label=GitHub)

`smooth-edit` is a smooth edit mode framework for React. It allows you to implement a seamless transition between a view and an edit mode to provide the user with an optimal editing experience. It is UI and form library agnostic.

## Installation

Use your favourite manager to install the [package](https://www.npmjs.com/package/smooth-edit):

```sh
yarn add smooth-edit
```

```sh
npm install smooth-edit --save
```

## Overview

-   `<SmoothEditContainer />`: The component sets the frame for an edit area and renders an initialized `SmoothEditContext`. The component must directly or indirectly host the navigation bar (optional) and the scroll area (mandatory).
-   `useContext(SmoothEditContext)`: Any component within the edit area can access the context to determine the status of the edit mode.
-   `wrapSmoothEditNavBar()`: A higher-order component to render a navigation bar in view and edit mode. It injects the status of the edit mode and additional utilities. Furthermore, it enables the framework to track any transitions, including height changes.
-   `wrapSmoothEditScrollArea()`: A higher-order component to wrap the scroll area. It injects top and bottom buffer components that need to be rendered by the inner component. It also enables the framework to track any transitions, including height changes.
-   `wrapSmoothEditInput()`: A higher-order component to wrap any input component. It injects the status of the edit mode and additional utilities. It enables the framework to fix the viewport position of the triggering input component during the transition.

## Examples

-   [Custom](examples/custom): Custom form components with tailor-made CSS transitions.
-   [MUI](examples/mui): MUI components that are combined via [SmoothTransition](https://www.npmjs.com/package/smooth-transition). See [mui.com](https://mui.com/) to learn more about MUI.

## Reference

### &lt;SmoothEditContainer /&gt;

TODO

### useContext(SmoothEditContext)

TODO

### wrapSmoothEditNavBar()

TODO

### wrapSmoothEditScrollArea()

TODO

### wrapSmoothEditInput()

TODO

## License

This library is licensed under the MIT license.

## Contributing

We welcome contributions to the `smooth-edit` library. To contribute, simply open a [pull request](https://github.com/teamrevin/smooth-edit/pulls) with your changes.
