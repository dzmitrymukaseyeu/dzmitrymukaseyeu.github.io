let input = document.querySelector('.use-keyboard-input');

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    textField: null
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    start: 0,
    end: 0,
    language: true
  },

  init() {
    this.elements.textField = document.querySelector('.use-keyboard-input');
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
    
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayoutEn = [
      '`','1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p','[', ']', '\\',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',';','\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '\/', 'arrow_left', 'arrow_right',
      'en','space','done'
    ];

    const keyLayoutEnShift = [
      '~','!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p','{', '}', '\|',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',':','"', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '\?', 'arrow_left', 'arrow_right',
      'en','space','done'
    ];

    const keyLayoutRu = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ','\\',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.','arrow_left', 'arrow_right',
      'ru','space','done'
  ];

    const keyLayoutRuShift = [
      'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ','\/',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',','arrow_left', 'arrow_right',
      'ru','space','done'
  ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class='material-icons'>${icon_name}</i>`;
    };

    let currentLanguage;
    if (this.properties.language) { 
      if (this.properties.shift) {
        currentLanguage = keyLayoutEnShift;
      } else {
        currentLanguage = keyLayoutEn;
      }

    } else {
      if (this.properties.shift) {
        currentLanguage = keyLayoutRuShift;
      } else {
        currentLanguage = keyLayoutRu;
      }
    }

    currentLanguage.forEach( (key, index) => {
      const keyElement = document.createElement('button');
      let insertLineBreak; 

        if(currentLanguage === keyLayoutRuShift) {
          insertLineBreak = ['backspace', '\/', 'enter', 'arrow_right',].indexOf(key) !== -1;
        } else  {
          insertLineBreak = ['backspace', '\\', 'enter', 'arrow_right', '\|',].indexOf(key) !== -1;
        }

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.start = input.selectionStart;
            this.properties.end = input.selectionEnd;

            if (this.properties.start === this.properties.end && input.value.length > 0) {
              input.setRangeText('', --this.properties.start, this.properties.end, 'end');
            } else {
              input.setRangeText('', this.properties.start, this.properties.end, 'end');
            }
            input.focus();
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.id = 'caps';
          if (this.properties.capsLock === true) keyElement.classList.toggle('keyboard__key--active');
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
            input.focus();
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard_key_activatable');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_up');
          keyElement.classList.toggle('keyboard__key--onclick', this.properties.shift);
          keyElement.addEventListener('click', () => {
              this._toggleShift();
              shiftElement = keyElement;
              input.focus();
          });

          break;  

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.start = input.selectionStart;
            this.properties.end = input.selectionEnd;
            input.setRangeText('\n', this.properties.start, this.properties.end, 'end')
            input.focus();
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.start = input.selectionStart;
            this.properties.end = input.selectionEnd;
            input.setRangeText(' ', this.properties.start, this.properties.end, 'end')
            input.focus();
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--white');
          keyElement.innerHTML = createIconHTML('keyboard_hide');
          keyElement.addEventListener('click', () => {
            this.close();
            this._triggerEvent('onclose');
          });

          break;

        case 'arrow_left':
          keyElement.classList.add('keyboard_key_wide');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_left');
          keyElement.addEventListener('click', () => {
            this.properties.start = input.selectionStart;
            this.properties.end = input.selectionEnd;

            if (this.properties.start === this.properties.end && input.value.length > 0 && this.properties.start > 0) {
              let position = --this.properties.start;
              input.selectionStart = position,
              input.selectionEnd = position
            }
            input.focus();
          });

          break;

        case 'arrow_right':
          keyElement.classList.add('keyboard_key_wide');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
          keyElement.addEventListener('click', () => {
            this.properties.start = input.selectionStart;
            this.properties.end = input.selectionEnd;

            if (this.properties.start === this.properties.end && input.value.length > 0) {
              let position = ++this.properties.start;
              input.selectionStart = position,
              input.selectionEnd = position
            }
            input.focus();
          });

          break;

        case "en":
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'en';
          keyElement.addEventListener('click', () => {
            this._toggleLanguage();
            this._triggerEvent("oninput");
          });

          break;

        case "ru":
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerText = 'ru';
          keyElement.addEventListener('click', () => {
            this._toggleLanguage();
            this._triggerEvent("oninput");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.start = input.selectionStart;
            this.properties.end = input.selectionEnd;

            if (this.properties.shift && this.properties.capsLock) {
              input.setRangeText(keyElement.textContent.toLowerCase(), this.properties.start, this.properties.end, 'end');
            } else if (this.properties.shift || this.properties.capsLock) {
              input.setRangeText(keyElement.textContent.toUpperCase(), this.properties.start, this.properties.end, 'end');
            }
            else {
              input.setRangeText(keyElement.textContent.toLowerCase(), this.properties.start, this.properties.end, 'end');
            }
            input.focus();
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (this.properties.shift) {
          key.textContent = key.textContent.toLowerCase();
        } 
        if (this.properties.shift === true && this.properties.capsLock === false ) {
          key.textContent = key.textContent.toUpperCase();
        } else if (this.properties.shift === true && this.properties.capsLock === true) {
          key.textContent = key.textContent.toLowerCase();
        } else {
          if (key.innerHTML === 'en' || key.innerHTML === 'ru' || key.innerHTML === 'EN' || key.innerHTML === 'ru') {
            key.textContent = key.textContent.toLowerCase();
          } else {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          }
        } 
      }
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    
    while (this.elements.keysContainer.children.length > 0) this.elements.keysContainer.children[0].remove();
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          if (this.properties.shift === false && this.properties.capsLock === true) {
            key.textContent = key.textContent.toUpperCase(); 
          } else if (this.properties.shift === true && this.properties.capsLock === true) {
            key.textContent = key.textContent.toLowerCase();
          } else {
            if (key.innerHTML === 'en' || key.innerHTML === 'ru') {
              key.textContent = key.textContent.toLowerCase();
            } else {
              key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
          }
        }
    }

  },

  _toggleLanguage() {
    this.properties.language = !this.properties.language;
    this.properties.capsLock = false;
    this.properties.shift = false;
    while (this.elements.keysContainer.children.length > 0) this.elements.keysContainer.children[0].remove();
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
    
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  }
};

window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});