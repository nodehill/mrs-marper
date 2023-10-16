export default part =>
  part
    .trim().replaceAll('`', '')
    .replace(/^(-*)(.*)$/, (...args) =>
      '`' + args[2] + '`'
      + (args.includes('-') ? ' DESC' : '')
    );