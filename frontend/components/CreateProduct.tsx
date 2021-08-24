import * as React from 'react';

const CreateProduct = () => {
  const [name, setName] = React.useState('aminux');
  return (
    <div>
      <form>
        Name:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default CreateProduct;
