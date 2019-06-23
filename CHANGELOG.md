# React Tablize - Change Log

## [Unreleased](https://github.com/alonrbar/react-tablize/tree/develop)

### Added

- New appearance props `TableView.customScrollbars` and `TableView.hairlines`
  (well, this is not the direction I want to take this package... will probably
  remove in the future...)

## [0.8.0 - 2019-06-23](https://github.com/alonrbar/react-tablize/tree/v0.8.0)

### Added

- `TableView.refresh` method for working with dynamic row height (see [here](https://github.com/bvaughn/react-window/issues/199#issuecomment-479957451)).

## [0.7.0 - 2019-06-20](https://github.com/alonrbar/react-tablize/tree/v0.7.0)

### Added

- Variable sized table row.
- Table line numbers.

## [0.6.2 - 2019-06-06](https://github.com/alonrbar/react-tablize/tree/v0.6.2)

### Changed

- Use `react` and `react-dom` as peer dependencies.

## [0.6.1 - 2019-06-06](https://github.com/alonrbar/react-tablize/tree/v0.6.1)

### Changed

- Upgrade to `react-window@1.8.2` and remove hacks from GridView.syncScroll.

### Fixed

- Fix support for grid with no head.

## [0.6.0 - 2019-05-28](https://github.com/alonrbar/react-tablize/tree/v0.6.0)

### Added

- ColumnHead supports `className`, `style` and more.
- GridView examples in readme.

### Changed

- **BREAKING**: TableView does not receive an `items` property.

## [0.5.0 - 2019-05-15](https://github.com/alonrbar/react-tablize/tree/v0.5.0)

### Added

- Grid overscan items props.
- Grid `isScrolling` property.

### Fixed

- Fix support for multiple frozen columns.
- Fix body height calculation.
- Improve RTL scrolling.

## [0.4.0 - 2019-05-12](https://github.com/alonrbar/react-tablize/tree/v0.4.0)

### Added

- Variable sized grid.
- Grid RTL support.

### Changed

- **BREAKING**: Grid render callbacks uses argument objects.

## [0.3.0 - 2019-05-08](https://github.com/alonrbar/react-tablize/tree/v0.3.0)

### Added

- GridView.

### Fixed

- Div props typing

## [0.2.0 - 2019-04-17](https://github.com/alonrbar/react-tablize/tree/v0.2.0)

### Added

- Standard div props support

### Fixed

- Numeric css size support

## [0.1.0 - 2019-04-16](https://github.com/alonrbar/react-tablize/tree/v0.1.0)

First version

---

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

#### [Types of changes](http://keepachangelog.com)

- **Added** for new features.
- **Changed** for changes in existing functionality.
- **Deprecated** for soon-to-be removed features.
- **Removed** for now removed features.
- **Fixed** for any bug fixes.
- **Security** in case of vulnerabilities.