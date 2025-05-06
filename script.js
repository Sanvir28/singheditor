// Claude Code Editor - Main Script

// Initialize variables
let editor;
let htmlEditor, cssEditor, jsEditor;
let currentLanguage = 'python';
let currentTheme = 'claude-dark';
let isDarkTheme = true;
let isWebMode = false;

// Language mode mapping
const languageModes = {
  'python': 'python',
  'html': 'htmlmixed',
  'css': 'css',
  'javascript': 'javascript',
  'java': 'text/x-java'
};

// Default code templates
const codeTemplates = {
  'python': '# Welcome to Claude Code Editor\n# Start coding in Python\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\n',
  'html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>Claude Code Editor</title>\n</head>\n<body>\n    <h1>Welcome to Claude Code Editor</h1>\n    <p>Start coding in HTML</p>\n</body>\n</html>\n',
  'css': '/* Welcome to Claude Code Editor */\n/* Start coding in CSS */\n\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f5f5f5;\n    color: #333;\n}\n\nh1 {\n    color: #7857FF;\n}\n',
  'javascript': '// Welcome to Claude Code Editor\n// Start coding in JavaScript\n\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));\n',
  'java': '// Welcome to Claude Code Editor\n// Start coding in Java\n\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n'
};

// Default web mode templates
const webTemplates = {
  'html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>Web Preview</title>\n</head>\n<body>\n    <h1>Welcome to Claude Code Editor</h1>\n    <p>This is a live web preview. Edit HTML, CSS, and JavaScript to see changes.</p>\n    <button id="demo-btn">Click Me</button>\n</body>\n</html>',
  'css': 'body {\n    font-family: "Inter", sans-serif;\n    line-height: 1.6;\n    margin: 0;\n    padding: 20px;\n    background-color: #f8f9fa;\n    color: #333;\n}\n\nh1 {\n    color: #7857FF;\n    margin-bottom: 10px;\n}\n\nbutton {\n    background-color: #7857FF;\n    color: white;\n    border: none;\n    padding: 8px 16px;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.3s;\n}\n\nbutton:hover {\n    background-color: #5A3FD6;\n}',
  'javascript': 'document.addEventListener("DOMContentLoaded", function() {\n    const btn = document.getElementById("demo-btn");\n    if (btn) {\n        btn.addEventListener("click", function() {\n            alert("Hello from Claude Code Editor!");\n        });\n    }\n});\n'
};

// Initialize the editor
document.addEventListener('DOMContentLoaded', function() {
  initializeEditor();
  setupEventListeners();
});

// Initialize CodeMirror editor
function initializeEditor() {
  if (isWebMode) {
    initializeWebEditors();
  } else {
    // Create single CodeMirror instance
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
      mode: languageModes[currentLanguage],
      theme: currentTheme,
      lineNumbers: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      lineWrapping: false,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Tab": function(cm) {
          const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        }
      }
    });
    
    // Set initial code template
    editor.setValue(codeTemplates[currentLanguage]);
    
    // Adjust editor size to fit container
    editor.setSize('100%', '100%');
  }
}

