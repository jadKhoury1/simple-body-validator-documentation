---
id: custom-validation-rules
title: Custom Validation Rules
sidebar_position: 8
---

## Register Custom Validation Rules

To register a custom validation rule you must use the <code>register</code> method.

```js
    const { register } = require('simple-body-validator');
```

```js
    import { register } from 'simple-body-validator';
```

:::info Register method definition
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

Below we will showcase a simple example on how to register rules

```js
    const { register } = require('simple-body-validator');

    register('telephone', function (value) {
        return /^\d{3}-\d{3}-\d{4}$/.test(value);
    });
```

You can also specify the error message that should be returned in case the cutstom rule fails, by adding a new key value to the translation file.

```js
    telephone: 'The :attribute phone number is not in the format XXX-XXX-XXXX.',
```

:::tip
The <code>:attribute</code> placeholder will be replaced by the actual name of the field under validation.
:::

In case you have a more complex example and you want to replace placeholders in the error message you can pass a method as a third parameter.

```js
    complex_telephone: 'The :attribute phone number is not in the format +:code XXX-XXX-XXXX.',
```

In the case of the <code>complex_telephone</code> rule we want to replace the <code>code</code> dynamically.

```js
    const { register } = require('simple-body-validator');
    
    register('complex_telephone', function (value, parameters) {

        // This is a built in method that you can use to verify the min number of parameters
        this.requireParameterCount(1, paramters, 'complex_telephone');
        const [ code ] = parameters;
        const pattern = new RegExp('^\\+' + code + ' \\d{3}-\\d{3}-\\d{4}$');
        return pattern.test(value);

    }, function(message, paramters) {

        const [ code ] = paramters;
        // replace the code in the message with the code sent in the parameters
        return message.replace(':code', code);
    });

```

:::caution
You cannot register a rule that already exists. For example you cannot register a rule named <code>required</code> since it already exists in the validation rules.
:::

Once the rule has been registered, you may use it as any other rule.

```js
    const { make } = require('simple-body-validator');

    const validator = make()
        .setData({ cell: '+961 123 456 7890'})
        .setRule({ cell: 'required|complex_telephone:961' });
```

### Accessing Additional Data In Your Custom Rule

If your registered validation rule needs to access all of the other data undergoing validation. You can use the <code>this.data</code>
attribute.

```js
    register('custom_rule', function (value) {
        console.log(this.data);
    });
```

### Register Implicit Custom Rules

By default, when an attribute being validated is not present or contains an empty string, normal validation rules, including registered rules, are not run. For example, the <code>telephone</code> rule will not be run against an empty string.

```js
    const { make } = require('simple-body-validator');

    const validator = make()
        .setData({ cell: ''})
        .setRule({ cell: 'telephone' });

    validator.validate(); // true
```

To register a rule that runs even when an attribute is <em>empty</em>, the <code>registerImplicit</code> method must be used.

```js
    const { registerImplicit } = require('simple-body-validator');
```

```js
    import { registerImplicit } from 'simple-body-validator';
```

In the example below we will register an <em>implicit</em> rule called <code>required_if_type</code> which will check wether the <em>field</em> is required based on the <code>type</code> of the other <em>field's</em> value.

```js
    const { registerImplicit } = require('simple-body-validator');

    registerImplicit('required_if_type', function(value, parameters) {
        const [ target, type ] = parameters;

        if (typeof this.data[target] === type) {
            // This a built in method that is actually used for the required rule
            return this.validateRequired(value);
        }

        return true;
    }, function(message, paramters, data) {
            const [ target ] = paramters;
            message = message.replace(':target', target);
            message = message.replace(':type', typeof data[target]);
            return message;
    });

```

The translation message for the above rule looks like the following.

```js
    required_if_type: 'The :attribute is required when :target is of type :type.',
```

The usage of the <code>required_if_type</code> looks like the following.

```js
    const { make } = require('simple-body-validator');

    const validator = make()
        .setData({ first: 'test' })
        .setRule({ last: 'required_if_type:first,string' });

    validator.validate(); // false

```

## Create Custom Rule Using a Class

Another way of creating custom validation rules is using <code>Rule</code> objects. 

```js
    const { Rule } = require('simple-body-validator');
```

```js
    import { Rule } from 'simple-body-validator';
```

A rule object contains two methods <code>passes</code> and <code>getMessage</code>. The <code>passes</code> method receives the attribute value and name, and should return <code>true</code> or <code>false</code> depending on wether the attribute value is valid or not. 
The <code>getMessage</code> method should return the validation error message that should be used when validation fails.

```js 
    const { Rule } = require('simple-body-validator');

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

If you wish to have translation for the <code>UpperCase</code> rule your can add a key value to the lang files and use the <code>trans</code> method in the <code>getMessage</code> method.

```js
    uppercase: 'The :attribute must be uppercase.',
```

The <code>getMessage</code> implementation becomes as follows.

```js
    getMessage() {
        return this.trans('uppercase');
    }
```

Once the validation has been defined, you may attach it to a validator by passing an instance of the <code>Rule</code> object with your
other validation rules.

```js
    const { make } = require('simple-body-validator');

    const validator = make(data, {
        name: [ 'required', 'string', new UpperCase ],
    });
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

If your custom validation rule class needs to access all of the other data undergoing validation. You can use the <code>this.data</code>
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

If you have a more complex senario where you need to replace more place holders you can pass an object as second parameter to the <code>trans</code> method.

```js
    this.trans('required_if_type', [
        target: this.target,
        type: this.type,
    ]);
```

## Using Closures

If you only need the functionality of a custom rule once throughout your application, you may use a closure instead of registering
a rule or creating a class. The closure receives the attribute's value, a <em>fail</em> callback that should be called if validation
fails, and the attribute's name.

```js
    const { make } = require('simple-body-validator');

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



