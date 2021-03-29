import { requestStationList } from '../api/station';

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

  editName(name, targetId) {
    const newValue = [...this.value];
    const targetStation = newValue.find(({ id }) => id === targetId);

    targetStation.name = name;

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

export default station;
