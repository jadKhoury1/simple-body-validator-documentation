---
sidebar_position: 2
title: Working With Error Messages
---

After calling the <code>errors</code> method on the validator, you will receive an <code>ErrorBag</code> instance, which has a variety of convenient methods for working with error messages.

Let's say we have the following data and rules, and we run the validation.

```js
    const validator = make()
    .setData({ email: 123 })
    .setRules({ 
        name: 'required',
        email: 'required|string|email',
    })
    .validate();
```

### Retrieving the First Error Message For a Field

To retrieve the first error message for a given field, use the <code>first</code> method.

```js
    const errors = validator.errors();

    // The email must be a string.
    console.log(errors.first('email'));
```

To retrieve the first message regardless of the attribute, use the <code>first</code> method without passing any value.

```js
    const firstError = errors.first();

    // The name field is required.
    console.log(firstError);
```

### Check If Error Exists

To check if an error exists for a specific attribute, use the <code>has</code> method.

```js
    if (errors.has('email')) {
        // 
    }
```


### Retrieving All Error Messages For A Field

If you want to retrieve an array of all messages for a given field, use the <code>get</code> method

```js
    const emailErrors = errors.get('email');

    // The value of emailErrors will be
    [
        'The email must be a string.',
        'The email must be a valid email address.'
    ]
```

If you would like to retrieve the error type linked to each error message, you can pass <code>true</code> as the second argument to the <code>get</code> method.

```js
    const emailErrors = errors.get('email', true);

    // The value of emailErrors should be
     [
         {
            error_type: 'string',
            message: 'The email must be a string'
        },
        {
            error_type: 'email',
            message: 'The email must be a valid email address.'
        }
    ]
```

:::tip Error Types
If you wish to always get the Error Types without having to pass <code>true</code> as second argument, you can do so by invoking the <code>addErrorTypes</code> method.

```js
const errors = validator.errors().addErrorTypes();
```
:::

### Retrieving Error Messages for All the fields

If you want to retrieve the error messages for all the fields, use the <code>all</code> method.

```js
    const errors = errors().all();

    // The value of errors should be
    {
        name: [ 'The name field is required.' ],
        email: [
            'The email must be a string.',
            'The email must be a valid email address.'
        ]
    }
```

:::info
The <code>all</code> method definition is
```js
all(allMessages?: boolean, withErrorTypes?: boolean): object;
```
:::

If you want only to get the first message related to each field you can pass <code>false</code> as the first parameter to the <code>all</code> method.


```js
    const errors = errors().all(false);

    // The value of errors should be
    {
        name: 'The name field is required.',
        email: 'The email must be a string.'
    }
```

We can get the error types, the same way we did it for the <code>get</code> method by either sending true as the second argument or by invoking <code>addErrorTypes</code> method on the errors instance.

```js
    const errors = errors().all(true, true);

    // The value of errors should be
    {
        name: [
            { error_type: 'required', message: 'The name field is required.' }
        ],
        email: [
            { error_type: 'string', message: 'The email must be a string.' },
            {
                error_type: 'email',
                message: 'The email must be a valid email address.'
            }
        ]
    }
```
