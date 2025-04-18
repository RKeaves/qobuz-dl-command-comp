![Version](https://img.shields.io/badge/version-1.0.1-blue) ![License](https://img.shields.io/badge/license-GPL--3.0--or--later-red)

<p align="center">
  <img src="https://tornadost.github.io/images/qobuz_logo.png"/>
</p>

_A Tampermonkey/Greasemonkey userscript to build and manage batch download commands for Qobuz tracks and albums._

---

> [!NOTE]
> This script was tested on play.qobuz.com as of April 2025. Ensure your userscript manager (Tampermonkey/Greasemonkey) is up to date.  
> **Requirements:**  
> - Modern browser with Tampermonkey or Greasemonkey installed  
> - [qobuz-dl](https://github.com/kraxarn/qobuz-dl) executable available in your PATH or local folder  

---

## Table of Contents

- [Features](#features)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Customization](#customization)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  

---

## Features

- **One‑Click Add:** Instantly add the current album or track URL to your download list.  
- **Manual Entry:** Paste additional URLs manually for custom batches.  
- **Live Command Builder:** Generates a full `qobuz-dl.exe dl … --albums-only -q 27 --no-db` command in real time.  
- **Persistent Storage:** URL list and last-built command saved in `localStorage`.  
- **Quick Actions:** Clear list or copy full command to clipboard with a button click.  
- **Stylish UI:** Customizable floating panel with neon-inspired theme and console‑style font.  

---

## Installation

```text
https://github.com/rkeaves/qobuz-dl-command-comp/raw/main/qobuz-dl-command-comp.js
```

---

## Configuration

By default, the full command template is:

```text
qobuz-dl.exe dl <URL1> <URL2> … --albums-only -q 27 --no-db
```

To tweak parameters (quality, output options, etc.):

1. Fork the repository.  
2. Open `qobuz-dl-command-comp.js`.  
3. Adjust the `generateFullCommand()` template string in the script.

---

## Usage

1. Navigate to any album or track page on [play.qobuz.com](https://play.qobuz.com/).  
2. Click **Add Current URL** to push it into the batch list.  
3. Or paste a URL into the **Enter URL manually** field and click **Save Changes**.  
4. Review the generated command in the textarea.  
5. Use **Copy Command** to copy it, or **Clear List** to start over.  
6. Run the copied command in your shell to download.  

---

## Customization

You can fine‑tune the floating panel’s appearance by editing the CSS in `createSearchInterface()`:

- Change colors, borders, shadows in `container.style.cssText`.  
- Modify button styles or layout.  
- Add or remove UI elements as needed.  

---

## Troubleshooting

| Issue                                | Solution                                                       |
|--------------------------------------|----------------------------------------------------------------|
| Button panel doesn’t appear          | Ensure the script is enabled and you’re on a Qobuz page.       |
| Command not updating                | Check `localStorage` for stale data; clear list and retry.     |
| Clipboard copy fails                 | Use a browser that supports `document.execCommand('copy')`.    |
| Downloads error in shell             | Verify `qobuz-dl.exe` is installed and accessible in your PATH.|

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Please open an issue or PR on [GitHub](https://github.com/rkeaves/qobuz-dl-command-comp).

---

## License

This project is licensed under **GPL‑3.0‑or‑later**. See the [LICENSE](https://github.com/rkeaves/qobuz-dl-command-comp/blob/main/LICENSE) file for details.

---
[rkeaves](https://github.com/rkeaves)  
