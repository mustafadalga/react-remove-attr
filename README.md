# Vite Plugin - React.js Remove Attributes

Simplify your production code and enhance performance with this unique Vite plugin designed specifically for React.js
projects. The plugin seamlessly removes specified attributes from your tsx/jsx HTML codes during production builds,
ensuring a clutter-free and optimized application.

Through its robust functionality, this Vite plugin elevates your production code to a new level of cleanliness and
efficiency. It's a must-have tool for any developer seeking to streamline their React.js applications for production.


<p align="center">

[![version](https://img.shields.io/npm/v/react-remove-attr.svg)](https://www.npmjs.com/package/react-remove-attr)
[![vite version](https://img.shields.io/badge/vite-4.3.2-brightgreen.svg)](https://www.npmjs.com/package/vite)

</p>

## Table of Contents

- [Highlighted Features](#highlighted-features)
- [Installation](#installation)
- [Usage](#usage)
    - [Prerequisites](#prerequisites)
    - [Examples](#examples)
- [License](#license)

## Highlighted Features

1. **Selective Attribute Removal:** The plugin gives you the power to choose which attributes you want to remove in the
   production build of your React.js project. This feature is particularly useful for eliminating attributes like '
   data-testid', which are only necessary during testing.

2. **File Extension Specificity:** Customize the plugin according to the specific needs of your project. You can define
   which file extensions should be considered for attribute removal. Currently, the plugin supports tsx and jsx
   extensions.

3. **Granular Exclusions:** Have some folders or files you want to exclude from the plugin's operation? No problem. This
   plugin allows for configurable exemptions, meaning you can specify certain files or folders to be ignored during the
   attribute removal process.

4. **Clean Production Code:** By strategically removing unnecessary attributes, this plugin ensures your production code
   is cleaner, leaner, and better performing. Say goodbye to bloated code and hello to optimized application
   performance.

## Installation

You can install this plugin through npm:

```sh
npm install --save-dev react-remove-attr
```

## Usage

### Prerequisites

To use this plugin, you need to have a Vite project set up. Import and use the plugin in your vite.config.js or
vite.config.ts file.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeAttr from "react-remove-attr"

export default defineConfig({
    plugins: [
        removeAttr({
            extensions: [],
            attributes: []
        }),
        react(),
    ],
})
```

<br /> 

## Examples

#### Example 1: Removing 'data-testid', 'data-timestamp' and 'ignored-element' attributes from '.tsx' and ".jsx" files

This configuration will remove 'data-testid', 'data-timestamp' and 'ignored-element' attributes from all '.tsx' and ".jsx"
files in the production build.

```typescript
export default defineConfig({
    plugins: [
        removeAttr({
            extensions: [ "jsx", "tsx" ],
            attributes: [ 'data-testid', "data-timestamp", "ignored-element" ]
        }),
        react()
    ]
})
```

<br /> 

#### Example 2: Ignoring specific folders and files

This configuration will remove 'data-testid' attributes from '.tsx' files, with the
exception of those in the 'src/tests' and 'src/utilities' folders, as well as the 'src/Home.tsx', '
src/components/Modal.tsx', and 'src/layouts/LayoutAuth.tsx' files.

```typescript
export default defineConfig({
    plugins: [
        removeAttr({
            extensions: [ "tsx" ],
            attributes: [ 'data-testid'],
            ignoreFolders: [ 'src/tests', "src/utilities" ],
            ignoreFiles: [ 'src/Home.tsx', 'src/components/Modal.tsx', "src/layouts/LayoutAuth.tsx" ]
        }),
        react()
    ]
})
```

<br /> 

## License

[![License](https://img.shields.io/badge/LICENSE-GPL--3.0-orange)](https://github.com/mustafadalga/react-remove-attr/blob/main/LICENSE)


