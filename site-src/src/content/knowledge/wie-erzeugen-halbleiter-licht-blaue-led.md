---
uid: knowledge-halbleiter-led
type: knowledge
slug: wie-erzeugen-halbleiter-licht-blaue-led
locale: de
title: Wie erzeugen Halbleiter Licht – und warum war die blaue LED so schwierig?
seoTitle: 'Blaue LED: Warum ihre Entwicklung so schwierig war'
dek: Bandlücke, Dotierung, Rekombination und Schichtdesign verbinden Quantenphysik mit einer prägenden technischen Entwicklung.
summary: Wie Photonenenergie, GaN-Wachstum, p-Leitung und InGaN-Schichten den Weg zur hellen blauen LED prägten – verständlich und präzise erklärt.
readingMinutes: 12
topicIds:
  - topic-halbleiter-led
claimIds:
  - claim-led-photon-energy-wavelength
  - claim-led-radiative-direct-transition
  - claim-led-material-system-requirements
  - claim-led-violet-emission-candela-breakthrough
  - claim-led-aln-buffer-gan-growth
  - claim-led-gan-activation-steps
  - claim-led-dislocation-efficiency-coexistence
  - claim-led-double-heterostructure-quantum-well-stages
scientificStatus: established
updatedAt: '2026-10-19'
workflowState: approved
visibility: public
review:
  scientific: { status: passed, reviewer: Sascha, date: '2026-10-19' }
  editorial: { status: passed, reviewer: Sascha, date: '2026-10-19' }
---

## Einleitung

Eine Leuchtdiode wirkt im Alltag beinahe selbstverständlich: Strom fließt, Licht erscheint. Doch zwischen dem elektrischen Betrieb eines Halbleiters und einem hellen blauen Lichtpunkt liegen mehrere klar unterscheidbare Aufgaben. Zunächst muss ein Material überhaupt einen passenden Lichtübergang ermöglichen. Dann muss es sich in geeigneter Qualität herstellen lassen. Außerdem braucht das Bauteil eine funktionierende p-Leitung und eine aktive Schichtstruktur, in der Licht entstehen kann. Bei der blauen LED kamen diese Aufgaben nicht als eine einzige Hürde daher. Ihr Zusammenspiel macht verständlich, warum eine passende Materialidee allein noch kein brauchbares Bauteil ergab.

Rückblickend ergibt sich daraus eine Kette mehrerer Entwicklungsschritte: bessere GaN-Filme durch eine AlN-Pufferschicht, experimentelle Wege zu p-leitendem Mg-dotiertem GaN sowie geeignete InGaN-basierte aktive Strukturen. Diese Kette stammt nicht aus einer einzelnen Studie, sondern aus mehreren Arbeiten zu Kristallwachstum, p-Leitung und aktiver Schichtstruktur. Sie bildet einen wichtigen Erklärungskern, ohne die gesamte moderne Bauteilphysik abzudecken.

Um diese Entwicklung einzuordnen, beginnt der Artikel bei der Energie eines einzelnen Lichtquants, folgt dann der Lichtentstehung im Halbleiter und trennt anschließend die historischen Material- und Bauteilschritte voneinander. Entscheidend ist dabei immer die Grenze der Erklärung: Eine Gleichung kann den Energieunterschied zwischen rotem und blauem Licht zeigen. Sie erklärt aber noch nicht, warum eine technisch brauchbare blaue LED so schwer zu verwirklichen war.

## 1. Warum die Farbe mit der Energie zusammenhängt

Licht kann in einzelnen Energieportionen beschrieben werden. Eine solche Portion heißt Photon. Für die Energie (E) eines Photons gilt

<div class="equation" role="math" aria-label="E gleich h mal c geteilt durch Lambda"><var>E</var> = <var>h</var> · <var>c</var> / <var>λ</var></div>

Dabei stehen (h) für die Planck-Konstante, (c) für die Lichtgeschwindigkeit und <var>λ</var> für die Wellenlänge. Innerhalb dieser Beziehung gilt: Je kürzer die Wellenlänge, desto größer ist die Energie des einzelnen Photons.

Für zwei Beispielwellenlängen wird der Unterschied anschaulich. Ein Photon bei 450 Nanometern besitzt eine Energie von ungefähr 2,76 Elektronenvolt. Bei 630 Nanometern sind es ungefähr 1,97 Elektronenvolt. Das kürzerwellige blaue Photon trägt in diesem Vergleich also mehr Energie als das längerwellige rote Photon.

