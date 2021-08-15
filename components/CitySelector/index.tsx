import cities from "./cities";

type Props = {
  onSelect?: (data: Coordinates | null) => void;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export default function CitySelector({ onSelect }: Props) {
  function handleSelect(value: string) {
    try {
      onSelect?.(JSON.parse(value));
    } catch (err) {
      onSelect?.(null);
    }
  }

  return (
    <select
      placeholder="Selecionar cidade"
      onChange={(ev) => handleSelect(ev.currentTarget.value)}
    >
      <option>Selecione a cidade</option>
      {cities.map((city) => (
        <option
          key={city.siafi_id}
          value={JSON.stringify({ lat: city.latitude, lon: city.longitude })}
        >
          {city.nome}
        </option>
      ))}
    </select>
  );
}
