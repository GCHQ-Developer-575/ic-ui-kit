# ic-button

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                              | Type                                                                                                                                                                                     | Default     |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `appearance`       | `appearance`        | The appearance of the button, e.g. dark, light, or the default.                                                                          | `"dark" \| "default" \| "light"`                                                                                                                                                         | `"default"` |
| `disableTooltip`   | `disable-tooltip`   | If `true`, the ic-tooltip which is shown for icon variant will be disabled. Title or aria-label must be set if this prop is not applied. | `boolean`                                                                                                                                                                                | `false`     |
| `disabled`         | `disabled`          | If `true`, the button will be in disabled state.                                                                                         | `boolean`                                                                                                                                                                                | `false`     |
| `download`         | `download`          | If `true`, the user can save the linked URL instead of navigating to it.                                                                 | `boolean \| string`                                                                                                                                                                      | `false`     |
| `fullWidth`        | `full-width`        | If `true`, the button will fill the width of the container.                                                                              | `boolean`                                                                                                                                                                                | `false`     |
| `href`             | `href`              | The URL that the link points to. This will render the button as an "a" tag.                                                              | `string`                                                                                                                                                                                 | `undefined` |
| `hreflang`         | `hreflang`          | The human language of the linked URL.                                                                                                    | `string`                                                                                                                                                                                 | `undefined` |
| `loading`          | `loading`           | If `true`, the button will be in loading state.                                                                                          | `boolean`                                                                                                                                                                                | `false`     |
| `referrerpolicy`   | `referrerpolicy`    | How much of the referrer to send when following the link.                                                                                | `"" \| "no-referrer" \| "no-referrer-when-downgrade" \| "origin" \| "origin-when-cross-origin" \| "same-origin" \| "strict-origin" \| "strict-origin-when-cross-origin" \| "unsafe-url"` | `undefined` |
| `rel`              | `rel`               | The relationship of the linked URL as space-separated link types.                                                                        | `string`                                                                                                                                                                                 | `undefined` |
| `size`             | `size`              | The size of the button to be displayed.                                                                                                  | `"default" \| "large" \| "small"`                                                                                                                                                        | `"default"` |
| `target`           | `target`            | The place to display the linked URL, as the name for a browsing context (a tab, window, or iframe).                                      | `string`                                                                                                                                                                                 | `undefined` |
| `tooltipPlacement` | `tooltip-placement` | The position of the tooltip in relation to the button.                                                                                   | `"bottom" \| "left" \| "right" \| "top"`                                                                                                                                                 | `"bottom"`  |
| `type`             | `type`              | The type of the button.                                                                                                                  | `"button" \| "reset" \| "submit"`                                                                                                                                                        | `"button"`  |
| `variant`          | `variant`           | The variant of the button to be displayed.                                                                                               | `"destructive" \| "icon" \| "primary" \| "secondary" \| "tertiary"`                                                                                                                      | `"primary"` |


## Events

| Event     | Description                   | Type                |
| --------- | ----------------------------- | ------------------- |
| `icBlur`  | Emitted when button has blur  | `CustomEvent<void>` |
| `icFocus` | Emitted when button has focus | `CustomEvent<void>` |


## Methods

### `setFocus() => Promise<void>`

Sets focus on the native `button`.

#### Returns

Type: `Promise<void>`




## Slots

| Slot     | Description                                             |
| -------- | ------------------------------------------------------- |
| `"icon"` | Content will be placed to the left of the button label. |


## Dependencies

### Used by

 - [ic-alert](../ic-alert)
 - [ic-card](../ic-card)
 - [ic-horizontal-scroll](../ic-horizontal-scroll)
 - [ic-menu-item](../ic-menu-item)
 - [ic-navigation-button](../ic-navigation-button)
 - [ic-navigation-menu](../ic-navigation-menu)
 - [ic-search-bar](../ic-search-bar)
 - [ic-select](../ic-select)
 - [ic-side-navigation](../ic-side-navigation)
 - [ic-toast](../ic-toast)
 - [ic-top-navigation](../ic-top-navigation)

### Depends on

- [ic-loading-indicator](../ic-loading-indicator)
- [ic-tooltip](../ic-tooltip)

### Graph
```mermaid
graph TD;
  ic-button --> ic-loading-indicator
  ic-button --> ic-tooltip
  ic-loading-indicator --> ic-typography
  ic-tooltip --> ic-typography
  ic-alert --> ic-button
  ic-card --> ic-button
  ic-horizontal-scroll --> ic-button
  ic-menu-item --> ic-button
  ic-navigation-button --> ic-button
  ic-navigation-menu --> ic-button
  ic-search-bar --> ic-button
  ic-select --> ic-button
  ic-side-navigation --> ic-button
  ic-toast --> ic-button
  ic-top-navigation --> ic-button
  style ic-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


