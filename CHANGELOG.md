# React Tablize - Change Log

## [Unreleased](https://github.com/alonrbar/react-tablize/tree/develop)

### Added

- Support custom styling with `emotion` and similar libraries.

### Removed

- **BREAKING**: Entirely new `GridView`.
- **BREAKING**: Remove default table style.
- **BREAKING**: Remove the `TableView.hairlines` property.

## [0.15.0 - 2019-10-07](https://github.com/alonrbar/react-tablize/tree/v0.15.0)

### Added

- `RowAutoSize` for non-virtual `TableView`s.

### Changed

- Internal code changes.
- Human readable class names.

### Fixed

- Better support older browsers when `isVirtual` is `false`.
- Fix `TableView` RTL support.

### Removed

- **BREAKING**: Remove the `isScrolling` support.

## [0.14.0 - 2019-07-16](https://github.com/alonrbar/react-tablize/tree/v0.14.0)

### Added

- `GridView.isVirtual`.

## [0.13.0 - 2019-07-14](https://github.com/alonrbar/react-tablize/tree/v0.13.0)

### Added

- Output css labels.

### Fixed

- Scroll grid's body when scrolling frozen columns.

### Removed

- `TableView.lineNumbers`.

## [0.12.0 - 2019-07-11](https://github.com/alonrbar/react-tablize/tree/v0.12.0)

### Added

- Expose `TableView.useIsScrolling`.

### Fixed

- `TableView.overscanCount` was not effecting.

## [0.11.0 - 2019-07-02](https://github.com/alonrbar/react-tablize/tree/v0.11.0)

### Added

- Scroll virtual table with the keyboard.

## [0.10.0 - 2019-07-01](https://github.com/alonrbar/react-tablize/tree/v0.10.0)

### Added

- Allow standard div props on TableHead.

### Fixed

- Fix support for table with no head.

## [0.9.0 - 2019-07-01](https://github.com/alonrbar/react-tablize/tree/v0.9.0)

### Added

- Props description in the README file.
- New `TableView.isVirtual` property.
- New appearance props (not documented): `TableView.customScrollbars` and `TableView.hairlines`.
  Note: Use appearance props with caution as they may be removed in the future...

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

- Allow standard div props on ColumnHead.
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
