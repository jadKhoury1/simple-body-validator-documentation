---
sidebar_position: 3
title: Translating Error Messages
---

Simple Body Validator comes with a built-in translation feature that provides a convenient way to retrieve error messages in various languages, allowing you to easily support multiple languages for your data validation.

### Translation Object

The first way to add error message translations is to pass an object to the <code>setTranslationObject</code> method.

```js
    import { setTranslationObject } from 'simple-body-validator';
```

```js
    const { setTranslationObject } = require('simple-body-validator');
```

Each object key must refer to a language code.

```js
    setTranslationObject({
        en: {
            required: 'The :attribute is required'
        },
        fr: {
            required: 'Le :attribute est requis'
        }
    })
```

We suggest that you add tranlations for different languages in seperate translation files. Let's say that the directory where you want to add your translations is named <code>lang</code> and you want to add translations for the <code>English</code> and <code>Frensh</code> languages. The structure of your translations files will be as follows. For the purpose of the example we will use <code>app.js</code> as the entry point to our project.

```js
    /lang
        en.js
        fr.js
        index.js
    app.js
```

Let's take a look at each file seperatly.

```js title="lang/en.js"
    module.exports = {
        required: 'The field :attribute is required.'
        // You can add as many translations as needed
    };
```

```js title="lang/fr.js"
    module.exports = {
        required: 'Le champ :attribute est requis'
    };
```

And finally after adding all your translations, use the <code>index.js</code> to export them all in one file.

```js title="lang/index.js"
    const en = require('./en');
    const fr = require('./fr');

    module.exports = {
        en, fr
    };
```

Meanwile in the <code>app.js</code> you can pass the translation object to the <code>setTranslationObject</code> method.

```js title="app.js"
    const translations = require('./lang.js');
    const { setTranslationObject } = require('simple-body-validator');

    setTranslationObject(translations);
```

And that's it, this is how you add your translations

### Translation Path

Another way to add translations is to use the <code>setTranslationPath</code> method, let's start with a simple example.

First you need to create a <code>directory</code> in your project and add all the translation files there. For each language you must create a new file.

Here's an example on how to add the translations, lets say that the directory where you want to add your translations is named <code>lang</code> and you want to add translations for the <code>French</code> and <code>Arabic</code> languages. The structure of your files must be as follows.

```js
    /lang
        ar.js
        fr.js
```

:::info English Translation
The English language is supported by default. There is no need to add <code>en.js</code> file to the <code>lang</code> directory, unless you want to override or add any english translation rule.
:::

### Specifying The Directory Path

For the library to locate your translation directory, you need to specify the directory's path. To do so you need to import the <code>setTranslationPath</code> method.

```js
    import { setTranslationPath } from 'simple-body-validator';
```

```js
    const { setTranslationPath } = require('simple-body-validator');
```

Lets say your project structure is like the following.

```js
    /lang
        ar.js
        fr.js
    app.js
```

And <code>app.js</code> is the entry point of your project. To set the translation path you should do the following.

```js title="app.js"
    const { setTranslationPath } = require('simple-body-validator');

    setTranslationPath(__dirname + '/lang');
```

:::caution
Setting the translation path should always be on top, before setting the default lang or running any validation, so that you don't face any translation problems.
:::

### Translation File Content

After creating the translation files, you need to populate them with messages. Let's take for example the <code>fr.js</code>.

```js title="fr.js"
    module.exports = {
         min: {
             numeric: 'Le champ :attribute doit être supérieur à :min.',
             string: 'Le champ :attribute doit contenir plus de :min caractères.'
        },
        required: 'Le champ :attribute est requis.',
        string: 'Le chanp :attribute doit être une chaîne'
    };
```

You can find a list of all error messages [here](/error-messages/error-messages-list). In case an error message is not filled for a rule the default message will be returned.


### Setting The Default Language 

You can specify the default language to be used by the validator, by invoking the <code>setDefaultLang</code> method and passing the language code as parameter.

```js 
    import { setDefaultLang } from 'simple-body-validator';
```

```js 
    const { setDefaultLang } = require('simple-body-validator');
```

Let's say we want to set the <code>fr</code> lang as the default language.

```js 
    setDefaultLang('fr');
```

Now the French error messages will be returned in case an error occurred and in case no language was specified explicitly.


### Specifying Validation Language

Besides the default language, you can explicitly specify the lang to be used each time you want to run the validation. This is done by invoking the <code>setLang</code> method on the validator instance.

```js 
    const validator = make(data, rules).setLang(lang);
```
:::tip
In case the message was not found in the specified language file, the validator will fall back to the default language. In case the message was not found in the default language, the final fallback will be the English language.
:::
 






