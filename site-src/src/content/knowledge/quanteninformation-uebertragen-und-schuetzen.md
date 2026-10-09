---
'uid': 'knowledge-quanteninformation'
'type': 'knowledge'
'slug': 'quanteninformation-uebertragen-und-schuetzen'
'locale': 'de'
'title': 'Wie wird Quanteninformation übertragen und geschützt?'
'dek': 'Verschränkung, Teleportation, No-Cloning und Quantenkryptografie leisten Präzises – aber keine überlichtschnelle Nachrichtenübertragung.'
'summary': 'Einordnung realer Quanteninformationsprotokolle und ihrer Grenzen.'
'readingMinutes': 6
'topicIds':
  - 'topic-quanteninformation'
'claimIds':
  - 'claim-unknown-quantum-state-no-cloning'
  - 'claim-teleportation-shared-entanglement-classical-message'
  - 'claim-teleportation-destroys-input-state'
  - 'claim-ekert-qkd-bell-correlations'
  - 'claim-bb84-security-model-dependent'
'scientificStatus': 'mixed'
'updatedAt': '2026-10-04'
'workflowState': 'approved'
'visibility': 'public'
'review':
  'scientific':
    'status': 'passed'
    'reviewer': 'Sascha'
    'date': '2026-10-04'
  'editorial':
    'status': 'passed'
    'reviewer': 'Sascha'
    'date': '2026-10-04'
---

## Die kurze Antwort

Quanteninformation wird nicht wie eine Datei ausgelesen, kopiert und anschließend an anderer Stelle wieder eingespielt. Ein unbekannter Quantenzustand lässt sich nicht perfekt vervielfältigen. Er kann aber mit geeigneten Protokollen übertragen oder für die Erzeugung geheimer Schlüssel genutzt werden. Dabei arbeiten Quantensysteme und klassische Kommunikation zusammen.

## Was „Quanteninformation“ meint

Ein Qubit kann als Zustand eines geeigneten Zweiniveausystems beschrieben werden, etwa durch zwei Polarisationszustände eines Photons. Anders als ein klassisches Bit ist sein Zustand nicht auf eine bereits bekannte Alternative 0 oder 1 beschränkt. Eine Messung liefert ein Ergebnis entsprechend der gewählten Messbasis und verändert im Allgemeinen den Zustand.

Damit ist Quanteninformation kein frei zugänglicher Zahlenwert, den man aus einem einzelnen System vollständig ablesen könnte. Die Theorie beschreibt, welche Messstatistiken bei wiederholten Präparationen auftreten und wie Zustände durch physikalische Operationen verändert werden.

## Warum unbekannte Zustände nicht perfekt kopiert werden können

Das No-Cloning-Theorem besagt, dass es keine universelle physikalische Operation gibt, die jeden beliebigen unbekannten Quantenzustand unverändert nimmt und eine perfekte zweite Kopie erzeugt. Der Zusatz „beliebig unbekannt“ ist wichtig: Bekannte, zueinander unterscheidbare Zustände können selbstverständlich erneut präpariert werden. Auch näherungsweise oder zustandsabhängige Kopierverfahren sind nicht pauschal ausgeschlossen.

Für Quantenkommunikation hat diese Grenze zwei Seiten. Sie schließt eine universelle perfekte Kopierstrategie für beliebige unbekannte Quantenzustände aus. In geeigneten Quantenkryptografie-Protokollen können die quantenmechanischen Mess- und Störungseigenschaften außerdem dazu genutzt werden, Eingriffe statistisch erkennbar zu machen. Eine konkrete Sicherheitsgarantie folgt daraus noch nicht; sie benötigt ein vollständig beschriebenes Protokoll und Annahmen über Geräte und Angreifer.

## Quantenteleportation überträgt einen Zustand, keine Materie

Beim ursprünglichen Teleportationsprotokoll teilen Senderin und Empfänger vorab ein verschränktes Teilchenpaar. Die Senderin führt eine gemeinsame Messung an ihrem Anteil des Paares und am zu übertragenden System durch. Das Ergebnis wird als klassische Information an den Empfänger gesendet. Erst mit diesem Ergebnis kann er eine passende Operation auf seinem Teilchen ausführen und den ursprünglichen Zustand rekonstruieren.

Der Eingangszustand wird bei diesem Vorgang nicht zusätzlich erhalten. Das Protokoll erzeugt also keine zweite perfekte Kopie und verletzt das No-Cloning-Theorem nicht. Ebenso wenig verschwindet ein materielles Objekt an einem Ort und erscheint an einem anderen: Übertragen wird der Quantenzustand eines Systems.

Die klassische Nachricht ist unverzichtbar. Bevor sie beim Empfänger eintrifft, kann er aus seinem lokalen System nicht kontrolliert die von der Senderin gewünschte Nachricht gewinnen. Quantenteleportation und Verschränkung ermöglichen deshalb keine nutzbare Kommunikation schneller als Licht.

## Wie Quantenkryptografie Angriffe sichtbar machen kann

Quanten-Schlüsselverteilung, kurz QKD, dient nicht dazu, eine beliebige Nachricht „quantisch zu verschlüsseln“. Sie soll zwei Parteien ermöglichen, gemeinsame zufällige Schlüsseldaten zu erzeugen und Hinweise auf Abhören zu erkennen. Beim verschränkungsbasierten Protokoll von Ekert werden Korrelationen zwischen Messungen an verschränkten Systemen ausgewertet; ein Bell-Test gehört zur Sicherheitsidee des idealisierten Verfahrens.

Für das ältere BB84-Protokoll existieren theoretische Sicherheitsbeweise unter festgelegten Modellannahmen. Sie zeigen, wie Fehlerkorrektur und Privacy Amplification aus ausreichend geeigneten Messdaten einen geheimen Schlüssel gewinnen können. Ein solcher Beweis ist keine pauschale Zertifizierung jedes Geräts. Seitenkanäle, fehlerhafte Quellen, manipulierte Detektoren oder unzureichende Zufallszahlen können reale Implementierungen angreifbar machen.

## Was geschützt wird – und was nicht

QKD adressiert die Verteilung von Schlüsseln. Für eine sichere Kommunikation braucht es weiterhin authentisierte klassische Kanäle und ein geeignetes Verschlüsselungsverfahren. Auch Verfügbarkeit, Endgeräte, Software und der Umgang mit Schlüsseln bleiben klassische Sicherheitsaufgaben.

Teleportation wiederum ist ein Baustein für Quantennetzwerke und Quantenrechner, aber kein Ersatz für normale Datenübertragung. Sie benötigt zuvor verteilte Verschränkung, eine erfolgreiche Messung und klassische Kommunikation. Verluste und Rauschen begrenzen die praktische Reichweite und Qualität.

## Grenzen dieser Erklärung

Der Text erklärt Idealprotokolle und ihre grundlegende Logik. Er leitet weder die mathematischen Zustandsvektoren noch einen vollständigen Sicherheitsbeweis her. Aussagen zur Sicherheit gelten nur innerhalb der jeweiligen Annahmen; ein konkretes Produkt oder Netzwerk ist damit nicht geprüft. Quantenfehlerkorrektur, Repeater, geräteunabhängige QKD und experimentelle Kenngrößen benötigen eigene, tiefergehende Darstellungen.
