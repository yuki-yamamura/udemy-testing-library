export type Scoop = {
  name: string;
  imagePath: string;
};

export default function ScoopOption({ name, imagePath }: Scoop) {
  return (
    <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
  );
}
