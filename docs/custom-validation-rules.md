---
id: custom-validation-rules
title: Custom Validation Rules
sidebar_position: 8
---

To register a custom validation rule you must use the <code>register</code> method.

```js
    const { register } = require('simple-body-validator');
```

```js
    import { register } from 'simple-body-validator';
```
<br />

The <code>register</code> method takes three parameters:

1. <code>rule</code>: The name of the rule.
2. <code>validate</code>: A function that takes the attribute <code>value</code> and returns <code>true</code> if the validation is successful, or <code>false</code> otherwise.
3. <code>replaceMessage</code>: Optional parameter to replace placeholders in the error message

<br />

:::info Register method signature
```js
register(
    rule: string, 
    validate: (value: any, parameters?: string[], attribute?: string) => boolean, 
    replaceMessage?: (
        message: string, paramters: string[], data?: object
    ) => string
): boolean;
```
:::

Here is an example of a simple custom validation rule:

```js
register('telephone', function (value) {
    return /^\d{3}-\d{3}-\d{4}$/.test(value);
});
```

You can use the <code>telephone</code> rule in your validation rules:

```js 
import { make } from 'simple-body-validator';

const validator = make()
    .setData({ cell: '+961 123 456 7890' })
    .setRules({ cell: 'required|telephone'});

```

:::caution
You cannot register a rule that already exists. For example, you cannot register a rule named <code>required</code> since it already exists in the validation rules.
:::

You can also specify the error message that should be returned in case the custom rule fails, by adding a new key value to the translation object.

```js
import { setTranslationObject } from 'simple-body-validator';

setTranslationObject({
    en: {
        telephone: 'The :attribute phone number is not in the format XXX-XXX-XXXX.',
    }
});
```

If you are not familiar on how to add error messages you can read about it [here](/error-messages/translating-error-messages).

:::tip
The <code>:attribute</code> placeholder will be replaced by the actual name of the field under validation.
:::

### Accessing Additional Data In Your Custom Rule

If your registered validation rule needs to access all the other data undergoing validation. You can use the <code>this.data</code>
attribute.

```js
    register('custom_rule', function (value) {
        console.log(this.data);
    });
```

### Replace Placeholders in the Error Message

In case you have a more complex use case, and you want to replace placeholders in the error message you can pass a method as a third parameter to the <code>register</code> method. 

Let's say we want to register a new rule called <code>complex_telephone</code>. We will first start by adding the error message for that rule.

```js
import { setTranslationObject } from 'simple-body-validator';

setTranslationObject({
    en: {
        complex_telephone: 'The :attribute phone number is not in the format +:code XXX-XXX-XXXX.',
    }
});
```

In the case of the <code>complex_telephone</code> rule we would like to replace the <code>:code</code> placeholder dynamically.

```js    
register('complex_telephone', function (value, parameters) {
    const [ code ] = parameters;
    const pattern = new RegExp('^\\+' + code + ' \\d{3}-\\d{3}-\\d{4}$');
    return pattern.test(value);
}, function(message, paramters) {
    const [ code ] = paramters;
    // replace the code in the message with the code sent in the parameters
    return message.replace(':code', code);
});

```

### Implicit Custom Rules

By default, custom validation rules are not run if the attribute is not present or contains an empty string. To register a custom rule that runs even when the attribute is empty, you can use the <code>registerImplicit()</code> method.

The <code>registerImplicit()</code> method takes the same parameters as the <code>register()</code> method.

```js
const { registerImplicit } = require('simple-body-validator');
```

```js
import { registerImplicit } from 'simple-body-validator';
```

Here is an example of an implicit custom validation rule:

```js
registerImplicit('required_if_type', function(value, parameters) {
    const [ target, type ] = parameters;

    if (typeof this.data[target] === type) {
        // This a built in method that is actually used for the required rule
        return this.validateRequired(value);
    }

    return true;
});

```

You can then use the <code>required_if_type</code> rule in your validation rules:

```js
const validator = make()
    .setData({ first: 'test' })
    .setRule({ last: 'required_if_type:first,string' });

```

## Custom Validation Rule Classes

You can also create custom validation rule classes. A custom validation rule class must extend the <code>Rule</code> class, which has two methods

- <code>passes()</code>: This method takes the attribute value and returns <code>true</code> if the validation is successful, or <code>false</code> otherwise.
- <code>getMessage()</code>: This method returns the error message that should be used when validation fails.
 
```js
const { Rule } = require('simple-body-validator');
```

```js
import { Rule } from 'simple-body-validator';
```
Here is an example of a custom validation rule class:

```js 
class UpperCase extends Rule {
    passes(value) {
        if (typeof value != 'string') {
            return false;
        }

        return value.toUpperCase() === value;
    }

    getMessage() {
        return 'The :attribute must be uppercase.';
    }
};
```
You can then use the custom validation rule class:

```js
const validator = make(data, {
    name: [ 'required', 'string', new UpperCase ],
});
```

If you wish to have translation for the <code>UpperCase</code> rule your can add a key value to the translation object and use the <code>trans</code> method in the <code>getMessage</code> method.

```js
import { setTranslationObject } from 'simple-body-validator';

setTranslationObject({
    en: {
        uppercase: 'The :attribute must be uppercase.',
    }
});
```

The <code>getMessage</code> implementation becomes as follows.

```js
getMessage() {
    return this.trans('uppercase');
}
```

### Create a Custom Implicit Rule Using a Class

If you want the validation to run even when the field is not available or empty you can use <code>ImplicitRule</code> object.

```js
const { ImplicitRule } = require('simple-body-validator');
```

```js
import { ImplicitRule } from 'simple-body-validator';
```
Below we will showcase a simple example on how to register an implicit rule.

```js 
const { ImplicitRule } = require('simple-body-validator');

class UpperCase extends ImplicitRule {
    passes(value) {
        // return either true or false
    }

    getMessage() {
        // return error message
    }
};
``` 

### Accessing Additional Data In Your Class

If your custom validation rule class needs to access all the other data undergoing validation. You can use the <code>this.data</code>
method in the <code>passes</code> attribute.

```js
passes(value) {
    console.log(this.data);
}
```

### The Trans Method

As showcased in the previous example the <code>trans</code> method can be used to get messages from the translation files. The <code>:attribute</code> placeholder will be automatically replaced by the field name.

```js
this.trans('uppercase');
```

If you have a more complex scenario where you need to replace more placeholders you can pass an object as second parameter to the <code>trans</code> method.

```js
this.trans('required_if_type', [
    target: this.target,
    type: this.type,
]);
```

## Using Closures

You can also use closures to create custom validation rules. A closure is a function that has access to the variables in the scope in which it was created.

Here is an example of a closure-based custom validation rule:

```js
const validator = make(data, {
    title: [
        'required',
        'max:255',
        function (value, fail, attribute) {
            if (value === 'foo' {
                // The trans method can also be passed to the fail method
                fail(`The ${attribute} is invalid`);
            });
        },
    ],
});
```



