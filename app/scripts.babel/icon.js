const $l = new DollarL();

const width = 19;
const height = 19;

const font = {
  align: 'center',
  baseline: 'middle',
  family: '20px serif',
};

const colors = {
  badge: '#5D656C',
  inactive: '#A9A9A9',
  blue: '#4E9CB5',
};

const interrobang = '‽';

class Icon {

  constructor(browserAction) {
    this.browserAction = browserAction;
    this.icon = this.getIcon();

    this.browserAction.setIcon({
      imageData: this.getImageData(),
    });

    this.browserAction.setBadgeBackgroundColor({
      color: colors.badge,
    });
  }

  getImageData() {
    return this.icon.getImageData(0, 0, width, height);
  }

  getIcon() {
    const canvas = $l.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.textAlign = font.align;
    ctx.textBaseline = font.baseline;
    ctx.font = font.family;

    ctx.fillStyle = colors.blue;
    ctx.fillText(interrobang, width / 2, height / 2);

    return ctx;
  }

  setActive(isActive) {
    let color = isActive ? colors.blue : colors.inactive;

    this.icon.fillStyle = color;
    this.icon.fillText(interrobang, width / 2, height / 2);

    this.browserAction.setIcon({
      imageData: this.getImageData(),
    });

    if (!isActive) {
      this.browserAction.setBadgeText({ text: '' });
    }
  }

  setMatches(matches, tabId) {
    if (matches > 0) {
      const text = matches.toString();

      this.browserAction.setBadgeText({ text, tabId });
    }
  }
}
