# Broken Arrow portfolio design

The current site follows the accepted BrokenArrow preview in the Designs workspace. It uses a
quiet charcoal workspace over the existing grayscale landscape, with a directory on the left and
selected-entry details on the right. The portrait and introduction establish context above both.

## Colors and type

`css/portfolio.css` owns the live styles. Background `#101214`, surfaces `#202225` and `#2a2d30`,
text `#edf0ed`, secondary text `#b0b4b5`, separators `#47494d`. Primary yellow `#f4d42a` identifies
selection, key values and the main contextual action. Warm `#d98c4c` marks contextual notes;
it retains the skill reference's provisional interpretation of the malformed seven-digit token.

System Segoe UI / Arial / Microsoft YaHei provides both English and Chinese text. Titles wrap;
metadata is subordinate. Rectangular surfaces and straight separators establish hierarchy.

## Navigation and interactions

Only Projects, Experience and the language button appear in the header. WORK & LIFE, Journal,
Photos and Personal are temporarily omitted. Their underlying archive content is retained.

Directory search and topic filters preserve selected detail, including when no results match.
Selection is separate from opening a repository or adding an item to the reading shortlist.
The shortlist allows three entries, supports removal and undo, and preserves state through client
navigation. See [architecture](architecture.md) for ownership and content contracts.

At widths up to 760px, directory and inspector stack. The collection is height-limited, and an
explicit View selected entry button moves focus to detail. Selecting an item alone does not move
the user. Keyboard focus uses a yellow outline; reduced-motion avoids smooth scrolling.

## Previous design

`design/index.html`, `css/tokens.css`, `css/scene.css`, and the unmounted earlier home components
retain the old grid-scene experiment. The base token file still supplies archive utility scales;
current semantic colors are overridden by `portfolio.css`. Do not use the old playground to
assess the current site.
