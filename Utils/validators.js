exports.slotValidator = (v) => {
  return /^([1-9]|1[0-2]) (AM|PM) to ([1-9]|1[0-2]) (AM|PM)$/.test(v);
};
