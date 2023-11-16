---
sidebar_position: 2
title: Customizing Error Messages
---

If needed you may provide custom error messages that a validator instance should use instead of the default error messages provided by **Simple Body Validator**. 

### Specifying Custom Message for a Rule

There are two ways to specify custom messages. First you may pass them as third argument to the <code>make</code> method.

```js
    const validator = make(data, rules, {
        required: 'The :attribute field is required.'
    });
```

In this example the <code>:attribute</code> placeholder will be replaced by the actual name of the field under validation. You may also utilize other placeholders in validation messages. For example:

```js
    const messages = {
        'same': 'The :attribute and :other must match.',
        'size': 'The :attribute must be exactly :size.',
        'between': 'The :attribute value is not between :min - :max.',
        'in': 'The :attribute must be one of the following types: :values'
    };

```

The second way to pass custom messages is by using the <code>setCustomMessages</code> method.

```js
    const validator = make(data, rules).setCustomMessages(messages);
```

### Specifying a Custom Message for a Given Attribute

Sometimes you may wish to specify a custom error message only for a specific attribute. You may do so by using the **dot** notation. Specify the attribute's name first, followed by the rule.

```js
    const messages = {
        'email.required': 'We need to know your email address!'
    };
```

### Specifying Custom Attributes Values

Many of Simple Body Validator built in error messages include an <code>:attribute</code> placeholder that is replaced with the name of the field or attribute under validation. To customize the values used to replace these placeholders for specific fields, you may pass an object of custom attributes as the fourth argument to the <code>make</code> method or pass the object to the <code>setCustomAttributes</code> method.

```js
    // pass the object as the fouth the attribute
    const validator = make(data, rules, messages, {
        email: 'email address',
    })
```

```js
    // use the 'setCustomAttributes' method to customize attribute value
    const validator = make(data, rules).setCustomAttributes({
        email: 'email address'
    });
```