// Initialize web mode with three editors
function initializeWebEditors() {
  // Clear editor container first
  const editorWrapper = document.querySelector('.editor-wrapper');
  editorWrapper.innerHTML = `
    <div class="web-editors-container">
      <div class="editor-tabs">
        <button class="editor-tab active" data-tab="html">HTML</button>
        <button class="editor-tab" data-tab="css">CSS</button>
        <button class="editor-tab" data-tab="js">JavaScript</button>
      </div>
      <div class="web-editor active" id="html-editor-container">
        <textarea id="html-editor"></textarea>
      </div>
      <div class="web-editor" id="css-editor-container">
        <textarea id="css-editor"></textarea>
      </div>
      <div class="web-editor" id="js-editor-container">
        <textarea id="js-editor"></textarea>
      </div>
    </div>
  `;

  // Initialize HTML Editor
  htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
    mode: 'htmlmixed',
    theme: currentTheme,
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Tab": function(cm) {
        const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
      }
    }
  });
  htmlEditor.setValue(webTemplates.html);
  htmlEditor.setSize('100%', '100%');

  // Initialize CSS Editor
  cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
    mode: 'css',
    theme: currentTheme,
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Tab": function(cm) {
        const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
      }
    }
  });
  cssEditor.setValue(webTemplates.css);
  cssEditor.setSize('100%', '100%');

  // Initialize JavaScript Editor
  jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
    mode: 'javascript',
    theme: currentTheme,
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Tab": function(cm) {
        const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
      }
    }
  });
  jsEditor.setValue(webTemplates.javascript);
  jsEditor.setSize('100%', '100%');

  // Set up tab switching
  document.querySelectorAll('.editor-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and editors
      document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.web-editor').forEach(e => e.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding editor
      this.classList.add('active');
      const tabName = this.getAttribute('data-tab');
      document.getElementById(`${tabName}-editor-container`).classList.add('active');
    });
  });

  // Setup auto-preview on change
  const debouncedUpdatePreview = debounce(updateWebPreview, 500);
  htmlEditor.on('change', debouncedUpdatePreview);
  cssEditor.on('change', debouncedUpdatePreview);
  jsEditor.on('change', debouncedUpdatePreview);
}

// Setup event listeners for all UI elements
function setupEventListeners() {
  // Language selector
  document.getElementById('language-select').addEventListener('change', function(e) {
    if (e.target.value === 'web') {
      switchToWebMode();
    } else {
      if (isWebMode) {
        switchToSingleEditorMode();
      }
      changeLanguage(e.target.value);
    }
  });
  
  // Add web option to language selector if not already present
  const langSelect = document.getElementById('language-select');
  if (!document.querySelector('option[value="web"]')) {
    const webOption = document.createElement('option');
    webOption.value = 'web';
    webOption.textContent = 'Web (HTML/CSS/JS)';
    langSelect.appendChild(webOption);
  }
  
  // Theme selector
  document.getElementById('theme-select').addEventListener('change', function(e) {
    changeTheme(e.target.value);
  });
  
  // Font size slider
  document.getElementById('font-size-range').addEventListener('input', function(e) {
    changeFontSize(e.target.value);
  });
  
  // Tab size selector
  document.getElementById('tab-size-select').addEventListener('change', function(e) {
    changeTabSize(parseInt(e.target.value));
  });
  
  // Auto-complete checkbox
  document.getElementById('auto-complete-checkbox').addEventListener('change', function(e) {
    toggleAutoComplete(e.target.checked);
  });
  
  // Line numbers checkbox
  document.getElementById('line-numbers-checkbox').addEventListener('change', function(e) {
    toggleLineNumbers(e.target.checked);
  });
  
  // Wrap text checkbox
  document.getElementById('wrap-text-checkbox').addEventListener('change', function(e) {
    toggleWrapText(e.target.checked);
  });
  
  // Run button
  document.getElementById('run-btn').addEventListener('click', runCode);
  
  // Clear button
  document.getElementById('clear-btn').addEventListener('click', clearEditor);
  
  // Copy button
  document.getElementById('copy-btn').addEventListener('click', copyToClipboard);
  
  // Clear output button
  document.getElementById('clear-output-btn').addEventListener('click', clearOutput);
  
  // Toggle theme button
  document.getElementById('toggle-theme-btn').addEventListener('click', toggleTheme);
}

// Switch to web mode with HTML, CSS, JS editors
function switchToWebMode() {
  isWebMode = true;
  
  // Update run button text
  document.getElementById('run-btn').textContent = 'Preview';
  
  // Initialize web editors
  initializeWebEditors();
  
  // Show initial preview
  updateWebPreview();
}

