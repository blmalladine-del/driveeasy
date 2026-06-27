const brands = [
  { name: 'Porsche', file: 'porsche.svg' },
  { name: 'BMW', file: 'bmw.svg' },
  { name: 'Audi', file: 'audi.svg' },
  { name: 'Volkswagen', file: 'volkswagen.svg' },
  { name: 'Toyota', file: 'toyota.svg' },
  { name: 'Honda', file: 'honda.svg' },
  { name: 'Nissan', file: 'nissan.svg' },
  { name: 'Kia', file: 'kia.svg' },
];

export function BrandsMarquee() {
  return (
    <section className="border-t border-white/[0.04] bg-black py-20">
      <div className="overflow-hidden">
        <div className="flex animate-[marquee_60s_linear_infinite]">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex shrink-0 items-center px-12">
              <img
                src={`/images/brands/${brand.file}`}
                alt={brand.name}
                className="h-10 w-auto opacity-65 transition-all duration-700 [filter:brightness(0)_invert(1)_grayscale(1)] hover:opacity-100 hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_12px_rgba(255,255,255,0.35))] md:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
