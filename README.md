# Kosmos Klartext Website V1

Öffentlicher V1-Freigabekandidat der Wissenschaftsplattform [kosmosklartext.de](https://kosmosklartext.de/).

Der aktuell veröffentlichte statische Build liegt im Repository-Stamm. Der reproduzierbare, auf den öffentlichen Releaseumfang reduzierte Astro-Quellstand liegt in `site-src/`.

## Lokal prüfen und bauen

```powershell
+cd site-src
+pnpm install --frozen-lockfile
+pnpm build
+```

Bis zur gesonderten Indexierungsfreigabe gilt auf allen HTML-Seiten global `noindex, nofollow`.
