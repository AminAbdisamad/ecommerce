import * as React from 'react';
import useForm from '../lib/useForm';

const CreateProduct = () => {
  const { resetForm, clearForm, inputs, handleChange } = useForm({
    name: 'Macawis',
    description: 'new and awesome',
    price: 1234,
  });
  return (
    <div>
      <form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
