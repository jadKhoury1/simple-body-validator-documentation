import React, { useState } from 'react';
import { make, ruleIn } from 'simple-body-validator';
import styles from './styles.module.css';

// Form initial Data
const initialData = {
    name: '',
    age: '',
    movie: '',
};

// Set the rules to be used for the form validation
const rules = {
    name: ['required', 'string', 'min:3', 'max:255'],
    age: ['required', 'integer', 'min:18', 'max:64'],
    movie: ['required', ruleIn(['star-wars', 'vanilla-sky', 'atomic-blonde'])],
};

// Initiate a new validator instance
const validator = make(initialData, rules);

// Set initial errors
const initalErrors = validator.errors();

const BasicExample = () => {
      // Set state with initial data
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initalErrors);

  const { name, age, movie } = data;

  // Update form data
  const handleInputChange = ({ target: { name, value } }) => {
    setData({
      ...data,
      [name]: value
    });

    validator.validate(name, value);
    setErrors(validator.errors());
  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validator.setData(data).validate();
    setErrors(validator.errors());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.mb20}>
        <label className={styles.mr10} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
        {errors.has('name') ? (
          <p className={styles.clRed}>{errors.first('name')}</p>
        ) : null}
      </div>

      <div className={styles.mb20}>
        <label className={styles.mr10} htmlFor="name">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={age}
          onChange={handleInputChange}
        />
        {errors.has('age') ? (
          <p className={styles.clRed}>{errors.first('age')}</p>
        ) : null}
      </div>

      <div className={styles.mb20}>
        <label className={styles.mr10} htmlFor="movie">
          Favorite Movie
        </label>
        <select
          id="movie"
          name="movie"
          value={movie}
          onChange={handleInputChange}
        >
          <option value="">Select Movie</option>
          <option value="star-wars">Star Wars</option>
          <option value="vanilla-sky">Vanilla Sky</option>
          <option value="atomic-blonde">Atomic Blonde</option>
        </select>
        {errors.has('movie') ? (
          <p className={styles.clRed}>{errors.first('movie')}</p>
        ) : null}
      </div>

      <input type="submit" value="submit" />
    </form>
  );
};

export default BasicExample;