// Switch back to single editor mode
function switchToSingleEditorMode() {
  isWebMode = false;
  
  // Update run button text
  document.getElementById('run-btn').textContent = 'Run Code';
  
  // Clear editor container
  const editorWrapper = document.querySelector('.editor-wrapper');
  editorWrapper.innerHTML = '<textarea id="code-editor"></textarea>';
  
  // Reinitialize single editor
  initializeEditor();
}

// Change programming language
function changeLanguage(language) {
  currentLanguage = language;
  
  if (!isWebMode) {
    editor.setOption('mode', languageModes[language]);
    if (!editor.getValue()) {
      editor.setValue(codeTemplates[language]);
    }
  }
}

// Change editor theme
function changeTheme(theme) {
  currentTheme = theme;
  
  if (isWebMode) {
    htmlEditor.setOption('theme', theme);
    cssEditor.setOption('theme', theme);
    jsEditor.setOption('theme', theme);
  } else {
    editor.setOption('theme', theme);
  }
}

// Toggle between light and dark theme
function toggleTheme() {
  if (isDarkTheme) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.getElementById('toggle-theme-btn').textContent = '☀️';
    document.getElementById('theme-select').value = 'claude-light';
    changeTheme('claude-light');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.getElementById('toggle-theme-btn').textContent = '🌙';
    document.getElementById('theme-select').value = 'claude-dark';
    changeTheme('claude-dark');
  }
  
  isDarkTheme = !isDarkTheme;
}

// Change font size
function changeFontSize(size) {
  document.getElementById('font-size-value').textContent = `${size}px`;
  
  const editorElements = document.querySelectorAll('.CodeMirror');
  editorElements.forEach(el => {
    el.style.fontSize = `${size}px`;
  });
}

// Change tab size
function changeTabSize(size) {
  if (isWebMode) {
    htmlEditor.setOption('tabSize', size);
    cssEditor.setOption('tabSize', size);
    jsEditor.setOption('tabSize', size);
    htmlEditor.setOption('indentUnit', size);
    cssEditor.setOption('indentUnit', size);
    jsEditor.setOption('indentUnit', size);
  } else {
    editor.setOption('tabSize', size);
    editor.setOption('indentUnit', size);
  }
}

// Toggle auto-complete
function toggleAutoComplete(enabled) {
  const extraKeys = {
    "Tab": function(cm) {
      const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces);
    }
  };
  
  if (enabled) {
    extraKeys["Ctrl-Space"] = "autocomplete";
  }
  
  if (isWebMode) {
    htmlEditor.setOption('extraKeys', extraKeys);
    cssEditor.setOption('extraKeys', extraKeys);
    jsEditor.setOption('extraKeys', extraKeys);
  } else {
    editor.setOption('extraKeys', extraKeys);
  }
}

// Toggle line numbers
function toggleLineNumbers(enabled) {
  if (isWebMode) {
    htmlEditor.setOption('lineNumbers', enabled);
    cssEditor.setOption('lineNumbers', enabled);
    jsEditor.setOption('lineNumbers', enabled);
  } else {
    editor.setOption('lineNumbers', enabled);
  }
}

// Toggle text wrapping
function toggleWrapText(enabled) {
  if (isWebMode) {
    htmlEditor.setOption('lineWrapping', enabled);
    cssEditor.setOption('lineWrapping', enabled);
    jsEditor.setOption('lineWrapping', enabled);
  } else {
    editor.setOption('lineWrapping', enabled);
  }
}

