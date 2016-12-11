(function() {

  class Chatbox {

    constructor(options) {
      this.options = options;
      this.item = document.querySelector(options.trigger);
      this.item.addEventListener('click', () => this.toggle());
      this.messages = [];
      this.install();
    }

    install() {
      this.body = document.createElement('div');
      this.body.setAttribute('id', this.options.id);
      this.body.classList.add('chatbox');
      this.messageContainer = document.createElement('div');
      this.messageContainer.classList.add('chatbox-messages');
      this.body.appendChild(this.messageContainer);
      this.inputContainer = document.createElement('div');
      this.inputContainer.classList.add('chatbox-input');
      this.input = document.createElement('input');
      this.input.setAttribute('type', 'text');
      this.input.addEventListener('keyup', event => {
        event.preventDefault();
        if (event.keyCode === 13) {
          this.send(this.input.value);
          this.input.value = '';
        }
      });
      this.inputContainer.appendChild(this.input);
      this.body.appendChild(this.inputContainer);
      document.querySelector('body').appendChild(this.body);
    }

    toggle() {
      if (this.body.classList.contains('chatbox-visible')) {
        this.body.classList.remove('chatbox-visible');
      } else {
        this.body.classList.add('chatbox-visible');
      }
    }

    scrollTop() {
      this.messageContainer.scrollTop = this.messageContainer.scrollHeight - this.messageContainer.clientHeight;
    }

    send(content) {
      const message = document.createElement('div');
      message.classList.add('chatbox-message-sent');
      message.innerHTML = content;
      this.messageContainer.appendChild(message);
      this.scrollTop();
      this.fetchMeteo();
    }

    receive(content) {
      const message = document.createElement('div');
      message.classList.add('chatbox-message-received');
      message.innerHTML = content;
      this.messageContainer.appendChild(message);
      this.scrollTop();
    }

    fetchMeteo() {
      fetch('http://api.openweathermap.org/data/2.5/weather?q=San+Francisco&appid=cd3142675498acedcc764270529f0699')
        .then(res => res.json())
        .then((res) => {
          this.receive(`
            <p><img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png" /></p>
            <p><b>Temperature:</b> ${res.main.temp}°F</p>
            <p><b>Pressure:</b> ${res.main.pressure}</p>
          `);
        });
    }
  }

  window.Chatbox = Chatbox;

})();
