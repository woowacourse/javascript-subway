import { requestLineList } from '../services/line';

const line = {
  value: new Set(),

  async init() {
    const result = await requestLineList();

    if (!result.success) throw new Error(result.message);

    this.value = new Set(result.data);
  },

  add(line) {
    this.value.add(line);
  },

  delete(targetId) {
    this.value = new Set([...this.value].filter(({ id }) => id !== targetId));
  },

  edit(line, targetId) {
    const newValue = [...this.value];
    const targetLineIndex = newValue.findIndex(({ id }) => id === targetId);
    const targetLine = newValue[targetLineIndex];
    const editedLine = {
      ...targetLine,
      ...line,
    };
    newValue[targetLineIndex] = editedLine;

    this.value = new Set(newValue);
  },

  get() {
    return [...this.value];
  },

  includes(value) {
    return [...this.value].some(({ name }) => name === value);
  },

  get length() {
    return this.value.size;
  },
};

export default line;
