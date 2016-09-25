const KEYS = {
  patterns: 'patterns',
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
  }

  patterns(callback) {
    this.storageArea.get(KEYS.patterns, (details) => {
      callback(details[KEYS.patterns]);
    });
  }

  addPattern(pattern, callback) {
    this.patterns((patterns) => {
      const updatedPatterns = patterns.concat(pattern);

      this.storageArea.set({ [KEYS.patterns]: updatedPatterns }, callback);
    });
  }

  removePattern(patternName, callback) {
    this.patterns((patterns) => {
      const updatedPatterns = patterns.filter((pattern) => pattern.name !== patternName);

      this.storageArea.set({ [KEYS.patterns]: updatedPatterns }, callback);
    });
  }
}
