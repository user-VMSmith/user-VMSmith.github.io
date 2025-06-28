# Frontend Changelog

All significant changes to the React frontend are documented here.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and uses [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
## [v0.0.#] – ####/##/##
### Added
- 

### Changed
- 

### Fixed
- Delete currentTime
- Get rid of all ccc stuff that I don't need anymore
- Fix deselection of selected-capsules
- Be able to select nested capsules be clicking in the same spot more easily
- The [Add to Powerlanguage] button incorrectly adds the DOM/parsed text instead of adding the transmission.content.message.text
- Add --data-level to each capsule (probably just as I did in powergrammar or maybe jl-2)
  - And capsules each need a unique random id
  - Style: Once --data-level is attached to all capsules and clause-text, then ONLY apply the border-left, -bottom, -right to highest-level capsules
  - Also.. You *have* to switch text selection from DOM-based to React-based.
    - Otherwise, how are we supposed to be able to have user-actions in the Powerlanguage Sidebar be able to impact the SVG-dancing in the text

---

## [v0.0.8] – 2025-06-28
### Added
- 

### Changed
- 

### Fixed
- User can only hover on...
  - words/capsules that are 1 data-level higher than the currently selected word/capsule 
  - words/capsules that are at data-level=0 (if no words/capsules are selected)

---

## [v0.0.7] – 2025-06-27
### Added
- Updated README.md to show the 
- Added data-level to each word
  - Now ALL words and `[`~`]`-capsules have a data-level associated with them
- Pearl deletion

### Changed
- Powerlanguage sidebar stylization
- Nested-runes are not hoverable --> Only the [top-level (data-level=0) capsule] is hoverable

### Fixed
- [Edit Message] button now works correctly
- AddToPowerlanguage causes the pearl.repr to show WITH the stringified SQBR.. but it obvi needs more work
- Deleted a bunch of unused classNames from original transcript paradigm

---

## [v0.0.6] – 2025-06-25
### Added
- data-level to each capsule (woohoo!!!!)

### Changed
- Rune.jsx now recursively keeps track of the capsule's data-level when rendering each of them

### Fixed
- Only highlight the TOP-LEVEL capsule upon hover (given that no capsule is currently selected)

---

## [v0.0.5] – 2025-06-24
### Added
- handleMessageDelete()
- Added `transmissionId` to each newly submitted Message
- delete-message-button
- edit-message-button (unfinished)
- Pearl
  - style
  - toggle() expand/collapse view
  - shows name and tone (but there's no way to add that data yet..)
- Added eslint.config.js (lint config file for consistent code-style)
- An excerpt from the preface to [The Book of Kells] (pdf version)
  - To show representation and how the text presents when copy-pasted

### Changed
- Slight style change to unfocused capsules (however it stacks in a bad way..)
  - Requires a fix to JUST apply that light grey background to the [[active-block]'s [active-powerLayer]'s [data-level]] PLUS 1
- Message style tweak
- Extracted powerlanguage constituents (named Pearls) into their own component

### Fixed
- FloatingToolTip now closes upon X button being clicked

---

## [v0.0.4] – 2025-06-23
### Added
- NON-REACTIVE floating tooltip shows upon selection of word or capsule
  - It closes upon:
    - No more selection
    - Clicking on a diff transmission
  - The [Add to Powerlanguage] button incorrectly adds the DOM/parsed text instead of adding the transmission.content.message.text
- Be able to NAME a transmission
- New Transmission modal
  - Opens when the user clicks the PLUS button
  - Closes when they click DONE
- Show transmission NAME in the LHN if possible
- Show transmission NAME at the top of the TALK comp
- Delete transmission (in Transmission sidebar upon hover and clicking of the X)
- Added a block-container div to Message.jsx in order to let blocks just show in diff little lines within each of the Message's message column
- Fix deselection of selected-capsules by providing CLOSE button on the FloatingToolTip

### Changed
- 

### Fixed
-

---

## [v0.0.3] – 2025-06-20 (2)
### Added
- Clicking on an element of the DOM that has a "capsule" between the target and the "message", causes that outermost capsule to get selected
  - TODO: This is weak work, hard won. Come back and fix this

### Changed
- Clicking on Message lets you edit it UNLESS you click on a Block (then it won't)

### Fixed
- Delete currentTime
- Deleted snippet css class

---

## [v0.0.2] – 2025-06-20 (1)
### Added
- Changelog
- The best from JL-2:
  - JL-2 transmission list
  - JL-2 Editor Output (comp), 
  - Message (comp),
  - Block (comp), 
  - Rune (comp), 
  - useParseTree (hook), 
  - useLocalStorage (hook)
- Slight highlight shows on top-level rune-hover
- Refactor all the JL-2 code
- Stylized the `NEW TRANSMISSION` button way better

### Changed
- Formatted the Message timestamp (submitTime) from plain ISODate to hh:mm AM/PM
- Stylized jl-2 output based off of ccc submission
  - Columns:
    - Time submitted
    - User/Speaker
    - Message
  - Gray background-color for every odd-numbered message
  - Applied jl-2 transmission-list based off of ccc submission

### Fixed
- 

---

## [v0.0.1] – 2025-06-19
### Added
- Copied everything over from my ccc submission
- Renamed a bunch
- Added the powerlanguage sidebar
- Did everything else up til this evening

### Changed
- 

### Fixed
- 

---