# jetztlueften
Vorschlagen ob die Raumluft verbessert werden kann indem man das Fenster öffnet

## Problemstellung

Die Raumluft soll durch Außenluftzufuhr verbessert werden. Ziel ist zunächst, die Luftfeuchte zu senken, um Schimmel zu vermeiden.

Per Hygrometer kann zwar die realitive Luftfeuchtigkeit der Außenluft und der Innenluft bestimmt werden. Diese beiden Zahlen können aber nicht ohne Weiteres verglichen werden. Die relative Luftfeuchte ändert sich bei steigender oder sinkender Lufttemperatur.

## Annahmen

Das Modell ist momentan viel zu simpel und sollte verfeinert werden.

1. Nachdem die Außenluft in den Raum gelangt, nimmt sie die Temperatur der Innenluft an. Das Mauerwerk speichert die Energie und gibt sie relativ kurzfristig an die neue Luft ab.

## Ziele

1. Das senken der Luftfeuchtigkeit im Raum.

## Eingangsparameter

1. Außenluft - relative Luftfeuchte, Temperatur
2. Inneluft - relative Luftfeuchte, Temperatur

## Automatisierung

Per Javascript wird die aktuellen Werte der Außenluft abgerufen, wenn das Gerät, den Standort im Browser zur Verfügung stellt.

## Roadmap

Das Projekt is extrem alpha.

Annahme zur Temperaturänderung überdenken: Wenn Innentemperatur 30 Grad beträgt und draußen 17 Grad, wird der Raum beim Lüften abgekühlt.

Ziel Temperatur verbessern: Zieltemperatur (z.B. 20 Grad Celsius) sollte ggf. erreicht werden, auch wenn dadurch die Luftfeuchtigkeit steigt.

Wetterprognose berücksichtigen: Wenn steigende oder fallende Temperaturen erwartet werden, sollte z.B. morgens gelüftet werden um das Gebäude abzukühlen.

Messwerte Innentemperatur automatisch laden. Vielleicht über Arduino oder Raspberry Pi mit entsprechenden Sensoren.