Diese Rechnung beantwortet jedoch nur eine eng begrenzte Frage: Wie hängen Wellenlänge und Energie eines einzelnen Photons zusammen? Sie setzt die reale Emissionsenergie einer LED nicht starr mit einer nominellen Materialbandlücke gleich. Vor allem erklärt sie weder das Kristallwachstum noch die p-Leitung oder den Aufbau einer geeigneten aktiven Schicht. Die höhere Energie des blauen Photons ist daher ein Ausgangspunkt der Erklärung, nicht ihre vollständige Lösung.

## 2. Wie ein Halbleiter überhaupt Licht erzeugt

Ein Loch ist keine zweite klassische Kugel, sondern beschreibt einen unbesetzten elektronischen Zustand, der sich im Material wie ein positiver Ladungsträger behandeln lässt. Der Begriff hilft dabei, Vorgänge in der aktiven Region einer LED zu beschreiben, ohne die beteiligten Quantenzustände als winzige mechanische Objekte misszuverstehen.

Treffen Elektronen und Löcher in der aktiven Region unter geeigneten Bedingungen zusammen, können sie strahlend rekombinieren. Rekombination bedeutet hier nicht, dass Materie vernichtet wird. Gemeint ist ein elektronischer Übergang, bei dem eine Energiedifferenz als Photon abgegeben werden kann. Das Wort „strahlend“ ist wichtig, denn nicht jeder mögliche Übergang führt zur Aussendung von Licht.

Für die Lichtentstehung spielt außerdem die Art des Bandübergangs eine Rolle. Bei einem direkten Übergang kann die strahlende Rekombination ohne einen zusätzlichen Impulsübertragungsweg über das Kristallgitter beschrieben werden. Bei einem indirekten Übergang ist ein solcher zusätzlicher Weg nötig. Direkte Übergänge begünstigen deshalb den für eine LED gewünschten strahlenden Prozess gegenüber indirekten Übergängen.

Die Bandlücke ist dabei kein leerer räumlicher Spalt im Material. Der Begriff bezeichnet einen Energieabstand im elektronischen Zustandsmodell. Diese Unterscheidung schützt vor einem falschen Bild: Elektronen fallen nicht wie Kügelchen durch eine sichtbare Lücke. Der Artikel verwendet „Bandlücke“ ausschließlich als Energiebegriff und „direkt“ beziehungsweise „indirekt“ als Eigenschaften der möglichen Übergänge.

## 3. Warum GaN vielversprechend war – aber nicht genügte

Galliumnitrid, kurz GaN, bot wegen seiner großen direkten Bandlücke einen geeigneten Ausgangspunkt für violett und blau emittierende Bauteile. „Geeignet“ bedeutet hier jedoch nicht „bereits technisch gelöst“. Die Materialeigenschaft eröffnete einen Weg zu den benötigten Übergangsenergien, ersetzte aber nicht die weiteren Schritte, aus denen eine brauchbare LED entsteht.

Rückblickend lassen sich drei Aufgaben nebeneinanderordnen: kontrolliertes Kristallwachstum, p-Leitung und eine geeignete InGaN-basierte aktive Schichtstruktur. InGaN bezeichnet Indiumgalliumnitrid und ist hier nicht mit GaN gleichzusetzen. GaN bildet den vielversprechenden Materialausgangspunkt; die aktive Struktur der späteren hellen Bauteile ist InGaN-basiert.

Kristallwachstum meint in diesem Zusammenhang die kontrollierte Herstellung kristalliner Halbleiterschichten. Epitaxie ist der Fachbegriff für ein solches geordnetes Schichtwachstum auf einer Unterlage, dem Substrat. p-Leitung bezeichnet hier den in Mg-dotiertem GaN experimentell erreichten Leitungstyp. Die aktive Struktur ist schließlich der Bauteilbereich, in dem die für die Lichtemission relevante Rekombination stattfinden kann.

Diese Ordnung ist bewusst knapp. Sie behauptet nicht, Kontakte, Grenzflächen, interne Felder oder weitere Aspekte realer LEDs seien unwichtig. Sie sagt lediglich: Eine passende Bandlücke genügte nicht. Materialqualität, p-Leitung und aktive Schichtstruktur mussten zusammen gedacht werden, ohne sie in eine einzige Ursache zu verwandeln.

## 4. Der erste große Materialdurchbruch

