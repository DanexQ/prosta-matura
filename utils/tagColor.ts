const tagColor = (tag: string) => {
  switch (tag) {
    case "stara":
      return "bg-yellow-500/50 text-yellow-200";
    case "nowa":
      return "bg-fuchsia-500/50 text-fuchsia-200";
    case "Optymalizacja":
      return "bg-lime-500/50 text-lime-200";
    case "Stereometria":
      return "bg-green-500/50 text-green-200";
    case "Granice":
      return "bg-emerald-500/50 text-emerald-200";
    case "Trygonometria":
      return "bg-teal-500/50 text-teal-200";
    case "Równania trygonometryczne":
      return "bg-cyan-500/50 text-cyan-200";
    case "Wielomiany":
      return "bg-sky-500/50 text-sky-200";
    case "Ciągi":
      return "bg-blue-500/50 text-blue-200";
    case "Dowody algebraiczne":
      return "bg-indigo-500/50 text-indigo-200";
    case "Dowody geometryczne":
      return "bg-violet-500/50 text-violet-200";
    case "Równości i nierówności":
      return "bg-purple-500/50 text-purple-200";
    case "Równania z parametrem":
      return "bg-pink-500/50 text-pink-200";
    case "Prawdopodobieństwo":
      return "bg-rose-500/50 text-rose-200";
    case "Kombinatoryka":
      return "bg-red-500/50 text-red-200";
    case "Wartości bezwzględne":
      return "bg-orange-500/50 text-orange-200";
    case "Geometria analityczna":
      return "bg-amber-500/50 text-amber-200";
    case "Planimetria":
      return "bg-yellow-500/50 text-yellow-200";
    default:
      return "bg-neutral-500/50 text-neutral-200";
  }
};

export default tagColor;
