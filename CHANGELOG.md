# Changelog

## 1.0.0-beta-8
* add rules
  * jest-mock-grouped
  * jest-mocked-grouped
* add additional examples (aka integration tests)
  * recommended for eslint 7/8/9
  * grouped examples
* minor improvements/fixes

## 1.0.0-beta.7
* add `jest-mock-directly-above-jest-mocked` rule

## 1.0.0-beta.6
* remove `examples/` folder from build artifact

## 1.0.0-beta.5
* adapt error message for `jest-mock-multiple-with-same-path`
* make `jest.mocked-without-mock` robost for `let` declarators without initialisation

## 1.0.0-beta.4
* add `jest-mock-multiple-with-same-path` rule

## 1.0.0-beta.3
* add `examples/`, testing this plugin with eslint version 7, 8 and 9
* add github-action to lint and test the project and run the examples

## 1.0.0-beta.2

** Changelog**
Introduced this file

**jest-mocked-without-mock:**
ESLint 7 compatibility: `context.sourceCode` is not set


## 1.0.0-beta.1

**jest-mock-without-import:**
ESLint 7 compatibility: `context.sourceCode` is not set

## 1.0.0-beta.0

First shippable version for testing

Contains rules:

* jest-mock-without-import
* jest-mocked-without-mock
