# @dojo/cli-create-widget

[![Build Status](https://travis-ci.org/dojo/cli-create-widget.svg?branch=master)](https://travis-ci.org/dojo/cli-create-widget)
[![codecov](https://codecov.io/gh/dojo/cli-create-widget/branch/master/graph/badge.svg)](https://codecov.io/gh/dojo/cli-create-widget)
[![npm version](https://badge.fury.io/js/%40dojo%2Fcli-create-widget.svg)](https://badge.fury.io/js/%40dojo%2Fcli-create-widget)

The `create widget` command for the `dojo cli`.

**WARNING** This is _beta_ software. While we do not anticipate significant changes to the API at this stage, we may feel the need to do so. This is not yet production ready, so you should use at your own risk.

- [Usage](#usage)
- [Features](#features)
- [How do I contribute?](#how-do-i-contribute)
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

It's also possible to generate a [Custom Element](https://www.w3.org/TR/2016/WD-custom-elements-20161013/) descriptor by passing the `--component` boolean argument. This will generate a `createMyComponentElement.ts` file alongside the actual component file.

## How do I contribute?

We appreciate your interest!  Please see the [Dojo 2 Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

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
