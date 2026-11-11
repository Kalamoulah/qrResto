// Ticker.tsx
export function Ticker() {
  const items = [
    "Le Baobab Doré, Plateau",
    "Chez Fatou, Almadies",
    "Maquis du Teranga, Ouakam",
    "Restaurant L'Éveil, Sacré-Cœur",
    "Thiossane Resto, Medina",
    "La Calebasse d'Or, Fann",
    "Saveur du Fleuve, Point E",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-black py-3 overflow-hidden">
      <div className="ticker-track flex gap-12 w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-[#F0D080] text-sm font-medium whitespace-nowrap">
            <span className="text-[#C9A84C] text-xl">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
export default Ticker;
