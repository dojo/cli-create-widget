# cli-create-widget

[![Build Status](https://travis-ci.org/dojo/cli-create-widget.svg?branch=master)](https://travis-ci.org/dojo/cli-create-widget)
<!-- [![Build status](https://ci.appveyor.com/api/projects/status/ap88vuv8xsuelowm/branch/master?svg=true)](https://ci.appveyor.com/project/Dojo/cli-create-widget/branch/master) -->
[![codecov](https://codecov.io/gh/dojo/cli-create-widget/branch/master/graph/badge.svg)](https://codecov.io/gh/dojo/cli-create-widget)
[![npm version](https://badge.fury.io/js/%40dojo%2Fcli-create-widget.svg)](https://badge.fury.io/js/%40dojo%2Fcli-create-widget)

A [Dojo CLI](https://github/dojo/cli) command that creates a Dojo 2 widget template with an optional custom element descriptor.

- [Usage](#usage)
- [Features](#features)
- [How do I contribute?](#how-do-i-contribute)
  - [Code Style](#code-style)
  - [Installation](#installation)
  - [Testing](#testing)
- [Licensing information](#licensing-information)

## Usage

To use `@dojo/cli-create-widget`, install the project globally along side `dojo cli`:

```bash
npm install -g @dojo/cli-create-widget
```

Run using:

```bash
dojo create [widget] --name <widget name> --styles <CSS path> --tests <test path>
```

## Features

`@dojo/cli-create-widget` generates an opinionated skeleton component structure for use within a Dojo 2 application. The location where styles and tests are created can be customized using the `--styles` and `--tests` arguments respectively. By default, the following folder structure will be created:

```
MyComponent.ts
styles/
styles/myComponent.m.css
styles/myComponent.m.css.d.ts,
tests/unit/MyComponent.ts
```

It's also possible to generate a [Custom Element](https://www.w3.org/TR/2016/WD-custom-elements-20161013/) descriptor by passing the `--component` boolean argument. This will generate a widget that includes the `@customElement` decorator with an empty configuration object ready for configuration, please see [the `@dojo/widget-core` readme](https://github.com/dojo/widget-core#web-components) for more information.

## How do I contribute?

We appreciate your interest!  Please see the [Dojo 2 Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines.

### Code Style

This repository uses [`prettier`](https://prettier.io/) for code styling rules and formatting. A pre-commit hook is installed automatically and configured to run `prettier` against all staged files as per the configuration in the projects `package.json`.

An additional npm script to run `prettier` (with write set to `true`) against all `src` and `test` project files is available by running:

```bash
npm run prettier
```

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `grunt dev` or `grunt dist`.

### Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

90% branch coverage MUST be provided for all code submitted to this repository, as reported by istanbul’s combined coverage results for all supported platforms.

To test locally run:

`grunt test`

## Licensing information

© 2017 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
