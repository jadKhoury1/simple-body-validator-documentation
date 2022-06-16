---
id: nested-and-wildcard-rules
title: Nested and Wildcard Rules
sidebar_position: 6
---

Validating nested object based form input field doesn't have to be pain. You may use "dot notation" to validate attributes within an object. For example, if the incoming HTTP request contains a <code>name.first</code> you may validate like so.

```js
    const { make } = require('simple-body-validator');

    const validator = make(data, {
        'name.first': 'required|string',
    });
```

The second way is to declare the validation rules with a corresponding nested object structure that reflects the data.

```js
    const { make } = require('simple-body-validator');

    const validator = make(data, {
        name: 'required',
        bio: {
            age: 'min:18',
            education: {
                primary: 'string',
                secondary: 'string',
            },
        },
    });
```

You may also validate each element in array of objects

```js 
    const { make } = require('simple-body-validator');

    const validator = make(data, {
        'person.*.email': 'required|email',
        'person.*.first_name': 'required_with:person.*.last_name'
    });
```

You can also use the wildcard notation to run validation on all array elements.

```js
    const { make } = require('simple-body-validator');

    validator = make(data, {
        zones: 'required|array',
        'zones.*': 'string|min:5'
    });

    // alternatively you can run validation on elements by index

    validator = make(data, {
        zones: 'required|array',
        'zones.0': 'string|min:5',
        'zones.1': 'numeric'
    });
```

#### Custom Error Messages

You can add custom error messages for wildcard or nested validations.

```js
    const { make } = require('simple-body-validator');

    const validator = make(data, {
        'name.first': 'required|string',
        'person.*.email': 'required|email',
        'zones.*': 'string|min:5',
    }, {
        'name.first.string': 'The first name bust be of type string',
        'person.*.email.required': 'The email is required for each person',
        'zone.*.min': 'Each zone must have at least :min characters'
    });
```

