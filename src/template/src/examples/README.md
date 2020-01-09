# <%= name %> widget library

- [Usage](#usage)

## Usage

To use the `<%= name %>` package in your project, you will need to install the package:

```bash
npm install <%= name %>
```

This package contains *all* of the widgets in this repo.

To use a widget in your application, you will need to import each widget individually:

```ts
import Button from '<%= name %>/button';
```

Each widget module has a default export of the widget itself, as well as named exports for things such as properties specific to the widget:

```ts
import Button, { ButtonProperties } from '<%= name %>/button';
```