Ein zentraler Schritt betraf das Wachstum von GaN auf Saphir. Amano und Kollegen berichteten 1986 über eine AlN-Pufferschicht, die vor dem GaN-Wachstum auf dem Saphirsubstrat lag. Eine Pufferschicht ist in diesem Artikel eine zwischengeschaltete dünne Schicht, die den anschließenden Wachstumsschritt vorbereitet. Entscheidend sind die tatsächlich dokumentierten Eigenschaften der hergestellten GaN-Filme.

Mit diesem Aufbau entstanden bei geeigneten Wachstumsbedingungen optisch flache und gleichmäßige GaN-Filme. Die Arbeit berichtete außerdem rissfreie Filme unter den angegebenen Bedingungen sowie Verbesserungen der morphologischen, kristallinen und optischen Eigenschaften. „Morphologisch“ bezieht sich hier auf Gestalt und Oberfläche der Schicht; „kristallin“ auf ihre Kristallstruktur und „optisch“ auf die beobachteten optischen Merkmale.

Die Reichweite dieses Ergebnisses bleibt klar begrenzt. Die AlN-Pufferschicht löste nicht automatisch die p-Dotierung und ebenso wenig den vollständigen LED-Aufbau. Aus den verbesserten Filmen folgt auch nicht, dass perfekte Kristalle ohne Defekte entstanden wären. Der Befund markiert einen wichtigen Wachstumsschritt, nicht die fertige blaue LED.

## 5. Das Problem mit p-GaN

Ein weiterer eigener Entwicklungsschritt war p-leitendes Mg-dotiertes GaN. „Dotiert“ bedeutet, dass dem Halbleitermaterial gezielt Fremdatome zugesetzt werden; hier ist Magnesium gemeint. Die Arbeiten berichten zwei experimentelle Behandlungswege, die zu unterschiedlichen Zeitpunkten eingesetzt wurden und nicht miteinander gleichgesetzt werden dürfen.

Amano und Kollegen zeigten 1989 p-Leitung in Mg-dotiertem GaN nach einer Niedrigenergie-Elektronenbestrahlung. Das Verfahren wird häufig mit LEEBI abgekürzt. Nach dieser Behandlung wurde p-Leitung beobachtet. Der Befund steht als eigener experimenteller Schritt neben dem später berichteten thermischen Verfahren.

Nakamura und Kollegen berichteten 1992 niedrigohmiges p-GaN nach einem Tempern in Stickstoff oberhalb von 700 Grad Celsius. Tempern bedeutet hier eine gezielte Wärmebehandlung; N₂ bezeichnet molekularen Stickstoff. Die Elektronenbestrahlung von 1989 und das N₂-Tempern von 1992 sind deshalb historisch wie technisch zwei verschiedene Aktivierungsschritte.

## 6. Frühes Leuchten war noch keine brauchbare blaue LED

Dass ein Material Licht emittiert, ist nicht dasselbe wie ein technisch brauchbares, helles Bauteil. Bereits 1973 wurde violette Elektrolumineszenz aus Mg-dotiertem GaN berichtet. Elektrolumineszenz bezeichnet dabei Lichtemission, die im elektrisch betriebenen Material beobachtet wird. Dieser frühe Befund belegt violettes Leuchten, darf aber nicht mit dem späteren effizienten blauen Durchbruch gleichgesetzt werden.

Der praktisch relevante Helligkeitsdurchbruch folgte 1994 mit einer InGaN/AlGaN-Doppelheterostruktur der Candela-Klasse. Die berichtete Emission lag um 450 Nanometer. Eine Doppelheterostruktur ist hier die in der Primärarbeit so bezeichnete mehrschichtige Halbleiterarchitektur; der Begriff benennt den damaligen Bauteilaufbau und noch keinen Quantentopf.

Der Vergleich von 1973 und 1994 zeigt daher zwei verschiedene Stufen: frühe violette Emission auf der einen Seite und ein heller, praktisch relevanter blauer Meilenstein auf der anderen. Daraus folgt keine umfassende Prioritätsgeschichte. Der Artikel schreibt den Gesamtweg weder einer einzigen Person noch einer einzigen Firma zu und trifft keine Patentbewertung. Er trennt lediglich die zwei in den angeführten Primärarbeiten belegten Technologiestufen.

## 7. Warum viele Kristalldefekte nicht automatisch das Ende bedeuteten

