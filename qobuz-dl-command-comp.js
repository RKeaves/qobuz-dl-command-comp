// ==UserScript==
// @name         qobuz-dl-command-comp
// @description  Creates qobuz-dl commands.
// @version      1.0.1
// @namespace    https://github.com/rkeaves
// @downloadURL  https://github.com/rkeaves/qobuz-dl-command-comp/raw/main/qobuz-dl-command-comp.js
// @updateURL    https://github.com/rkeaves/qobuz-dl-command-comp/raw/main/qobuz-dl-command-comp.js
// @license      GPL-3.0-or-later
// @match        https://play.qobuz.com/*
// @grant        GM_xmlhttpRequest
// @author       rkeaves
// ==/UserScript==


(function() {
    'use strict';

    let urlList = JSON.parse(localStorage.getItem('qobuzUrlList')) || [];
    let fullCmdTextArea, manualInput;

    function addUrlToList() {
        const currentUrl = window.location.href;
        if (!urlList.includes(currentUrl)) {
            urlList.push(currentUrl);
            updateStorageAndUI();
        }
    }

    function saveChanges() {
        // Parse command from textarea to sync deletions
        const command = fullCmdTextArea.value;
        const parts = command.split(' ');
        const dlIndex = parts.indexOf('dl');
        const qIndex = parts.indexOf('-q');

        if (dlIndex !== -1 && qIndex !== -1) {
            const newUrls = parts.slice(dlIndex + 1, qIndex);
            urlList = [...new Set(newUrls)]; // Remove duplicates
        }

        // Add manual URL if provided
        const manualUrl = manualInput.value.trim();
        if (manualUrl && !urlList.includes(manualUrl)) {
            urlList.push(manualUrl);
        }
        manualInput.value = ''; // Clear input

        updateStorageAndUI();
    }

    function updateStorageAndUI() {
        localStorage.setItem('qobuzUrlList', JSON.stringify(urlList));
        generateFullCommand();
    }

    function generateFullCommand() {
        const command = 'qobuz-dl.exe dl ' + urlList.join(' ') + ' --albums-only -q 27 --no-db';
        fullCmdTextArea.value = command;
        localStorage.setItem('qobuzCommand', command);
    }

    function clearUrlList() {
        urlList = [];
        fullCmdTextArea.value = '';
        localStorage.removeItem('qobuzUrlList');
        localStorage.removeItem('qobuzCommand');
    }

    function copyToClipboard() {
        fullCmdTextArea.select();
        document.execCommand('copy');
    }

    function createSearchInterface() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            padding: 20px;
            background: #1f1f1f;
            border: 3px solid #00ff99;
            z-index: 9999;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
            font-family: 'Courier New', monospace;
        `;

        // Add to List button
        const addUrlButton = document.createElement('button');
        addUrlButton.textContent = 'Add Current URL';
        addUrlButton.style.cssText = `
            padding: 12px 24px;
            font-size: 18px;
            cursor: pointer;
            margin-bottom: 15px;
            background-color: #00ff99;
            color: black;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 10px #00ff99, 0 0 20px #00ff99;
        `;
        addUrlButton.addEventListener('click', addUrlToList);

        // Manual input field
        manualInput = document.createElement('input');
        manualInput.type = 'text';
        manualInput.placeholder = 'Enter URL manually';
        manualInput.style.cssText = `
            width: 100%;
            padding: 10px;
            font-size: 18px;
            margin-top: 15px;
            background-color: #222222;
            color: #00ff99;
            border: 2px solid #00ff99;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 10px #00ff99;
        `;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save Changes';
        saveButton.style.cssText = `
            padding: 12px 24px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 15px;
            background-color: #9900ff;
            color: white;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 10px #9900ff, 0 0 20px #9900ff;
        `;
        saveButton.addEventListener('click', saveChanges);

        // Clear/Copy buttons
        const clearListButton = document.createElement('button');
        clearListButton.textContent = 'Clear List';
        clearListButton.style.cssText = `
            padding: 12px 24px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 15px;
            background-color: #ff0033;
            color: white;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 10px #ff0033, 0 0 20px #ff0033;
        `;
        clearListButton.addEventListener('click', clearUrlList);

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Command';
        copyButton.style.cssText = `
            padding: 12px 24px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 15px;
            background-color: #0099ff;
            color: white;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 10px #0099ff, 0 0 20px #0099ff;
        `;
        copyButton.addEventListener('click', copyToClipboard);

        // Textarea
        fullCmdTextArea = document.createElement('textarea');
        fullCmdTextArea.style.cssText = `
            width: 100%;
            height: 150px;
            font-size: 18px;
            padding: 10px;
            margin-top: 15px;
            background-color: #222222;
            color: #00ff99;
            border: 2px solid #00ff99;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 10px #00ff99;
        `;
        fullCmdTextArea.value = localStorage.getItem('qobuzCommand') || '';

        // Assemble UI
        container.appendChild(addUrlButton);
        container.appendChild(manualInput);
        container.appendChild(saveButton);
        container.appendChild(clearListButton);
        container.appendChild(copyButton);
        container.appendChild(fullCmdTextArea);
        document.body.appendChild(container);

        generateFullCommand(); // Initialize UI
    }

    createSearchInterface();
})();
