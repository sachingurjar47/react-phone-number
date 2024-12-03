import { CountryCode } from "libphonenumber-js";
import { Language } from "../types/types";
import ar from "./ar.json";
import ca from "./ca.json";
import cz from "./cz.json";
import de from "./de.json";
import el from "./el.json";
import en from "./en.json";
import es from "./es.json";
import et from "./et.json";
import fi from "./fi.json";
import fr from "./fr.json";
import he from "./he.json";
import hy from "./hy.json";
import it from "./it.json";
import ja from "./ja.json";
import nb from "./nb.json";
import nl from "./nl.json";
import pl from "./pl.json";
import ptBR from "./pt-BR.json";
import pt from "./pt.json";
import ru from "./ru.json";
import sk from "./sk.json";
import sv from "./sv.json";
import tr from "./tr.json";
import ua from "./ua.json";
import vi from "./vi.json";
import zh from "./zh.json";
export const allLanguage: Record<Language, Record<CountryCode, string>> = {
  ar,
  ca,
  cz,
  de,
  el,
  en,
  es,
  et,
  fi,
  fr,
  he,
  hy,
  it,
  ja,
  nb,
  nl,
  pl,
  "pt-BR": ptBR,
  pt,
  ru,
  sk,
  sv,
  tr,
  ua,
  vi,
  zh,
};