Ein Kristall kann linienförmige Störungen seiner regelmäßigen Struktur enthalten; solche Störungen heißen Versetzungen. Lester und Kollegen fanden in diesen konkreten Bauteilen eine Versetzungsdichte von mehr als 2 × 10<sup>10</sup> cm<sup>−2</sup>. Zugleich berichteten sie externe Quanteneffizienzen von bis zu vier Prozent.

Die externe Quanteneffizienz beschreibt in diesem Zusammenhang das Verhältnis der nach außen abgegebenen Photonen zu den zugeführten elektrischen Ladungsträgern. Die beiden Messangaben dürfen gemeinsam gelesen werden: In den untersuchten LEDs war die hohe Versetzungsdichte mit einer für damalige GaN-LEDs hohen externen Quanteneffizienz vereinbar. Der Befund zeigt eine Koexistenz in genau diesen Bauteilen.

Aus diesem Befund lässt sich jedoch nicht verallgemeinern, dass Kristalldefekte grundsätzlich folgenlos wären oder alle GaN- beziehungsweise InGaN-Strukturen universell defekttolerant seien. Ebenso wenig setzt er alle Defektarten gleich. Vor allem zeigt die gemeinsame Beobachtung keine Kausalität: Die hohe Versetzungsdichte hat die gemessene Effizienz nicht nachweislich verursacht.

## 8. Doppelheterostruktur und Quantentopf

Die 1994 berichtete Candela-LED verwendete eine InGaN/AlGaN-Doppelheterostruktur. 1995 wurden anschließend helle InGaN-LEDs mit Quantentopfstrukturen berichtet. Ein Quantentopf bezeichnet hier eine von den Autoren der späteren Arbeit ausdrücklich so benannte aktive Schichtstruktur. Für die historische Einordnung genügt die klare Trennung: 1994 Doppelheterostruktur, 1995 Quantentopfstrukturen.

Die beiden Begriffe sind damit weder synonym noch bezeichnen sie denselben historischen Schritt. Insbesondere darf die spätere Quantentopfarchitektur nicht rückwirkend in die 1994er Arbeit hineingelesen werden. Ebenso wäre es falsch, den Quantentopf als alleinigen Grund für den bereits 1994 berichteten Helligkeitsdurchbruch darzustellen. Der Artikel wahrt deshalb sowohl die begriffliche als auch die zeitliche Grenze der beiden Primärarbeiten.

Gemeinsam zeigen diese Befunde eine gestufte Bauteilentwicklung. Die geeignete aktive Struktur gehört neben Kristallwachstum und p-Leitung zum zentralen Erklärungskern. Doch auch dieses Gesamtbild entsteht erst aus der Zusammenführung getrennter Ergebnisse. Keine einzelne Primärquelle formuliert rückblickend die vollständige Entwicklungskette.

## Fazit

Die blaue LED entstand nicht durch „die eine fehlende Idee“. GaN bot mit seiner großen direkten Bandlücke einen geeigneten Ausgangspunkt. Eine technisch brauchbare blaue LED verlangte darüber hinaus kontrolliertes Kristallwachstum, p-Leitung und eine geeignete InGaN-basierte aktive Schichtstruktur. Rückblickend ergibt sich dieses Bild aus mehreren getrennten Arbeiten; keine einzelne Studie formuliert die gesamte Kette.

Die einzelnen Schritte behalten dabei ihre eigene Bedeutung: Die AlN-Pufferschicht verbesserte dokumentierte Eigenschaften von GaN-Filmen, löste aber nicht das Gesamtbauteil. LEEBI und N₂-Tempern waren unterschiedliche Schritte zu p-leitendem Mg-dotiertem GaN. Frühe violette Emission war nicht mit dem Candela-Durchbruch gleichzusetzen. Und die Doppelheterostruktur von 1994 war nicht dasselbe wie die 1995 berichteten Quantentopfstrukturen.

Gerade die Grenzen dieser Aussagen machen die Entwicklung verständlich. Die Energieformel erklärt den Unterschied zwischen zwei Photonen, aber nicht das ganze Bauteil. Hohe Versetzungsdichte und vergleichsweise hohe Effizienz traten in bestimmten untersuchten LEDs gemeinsam auf, ohne Defekte allgemein für folgenlos zu erklären. So entsteht ein präzises Bild: nicht eine isolierte Ursache, sondern mehrere unterscheidbare Material- und Bauteilschritte führten zum praktisch relevanten blauen Licht.
