type Topping = {
  name: string;
  imagePath: string;
};

function ToppingOption({ name, imagePath }: Topping) {
  return (
    <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
  );
}

export default ToppingOption;
