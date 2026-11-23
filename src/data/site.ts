// Facts only from veon/client.json (company.geography, company.contacts.phones, socials)
// and content/client-images/manifest.json (doctors: name, specialty, experience, cities).
import type { ImageMetadata } from "astro";
import dnipro from "../assets/clinics/dnipro.jpg";
import kamRight from "../assets/clinics/kamianske-right.jpg";
import kamLeft from "../assets/clinics/kamianske-left.jpg";
import uzhhorod from "../assets/clinics/uzhhorod.jpg";
import ortoKids from "../assets/clinics/orto-kids.jpg";
import pyvovarov from "../assets/doctors/pyvovarov.webp";
import steblin from "../assets/doctors/steblin.webp";
import vasylenko from "../assets/doctors/vasylenko.webp";
import steblina from "../assets/doctors/steblina.webp";
import honcharova from "../assets/doctors/honcharova.webp";
import shevkalenko from "../assets/doctors/shevkalenko.webp";

export type CityKey = "dnipro" | "kamianske" | "uzhhorod" | "oleksandriia";

export interface Phone { tel: string; label: string; }
export interface Clinic {
  id: string;
  name: string;
  note?: string;
  city: string;
  address: string;
  phones: Phone[];
  hours?: string;
  hoursSchema?: string;
  photo?: ImageMetadata;
  alt?: string;
  soon?: boolean;
}
export interface CityGroup { key: CityKey; city: string; clinics: Clinic[]; }

const ph = (tel: string): Phone => {
  // +380972000247 → +38 097 200 02 47 (non-breaking gaps)
  const d = tel.replace("+38", "");
  return { tel, label: `+38 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}` };
};

export const cities: CityGroup[] = [
  {
    key: "dnipro",
    city: "Дніпро",
    clinics: [
      {
        id: "clinic-dnipro", name: "MDENT Дніпро", city: "Дніпро", address: "Зоряний бульвар, 1",
        phones: [ph("+380972000247"), ph("+380502000247")],
        hours: "Пн–Сб 09:00–18:00", hoursSchema: "Mo-Sa 09:00-18:00",
        photo: dnipro, alt: "Вхід до клініки MDENT на Зоряному бульварі, 1 у Дніпрі",
      },
    ],
  },
  {
    key: "kamianske",
    city: "Кам'янське",
    clinics: [
      {
        id: "clinic-kamianske-right", name: "Правий берег", city: "Кам'янське", address: "вул. Любомирівська, 12",
        phones: [ph("+380962000486")], photo: kamRight,
        alt: "Клініка MDENT на вулиці Любомирівській, 12 у Кам'янському",
      },
      {
        id: "clinic-kamianske-left", name: "Лівий берег", city: "Кам'янське", address: "просп. Нескорених, 14",
        phones: [ph("+380952000424")], photo: kamLeft,
        alt: "Клініка MDENT на проспекті Нескорених, 14 у Кам'янському",
      },
      {
        id: "orto-kids", name: "Orto Kids", note: "дитяча ортодонтія", city: "Кам'янське", address: "вул. Любомирівська, 24",
        phones: [ph("+380509542020")], photo: ortoKids,
        alt: "Відкриття дитячої клініки Orto Kids у Кам'янському",
      },
    ],
  },
  {
    key: "uzhhorod",
    city: "Ужгород",
    clinics: [
      {
        id: "clinic-uzhhorod", name: "MDENT Ужгород", city: "Ужгород", address: "вул. Новака, 6",
        phones: [ph("+380502920909")], photo: uzhhorod,
        alt: "Клініка MDENT на вулиці Новака, 6 в Ужгороді",
      },
    ],
  },
  {
    key: "oleksandriia",
    city: "Олександрія",
    clinics: [
      { id: "clinic-oleksandriia", name: "MDENT Олександрія", city: "Олександрія", address: "вул. Поштова, 53", phones: [], soon: true },
    ],
  },
];

export const mapUrl = (c: Clinic) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.address}, ${c.city}, Україна`)}`;

export const telegram = "https://t.me/mdent_dnipro";
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/mdent_dnipro" },
  { name: "Facebook", href: "https://www.facebook.com/mdentdnipro" },
  { name: "YouTube", href: "https://www.youtube.com/@mdent7323" },
];

export const services = [
  { verb: "Вилікувати зуби", line: "Лікування зубів і терапія" },
  { verb: "Встановити імпланти", line: "Імплантація зубів" },
  { verb: "Лікування уві сні", line: "Делікатне лікування зі знеболенням" },
  { verb: "Виправити прикус", line: "Ортодонтія: брекети та елайнери", kids: true },
  { verb: "Вилікувати ясна", line: "Пародонтологія" },
  { verb: "Видалити зуб", line: "Хірургія та видалення зубів" },
];

export interface Doctor { name: string; role: string; years: string; places: string; cities: CityKey[]; photo: ImageMetadata; }
export const doctors: Doctor[] = [
  { name: "Стебліна Ілона Ігорівна", role: "Лікар стоматолог-ортодонт", years: "11+", places: "Дніпро, Кам'янське (правий і лівий берег)", cities: ["dnipro", "kamianske"], photo: steblina },
  { name: "Пивоваров Михайло Юрійович", role: "Кандидат медичних наук, стоматолог-хірург, щелепно-лицевий хірург", years: "15+", places: "Ужгород, Кам'янське (правий берег)", cities: ["uzhhorod", "kamianske"], photo: pyvovarov },
  { name: "Шевкаленко Артур Костянтинович", role: "Лікар стоматолог-терапевт", years: "10+", places: "Дніпро", cities: ["dnipro"], photo: shevkalenko },
  { name: "Гончарова Анна Геннадіївна", role: "Лікар стоматолог-пародонтолог", years: "8+", places: "Ужгород", cities: ["uzhhorod"], photo: honcharova },
  { name: "Василенко Дмитро Андрійович", role: "Лікар стоматолог-ортопед", years: "10+", places: "Кам'янське (правий берег)", cities: ["kamianske"], photo: vasylenko },
  { name: "Стеблін Дмитро Олегович", role: "Лікар стоматолог-ортопед", years: "11+", places: "Дніпро", cities: ["dnipro"], photo: steblin },
];
