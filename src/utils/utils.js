const consoleDebug = (message) => {
  try {
    console.log(message);
  } catch (err) {
    console.log(err);
  }
};

const verifyStrongPassword = (password) => {
  if (password.match(/[0-9]/)
      && password.match(/[a-z]/)
      && password.match(/[A-Z]/)
      && password.match(/[^0-9a-z]/i)
  ) {
    return true;
  }

  return false;
};

const getDurationText = (duration) => {
  const hour = 60;

  let durationName = '';
  if (duration <= hour) {
    durationName = `${duration}м`;
  } else if (duration === hour) {
    durationName = '1ч';
  } else {
    const hours = Math.floor(duration / hour);
    const minutes = duration - hours * hour;

    durationName = `${hours}ч ${minutes}м`;
  }

  return durationName;
};

export {
  consoleDebug,
  verifyStrongPassword,
  getDurationText,
};
