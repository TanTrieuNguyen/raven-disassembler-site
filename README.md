# RAVEN Disassembler website

The English product site, installation guide, and public binary releases for RAVEN Disassembler. The product source is managed separately.

## Local preview

Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`. The site uses plain HTML, CSS and JavaScript.

## Publication

GitHub Pages serves the root of the `main` branch. GitHub Releases stores the installers, portable archives, and their SHA-256 checksums. Update `release.json` only after the corresponding Release assets have been verified. The inventory maps published filenames to their checksums, and the site only renders links for those filenames.

The screenshots and logo show RAVEN Disassembler.
