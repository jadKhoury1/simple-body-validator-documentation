---
sidebar_position: 5
sidebar_label: Register Rules
title: React Register Validation Rules
---

In some cases the rules supplied by the library are not enough for all the application use cases. That's why **simple-body-validator** has a very simple way to register custom validation rules in React.

In the example below we will add a new rule called <code>telephone</code>, which enforces a specific telephone format.


```js title="index.js"
import { register } from 'simple-body-validator';

register('telephone', function (value) {
    return /^\d{3}-\d{3}-\d{4}$/.test(value);
});
```

:::tip
It is better to register the rules when the application is first bootstrapped to guarantee that the new rule will be 
available at the time of usage. This is why in our example we registered the rule in the <code>index.js</code> file.
:::

And that's it, we registered a new custom rule that can be used in the form validation. The only missing part is 
to specify the error message linked to the new <code>telephone</code> rule. In the example below we will 
add the <code>telephone</code> related error message to the <code>en.js</code> file.

```js title="en.js"
telephone: 'The :attribute phone number is not in the format XXX-XXX-XXXX.',
```

To understand the example you should have already done the [react translation example](/react/translation). 
The code below showcases the full telephone rule registration and usage.

<iframe width="100%" height="400px" src="https://stackblitz.com/edit/react-td98us?ctl=1&embed=1&file=src/index.js"> </iframe>