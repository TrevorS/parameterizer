const KEYS = {
  patterns: 'patterns',
  isActive: 'isActive',
};

class Storage {
  constructor(storageArea) {
    this.storageArea = storageArea;

    this.prepareStorage();
  }

  prepareStorage(force) {
    this.patterns((details) => {
      if (details === null || details === undefined || force) {
        this.storageArea.set({ [KEYS.patterns]: [] });
      }
    });

    this.isActive((isActive) => {
      if (isActive === null || isActive === undefined || force) {
        this.storageArea.set({ [KEYS.isActive]: true });
      }
    });
  }

  patterns(callback) {
    this.storageArea.get(KEYS.patterns, (details) => {
      callback(details[KEYS.patterns]);
    });
  }

  isActive(callback) {
    this.storageArea.get(KEYS.isActive, (details) => {
      callback(details[KEYS.isActive]);
    });
  }

  setActive(isActive, callback) {
    this.storageArea.set({ [KEYS.isActive]: isActive }, () => {
      callback(isActive);
    });
  }

  toggleActive(callback) {
    this.isActive((isActive) => {
      this.setActive(!isActive, callback);
    });
  }

  addPattern(pattern, callback) {
    this.patterns((patterns) => {
      const updatedPatterns = patterns.concat(pattern);

      this.storageArea.set({ [KEYS.patterns]: updatedPatterns }, () => {
        callback(updatedPatterns);
      });
    });
  }

  removePattern(patternName, callback) {
    this.patterns((patterns) => {
      const updatedPatterns = patterns.filter((pattern) => pattern.name !== patternName);

      this.storageArea.set({ [KEYS.patterns]: updatedPatterns }, () => {
        callback(updatedPatterns);
      });
    });
  }
}
