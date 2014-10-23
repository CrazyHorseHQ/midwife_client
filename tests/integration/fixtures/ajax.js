var currentDate = moment().subtract(12, 'hour').toDate(),
    date        = currentDate.getUTCDate(),
    month       = currentDate.getUTCMonth() + 1,
    year        = currentDate.getUTCFullYear(),
    hour        = currentDate.getUTCHours();

export default {
  currentDate: currentDate,
};
