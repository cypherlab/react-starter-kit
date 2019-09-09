# `@cypherlab/react-starter-kit`


React Starter Kit

<!--- NPM basge
<a href="https://www.npmjs.com/package/@cypherlab/react-starter-kit">
  <img alt="npm" src="https://img.shields.io/npm/v/@cypherlab/react-starter-kit">
</a>
-->

## Install
```
git clone git@github.com:cypherlab/react-starter-kit.git
yarn install
```

## Update deps (if needed)

```bash
yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react
yarn add -D rollup rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-node-resolve rollup-plugin-terser
yarn add -D react react-dom
```

## Realse 

```js
(npm|yarn) run release
```

## Test 

You can play with the component in the browser via the `index.html` test file in the `test` folder.

```js
(npm|yarn) run dev
browse to http://localhost:8000/test/
```