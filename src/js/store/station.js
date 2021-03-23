import { requestStationList } from '../services/station';

const station = {
  value: new Set(),

  async init() {
    const result = await requestStationList();

    if (!result.success) throw new Error(result.message);

    this.value = new Set(result.data);
  },

  add(station) {
    this.value.add(station);
  },

  delete(targetId) {
    this.value = new Set([...this.value].filter(({ id }) => id !== targetId));
  },

  get() {
    return [...this.value];
  },

  includes(value) {
    return [...this.value].some(({ name }) => name === value);
  },
};

export default station;