// Run code based on language
function runCode() {
  if (isWebMode) {
    updateWebPreview();
    return;
  }
  
  const output = document.getElementById('output');
  const code = editor.getValue();
  
  clearOutput();
  
  switch (currentLanguage) {
    case 'python':
      output.innerHTML = 'Python code execution would happen server-side.\n\nExample output:\n';
      try {
        // Simulate Python output
        const lines = code.split('\n');
        let simOutput = '';
        for (const line of lines) {
          if (line.trim().startsWith('print(')) {
            const printContent = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
            let evaluated;
            try {
              evaluated = eval(printContent.replace(/f"([^"]*)"/, '"$1"').replace(/{([^}]*)}/g, '" + ($1) + "'));
              simOutput += evaluated + '\n';
            } catch (e) {
              simOutput += printContent.replace(/f"([^"]*)"/, '$1').replace(/{([^}]*)}/g, '...') + '\n';
            }
          }
        }
        output.innerHTML += simOutput || 'No print statements found in code.';
      } catch (e) {
        output.innerHTML += `Error: ${e.message}`;
      }
      break;
      
    case 'javascript':
      output.innerHTML = 'JavaScript output:\n';
      try {
        // Redirect console.log to our output
        const originalLog = console.log;
        const logs = [];
        console.log = function() {
          logs.push(Array.from(arguments).join(' '));
          originalLog.apply(console, arguments);
        };
        
        // Execute the code
        eval(code);
        
        // Restore console.log
        console.log = originalLog;
        
        // Display the logged output
        output.innerHTML += logs.join('\n') || 'No console output generated.';
      } catch (e) {
        output.innerHTML += `Error: ${e.message}`;
      }
      break;
      
    case 'html':
      output.innerHTML = 'HTML Preview:\n';
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '300px';
      iframe.style.border = '1px solid var(--bg-light)';
      iframe.style.borderRadius = 'var(--border-radius)';
      output.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();
      break;
      
    case 'css':
      output.innerHTML = 'CSS cannot be executed directly.\nAdd HTML elements to see the styles applied.';
      break;
      
    case 'java':
      output.innerHTML = 'Java code execution would happen server-side.\n\nExample output:\n';
      if (code.includes('System.out.println')) {
        const printMatches = code.match(/System\.out\.println\("([^"]*)"\)/g);
        if (printMatches) {
          output.innerHTML += printMatches
            .map(match => match.substring(match.indexOf('"') + 1, match.lastIndexOf('"')))
            .join('\n');
        } else {
          output.innerHTML += 'No output detected.';
        }
      } else {
        output.innerHTML += 'No System.out.println statements found in code.';
      }
      break;
  }
}

// Update web preview when in web mode
function updateWebPreview() {
  if (!isWebMode) return;
  
  const output = document.getElementById('output');
  const htmlCode = htmlEditor.getValue();
  const cssCode = cssEditor.getValue();
  const jsCode = jsEditor.getValue();
  
  // Create combined code
  const combinedCode = `
    ${htmlCode}
    <style>${cssCode}</style>
    <script>${jsCode}</script>
  `;
  
  // Create iframe for preview
  output.innerHTML = 'Web Preview:';
  const iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '300px';
  iframe.style.border = '1px solid var(--bg-light)';
  iframe.style.borderRadius = 'var(--border-radius)';
  output.appendChild(iframe);
  
  // Write content to iframe
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(combinedCode);
  iframeDoc.close();
}

// Clear editor content
function clearEditor() {
  if (isWebMode) {
    if (confirm('Clear all three editors (HTML, CSS, JS)?')) {
      htmlEditor.setValue('');
      cssEditor.setValue('');
      jsEditor.setValue('');
    }
  } else {
    editor.setValue('');
  }
}

// Copy code to clipboard
function copyToClipboard() {
  let codeToCopy = '';
  
  if (isWebMode) {
    // Get active editor content
    const activeTab = document.querySelector('.editor-tab.active').getAttribute('data-tab');
    switch (activeTab) {
      case 'html':
        codeToCopy = htmlEditor.getValue();
        break;
      case 'css':
        codeToCopy = cssEditor.getValue();
        break;
      case 'js':
        codeToCopy = jsEditor.getValue();
        break;
    }
  } else {
    codeToCopy = editor.getValue();
  }
  
  navigator.clipboard.writeText(codeToCopy)
    .then(() => {
      showNotification('Code copied to clipboard!');
    })
    .catch(() => {
      showNotification('Failed to copy code. Please try again.');
    });
}

// Clear output container
function clearOutput() {
  document.getElementById('output').innerHTML = '';
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  
  notificationMessage.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Helper function to debounce function calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
