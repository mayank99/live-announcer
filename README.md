# live-announcer

A web component that makes it easier to work with [live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

```
npm add @acab/tabs
```

## Usage

1. Set it up on page load. This should be done as early as possible.

   ```js
   import * as announcer from '@acab/live-announcer';
   announcer.setup();
   ```

2. Announce notifications from anywhere on the page, in an [asertive](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live#assertive) or [polite](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live#polite) way.

   ```js
   announcer.notify('Something happened, must be very important!');
   ```

   ```js
   announcer.notify('Something happened, but it can wait.', { polite: true });
   ```

### Best practices

1. Keep the notification text short and concise. Don't use special characters or non-text content.
2. Set up the announcer as early as possible, before even sending any notifications.
3. Don't send too many notifications at the same time. Prefer static text.

### Dialogs and popout windows

Calling `setup()` will automatically create an instance of the announcer and inject it into the page. Specifically, it will be appended into the `<body>` element's shadow tree.

In some cases, you might want to inject it somewhere else, for example, into a modal `<dialog>` or a popout window. For such scenarios, use the constructor to create a separate instance and inject it wherever you'd like:

```js
import { LiveAnnouncer } from '@acab/live-announcer';

const announcer = new LiveAnnouncer();
annoucner.setup({ target: document.querySelector('dialog') });

announcer.notify('Something happened inside the dialog!');
```
