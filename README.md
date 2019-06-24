# washington-post-now-headlines
Repository for everything related to my [Washington Post headline matching](https://jamescalixto.com/headline-unscrambling/) project. Check out the final project!

## Background
At Bloomberg, I usually have one Terminal open to {ERH <GO>}, the live news feed function. One day I noticed two Washington Post headlines with the same format and that got me thinking. (Incidentally, Washington Post headlines are distinctive because of their use of sentence case as well as periods at the end of sentences, which are in tandem fairly uncommon for headlines.) That got me thinking about how feasible a mix and match game with these headlines are. 

To obtain these headlines - I used [Selenium](https://selenium-python.readthedocs.io/) in Python to go through the Washington Post's archives searching for `" Now,"` and `" Now."`, which would give me the headlines I needed. I let this run and came up with a thousand headlines (with some repeats).

## Design decisions and other notes
### Page design
I made this soon after the [wing menu optimization](https://jamescalixto.com/wing-ordering/) project but the improvements are noticeable. The structure of my code is a lot cleaner, everything is laid out nicely, and I'm not layered into callbacks as before.

One of the most noticeable things is how clean and cohesive this project is compared to the wing menu optimization. Perhaps it's the cripsness of Playfair Display, more attention to colors, or just tighter element arrangement, but this looks much neater already.

### Come on, Safari
[Really??](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#Browser_compatibility) (Although one of my friends tested this and said that the page still worked, just with a harder press because of 3D touch.)

## Directories and files
### `data`
Holds the `now_headlines.csv` file that I scraped. This file includes the headline text as well as the link to the actual article, the author(s), and the date. I couldn't find a way to integrate the last two in the project but I left them in.

### `helper`
This directory holds the third-party `papaparse.js` and (the wonderfully named!) `dragula.js` files for file reading and element dragging. Both are excellent libraries. Refer to the documentation for [Papa Parse](https://www.papaparse.com/) and [dragula.js](https://github.com/bevacqua/dragula) for more.

### `img`
This directory holds the favicon for the page.

### `main.html`, `main.js`, `styles.css`
These three files make up the main body of the project and are the visible segments of [the project](https://jamescalixto.com/headline-unscrambling/).