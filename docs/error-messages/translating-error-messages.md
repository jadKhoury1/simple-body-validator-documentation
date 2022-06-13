---
sidebar_position: 3
title: Translating Error Messages
---

Simple Body Validator comes with a built in translation feature that provides a convenient way to retrieve error messages in various languages, allowing you to easily support multiple languages for your data validation.

### Translation Directory

To add error message translations you need to create a <code>directory</code> in your project and add all the translation files there. For each language you must create a new file.

Here's an example on how to add the translations, lets say that the directory where you want to add your translations is named <code>lang</code> and you want to add translations for the <code>French</code> and <code>Arabic</code> languages. The structure of your files must be as follow.

```js
    /lang
        ar.js
        fr.js
```

:::info English Translation
The English language is supported by default. There is no need to add <code>en.js</code> file to the <code>lang</code> directory, unless you want to override or add any english translation rule
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
    index.js
```

And <code>index.js</code> is the entry point of your project. To set the translation path you should do the following.

```js title="index.js"
    const { setTranslationPath } = require('simple-body-validator');

    setTranslationPath(__dirname + '/lang');
```

:::caution
Setting the translation path should always be on top, before setting the default lang or running any validation, so that you don't face any translation problems
:::

### Translation File Content

After setting the translation path, you need to populate the messages for your language files. Lets take for example the <code>fr.js</code>.

```js title="fr.js"
    module.exports = {
         min: {
             numeric: 'Le champ :attribute doit être supérieur à :min.',
             string: 'Le champ :attribute doit contenir plus de :min caractères.'
        }
        required: 'Le champ :attribute est requis.',
        string: 'Le chanp :attribute doit être une chaîne'
    };
```

You can find a list of all error messages [here](/error-messages/error-messages-list). In case an error message is not filled for a rule the default message will be returned


### Setting The Default Language 

You can specify the default language to be used by the validator, by invoking the <code>setDefaultLang</code> method and passing the language code as parameter.

```js 
    import { setDefaultLang } from 'simple-body-validator';
```

```js 
    const { setDefaultLang } = require('simple-body-validator');
```

Lets say we want to set the <code>fr</code> lang as the default language.

```js 
    setDefaultLang('fr');
```

Now the French error messages will be returned in case an error occured and in case no language was specified explicitly.


### Specifying Validation Language

Besides the default language, you can explicitly specify the lang to be used each time you want to run the validation. This is done by invoking the <code>setLang</code> method on the validator instance.

```js 
    const validator = make(data, rules).setLang(lang);
```
:::tip
In case the message was not found in the specified language file, the validator will fallback to the default language. In case the message was not found in the default language, the final fallback will be the English language
:::
 






